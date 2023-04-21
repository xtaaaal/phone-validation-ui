import type { NextPage } from "next";
import Head from "next/head";
import History, { HistoryProps } from "@/components/fragments/history";
import Image from "next/image";
import kvImg from "@/assets/images/verified-pana.png";

import styles from "./index.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crystal Hon - Phone number validator</title>
        <meta
          name="description"
          content="A phone number validator developed using NextJs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.form}>
        <h1 className={styles.title}>Phone number validator</h1>
        <p className={styles.description}>
          Enter your phone number below to verify
        </p>
        <div className={styles.container}>
          <div>
            <Image
              className={styles.kvImg}
              src={kvImg}
              alt="Picture of the phone"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
      <section className={styles.histories}></section>
    </>
  );
};

export default Home;
