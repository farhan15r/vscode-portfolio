const PAYMENT_METHODS = [
  {
    name: "GoPay",
    value: "gopay",
    fee: 0,
  },
  {
    name: "QRIS",
    value: "gopay",
    fee: 0,
  },
  {
    name: "ShopeePay",
    value: "shopeepay",
    fee: 0,
  },
  {
    name: "BNI Virtual Account",
    value: "bni_va",
    fee: 4000,
  },
];

const SHOWED_GITHUB_REPOS = [
  "https://github.com/RashIO-Bangkit-Capstone/backend-rashio",
  "https://github.com/farhan15r/vscode-portfolio",
  "https://github.com/farhan15r/sea-cinema",
  "https://github.com/farhan15r/go-latihan-clean-arch",
];

const config = {
  MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
  MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY,
  MIDTRANS_MERCHANT_ID: process.env.MIDTRANS_MERCHANT_ID,
  MIDTRANS_BE_URL: process.env.MIDTRANS_BE_URL,
  MIDTRANS_FE_URL: process.env.MIDTRANS_FE_URL,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  GITHUB_API_KEY: process.env.GITHUB_API_KEY,
  GITHUB_USERNAME: process.env.GITHUB_USERNAME,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  PAYMENT_METHODS,
  SHOWED_GITHUB_REPOS,
};

export default config;
