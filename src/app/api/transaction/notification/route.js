import config from "@/utils/config";
import pool from "@/utils/db";
import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = config;

export async function POST(request) {
  const payload = await request.json();

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

    const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

    if (payload.transaction_status === "settlement") {
      const message = `Hi,\nyou got new donation from ${donation.name}\nwith amount ${donation.amount}\nmessage:\n${donation.message}\n`;

      try {
        await bot.sendMessage(TELEGRAM_CHAT_ID, message);
        return NextResponse.json({ status: "success" });
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { message: "internal server error" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ status: "success" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
