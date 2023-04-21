import styles from "./history.module.css";

export interface HistoryProps {
  phone: string;
  successTime: string;
}

const History = (props: HistoryProps): JSX.Element => {
  const { phone, successTime } = props;
  return (
    <div className={styles.history}>
      <h2 className={styles.title}>{phone} &rarr;</h2>
      <p className={styles.description}>{successTime}</p>
    </div>
  );
};

export default History;
