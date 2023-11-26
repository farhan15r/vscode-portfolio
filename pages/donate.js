import { useEffect, useState } from "react";
import styles from "../styles/DonatePage.module.css";
import Head from "next/head";
import config from "../utils/config";
import axios from "axios";
import Alert from "../components/Alert";
import LoadingIcon from "../components/icons/LoadingIcon";
import { useRouter } from "next/router";

const DonatePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(5000);
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState(null);

  const router = useRouter();
  const { transaction_status } = router.query;

  const {
    PAYMENT_METHODS,
    MIDTRANS_CLIENT_KEY: CLIENT_KEY,
    MIDTRANS_FE_URL,
  } = config;

  useEffect(() => {
    if (transaction_status == "pending") {
      setAlert({
        type: "warning",
        message: "Your transaction is pending.",
      });
    } else if (transaction_status == "settlement") {
      setAlert({
        type: "success",
        message: "Thanks, your donate already received.",
      });
    } else if (transaction_status == "cancel") {
      setAlert({
        type: "warning",
        message: "Your transaction is canceled.",
      });
    } else if (transaction_status == "error") {
      setAlert({
        type: "error",
        message: "Your transaction is error.",
      });
    }
  }, [transaction_status]);

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/api/donate",
        {
          name,
          email,
          amount,
          message,
          method: PAYMENT_METHODS[method].value,
        },
        {
          timeout: 50000,
        }
      );

      if (response.data?.token) {
        window.snap.pay(response.data.token);
      } else {
        setAlert({
          type: "error",
          message: response.data.message,
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message:
          error.response.data.message ||
          error.message ||
          "Something went wrong",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src={MIDTRANS_FE_URL}
          data-client-key={CLIENT_KEY}
        ></script>
      </Head>

      <div id="snap-container"></div>

      <div className={styles.container}>
        <div className={styles["container-md-50"]}>
          <h3 className={styles.heading}>
            You have a lot of money? GIMME SOME MONEY!!
          </h3>
          <form className={styles.form} onSubmit={submitForm}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="amount">Amount (IDR)</label>
              <span>min Rp5.000</span>
              <input
                type="number"
                name="amount"
                id="amount"
                value={amount}
                min={5000}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="method">Payment Method</label>
              {PAYMENT_METHODS[method].fee != 0 && (
                <span>
                  *{PAYMENT_METHODS[method].name} fee: Rp
                  {PAYMENT_METHODS[method].fee}
                </span>
              )}
              <select
                name="method"
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                required
              >
                {PAYMENT_METHODS.map((method, index) => (
                  <option key={index} value={index}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading && <LoadingIcon />}
              Submit
            </button>
          </form>
        </div>
      </div>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: "Donate" },
  };
}

export default DonatePage;
