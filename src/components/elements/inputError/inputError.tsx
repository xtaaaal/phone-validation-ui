import styles from "./inputError.module.css";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const InputError = ({ errorText, ...rest }) => {
  return (
    <div className={styles.inputErrorWrapper}>
      <div className={styles.InputErrorMsg}>
        <div className={styles.icon}>
          <ExclamationTriangleIcon />
        </div>
        <p>{errorText}</p>
      </div>
    </div>
  );
};

export default InputError;
