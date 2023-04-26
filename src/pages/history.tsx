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
        <div className={styles.container}></div>
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
