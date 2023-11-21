import TelegramBot from "node-telegram-bot-api";
import config from "../../../utils/config";
import pool from "../../../utils/db";

const POST = async (req, res) => {
  const payload = req.body;

  try {
    const client = await pool.connect();

    await client.query("BEGIN");
    await client.query(
      `UPDATE transactions
        SET status = $1
        WHERE id = $2`,
      [payload.transaction_status, payload.order_id]
    );

    const result = await client.query(
      `SELECT * FROM donations WHERE transaction_id = $1`,
      [payload.order_id]
    );

    const donation = result.rows[0];

    await client.query("COMMIT");

    const bot = new TelegramBot(config.TELEGRAM_BOT_TOKEN, { polling: false });

    if (payload.transaction_status === "settlement") {
      const message = `Hi,\nyou got new donation from ${donation.name}\nwith amount ${donation.amount}\nmessage:\n${donation.message}\n`;

      try {
        await bot.sendMessage(config.TELEGRAM_CHAT_ID, message);
        res.json({ status: "success" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
      }
    } else {
      res.json({ status: "success" });
    }

  } catch (error) {
    res.status(500).json({ message: 'internal server error' });
  }
};

export default async (req, res) => {
  if (req.method === "POST") {
    await POST(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
