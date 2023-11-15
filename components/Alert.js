import styles from "../styles/Alert.module.css";

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <p>{message}</p>
      <button className={styles.closeButton} onClick={onClose}>
        <svg
          width={24}
          height={24}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            fill="currentColor"
            d="M12.78 4.28a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
