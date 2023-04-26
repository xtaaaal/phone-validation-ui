import type { NextPage, InferGetStaticPropsType, GetStaticProps } from "next";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import { Form } from "@unform/web";
import Image from "next/image";
import kvImg from "@/assets/images/verified-pana.png";
import CustomSelect from "@/components/elements/customSelect";
import Input from "@/components/elements/input";
import styles from "./index.module.css";
import config from "@/configs/index";
import { useAppContext } from "@/context/AppContext";

import * as yup from "yup";
import {
  handleIsValidPhone,
  handleGetAreaCode,
} from "@/functions/data-fetching";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object().shape({
  areaCode: yup.string().required("Please select country code"),
  phoneNumber: yup
    .string()
    .required("Please enter phone number")
    .matches(phoneRegExp, "Phone number is not valid"),
});

const Home: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { MOBILE_AREA } = config;
  const formRef = useRef(null);
  const router = useRouter();
  const formData = formRef?.current?.getData();
  const { currentAreaCode } = props;
  const [attemptsHistory, setAttemptsHistory] = useState([]);

  const areaCodeOptions = MOBILE_AREA.map((val) => {
    return {
      label: val.code,
      value: val.code,
      country: val.country,
    };
  });

  useEffect(() => {
    let attempts;
    if (typeof window !== "undefined") {
      attempts = localStorage.getItem("attempts");
      setAttemptsHistory(JSON.parse(attempts));
    }
  }, []);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      if (typeof window !== "undefined") {
        const currentStorage =
          JSON.parse(localStorage.getItem("attempts")) || [];
        const now = new Date();
        const option = { timeZone: "Asia/Hong_Kong", hour12: false };
        const nowString = now.toLocaleString("zh-HK", option);
        localStorage.setItem(
          "attempts",
          JSON.stringify([...currentStorage, { ...data, time: nowString }])
        );
      }

      await validationSchema.validate(data, {
        abortEarly: false,
      });

      await handleIsValidPhone(data);
      router.push("/history");
    } catch (err) {
      const errors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        formRef.current.setErrors(errors);
      }
    }
  }

  async function handleBlur() {
    await handleGetAreaCode();
  }

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
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              className={styles.formContainer}
            >
              <div className={styles.label}>
                <label>Phone number</label>
              </div>
              <div className={styles.inputRow}>
                <CustomSelect
                  name="areaCode"
                  options={areaCodeOptions}
                  isSearchable={true}
                  defaultValue={currentAreaCode}
                  onChange={() => formRef.current.setFieldError("areaCode", "")}
                  id="areaCodeInput"
                />
                <div className={styles.marginLeft}>
                  <Input
                    label="Phone Number"
                    placeHolder="Phone Number"
                    name="phoneNumber"
                    inputValueType={"tel"}
                    onBlur={() => setTimeout(handleBlur, 500)}
                    required={true}
                    onChange={() =>
                      formRef.current.setFieldError("phoneNumber", "")
                    }
                  />
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.button}>
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

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
