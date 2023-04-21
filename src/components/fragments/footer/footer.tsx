import styles from "./footer.module.css";

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <a className={styles.link} href="https://github.com/xtaaaal">
        Crystal Hon @ {new Date().getFullYear()}
      </a>
      <p className={styles.license}>
        <a href="https://storyset.com/user">User illustrations by Storyset</a>
      </p>
    </footer>
  );
};

export default Footer;
