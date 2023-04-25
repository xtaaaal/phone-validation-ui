import type { NextPage } from "next";
import Head from "next/head";
import History, { HistoryProps } from "@/components/fragments/history";
import Image from "next/image";
import kvImg from "@/assets/images/verified-pana.png";

import styles from "./index.module.css";
import config from "@/configs/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  areaCode: yup.string().required("Country code required"),
  phoneNumber: yup.string().required("Phone number required"),
});

const Home: NextPage = () => {
  const { MOBILE_AREA } = config;

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
          <div>
            <Formik
              initialValues={{ areaCode: "+852", phoneNumber: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  console.log(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field as="select" name="areaCode" className={styles.input}>
                    {MOBILE_AREA.map((val) => {
                      return (
                        <option key={`code-${val.country}`} value={val.code}>
                          {/* <ReactCountryFlag
													className="emojiFlag"
													countryCode={val.country}
													style={{
														fontSize: '1em',
														lineHeight: '1em',
													}}
													aria-label={val.country}
												/> */}
                          {val.code}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    name="areaCode"
                    component="div"
                    className={styles.errorMsg}
                  />
                  <Field
                    type="tel"
                    name="phoneNumber"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className={styles.errorMsg}
                  />
                  <div className={styles.buttonContainer}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={styles.button}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
      <section className={styles.histories}></section>
    </>
  );
};

export default Home;
