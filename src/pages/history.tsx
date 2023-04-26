import type { NextPage, InferGetStaticPropsType, GetStaticProps } from "next";
import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.css";
import config from "@/configs/index";
import {
  handleIsValidPhone,
  handleGetAreaCode,
} from "@/functions/data-fetching";

const History: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const [attemptsHistory, setAttemptsHistory] = useState(null);

  useEffect(() => {
    let attempts;
    if (typeof window !== "undefined") {
      attempts = localStorage.getItem("attempts") || null;
      setAttemptsHistory(JSON.parse(attempts));
    }
  }, []);

  return (
    <>
      <Head>
        <title>History of phone number attempts</title>
        <meta
          name="description"
          content="A phone number validator developed using NextJs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.histories}>
        <h1 className={styles.title}>Phone Numbers History</h1>
        <p className={styles.description}>Attempts of phone numbers</p>
        <div className={styles.listContainer}>
          <div className={styles.list}>
            <div className={styles.listRow}>
              <div className={styles.header}>Country Code</div>
              <div className={styles.header}>Phone Number</div>
              <div className={styles.header}>Datetime</div>
            </div>
            {attemptsHistory ? (
              attemptsHistory.map((record) => {
                return (
                  <div
                    key={`item-${record.phoneNumber}`}
                    className={styles.listRow}
                  >
                    <div className={styles.cell}>{record.areaCode}</div>
                    <div className={styles.cell}>{record.phoneNumber}</div>
                    <div className={styles.cell}>{record.time}</div>
                  </div>
                );
              })
            ) : (
              <h3>No attempt records for now!</h3>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default History;

export const getStaticProps: GetStaticProps = async () => {
  const currentAreaCode = await handleGetAreaCode();

  return {
    props: {
      currentAreaCode: currentAreaCode.result || {
        label: "+852",
        value: "+852",
      },
    },
  };
};
