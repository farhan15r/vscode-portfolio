import axios from "axios";
import config from "../../utils/config";

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const POST = async (req, res) => {
  const {
    PAYMENT_METHODS,
    MIDTRANS_SERVER_KEY,
    MIDTRANS_BE_URL,
  } = config;

  const url = MIDTRANS_BE_URL;
  const auth = Buffer.from(MIDTRANS_SERVER_KEY + ":").toString("base64");

  const payload = req.body;
  const methodIndex = PAYMENT_METHODS.findIndex(
    (item) => item.value === req.body.method
  );
  const method = PAYMENT_METHODS[methodIndex];
  const total = payload.amount + method.fee;

  if (!validateEmail(payload.email)) {
    res.status(400).json({ message: "Invalid email" });
    return;
  }

  const epoch = Math.floor(new Date().getTime() / 1000);

  try {
    const response = await axios.post(
      url,
      {
        transaction_details: {
          order_id: `ORDER-${epoch}`,
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
        "expiry": {
          "duration": 1,
          "unit": "minutes",
        },
        "page_expiry": {
          "duration": 10,
          "unit": "minutes"
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

    res.status(500).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong"});
  }
};

export default async (req, res) => {
  if (req.method === "POST") {
    await POST(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
