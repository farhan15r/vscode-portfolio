import { useState } from "react";
import styles from "../styles/DonatePage.module.css";

const DonatePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(5000);
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState("gopay");

  const paymentMethods = [
    {
      name: "GoPay",
      value: "gopay",
    },
    {
      name: "QRIS",
      value: "qris",
    },
    {
      name: "ShopeePay",
      value: "shopeepay",
    },
  ];

  const submitForm = async (e) => {
    e.preventDefault();

    console.log({
      name,
      email,
      amount,
      message,
      method,
    });

    // console.log(process.env.NEXT_PUBLIC_API_URL);
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
    //   method: "POST",
    //   body: JSON.stringify({ name, email, subject, message }),
    // });
    // if (res.ok) {
    //   alert("Your response has been received!");
    //   setName("");
    //   setEmail("");
    //   setSubject("");
    //   setMessage("");
    // } else {
    //   alert("There was an error. Please try again in a while.");
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles["container-md-50"]}>
        <h3 className={styles.heading}>Or Fill Out This Form</h3>
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
            <select
              name="method"
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              required
            >
              {paymentMethods.map((method, index) => (
                <option key={index} value={method.value}>{method.name}</option>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: "Donate" },
  };
}

export default DonatePage;
