import axios from "axios";
import config from "../../utils/config";
import pool from "../../utils/db";

const { PAYMENT_METHODS, MIDTRANS_SERVER_KEY, MIDTRANS_BE_URL } = config;

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const POST = async (req, res) => {
  const url = MIDTRANS_BE_URL;
  const auth = Buffer.from(MIDTRANS_SERVER_KEY + ":").toString("base64");

  const payload = req.body;
  const methodIndex = PAYMENT_METHODS.findIndex(
    (item) => item.value === req.body.method
  );
  const method = PAYMENT_METHODS[methodIndex];
  const total = Number(payload.amount) + Number(method.fee);

  if (!validateEmail(payload.email)) {
    res.status(400).json({ message: "Invalid email" });
    return;
  }

  const epoch = Math.floor(new Date().getTime() / 1000);
  const idTransaction = `ORDER-${epoch}`;

  const client = await pool.connect();
  try {

    await client.query("BEGIN");
    await client.query(
      `INSERT INTO donations
        (name, email, amount,
        message, transaction_id)
      VALUES
        ($1, $2, $3, $4, $5)`,
      [
        payload.name,
        payload.email,
        payload.amount,
        payload.message,
        idTransaction,
      ]
    );
    await client.query(
      `INSERT INTO transactions
        (id, status, total)
      VALUES
        ($1, $2, $3)`,
      [idTransaction, "pending", total]
    );
    await client.query("COMMIT");

    const response = await axios.post(
      url,
      {
        transaction_details: {
          order_id: idTransaction,
          gross_amount: total,
        },
        enabled_payments: [method.value],
        customer_details: {
          first_name: payload.name,
          email: payload.email,
        },
        item_details: [
          {
            id: "DONATION",
            price: payload.amount,
            quantity: 1,
            name: "Donation",
          },
          {
            id: "ADMIN",
            price: method.fee,
            quantity: 1,
            name: "Admin Fee",
          },
        ],
        expiry: {
          duration: 10,
          unit: "minutes",
        },
        page_expiry: {
          duration: 30,
          unit: "minutes",
        },
        callbacks: {
          finish: req.headers.referer || "example.com",
        },
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Basic ${auth}`,
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error) {
    client.query("ROLLBACK");
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default async (req, res) => {
  if (req.method === "POST") {
    await POST(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};