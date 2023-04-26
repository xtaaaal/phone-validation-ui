import type { NextPage } from "next";
import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import { Form } from "@unform/web";
import History, { HistoryProps } from "@/components/fragments/history";
import Image from "next/image";
import kvImg from "@/assets/images/verified-pana.png";
import CustomSelect from "@/components/elements/customSelect";
import Input from "@/components/elements/input";
import styles from "./index.module.css";
import config from "@/configs/index";

import * as yup from "yup";
import { handleIsValidPhone } from "@/functions/data-fetching";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object().shape({
  areaCode: yup.string().required("Please select country code"),
  phoneNumber: yup
    .string()
    .required("Please enter phone number")
    .matches(phoneRegExp, "Phone number is not valid"),
});

const Home: NextPage = () => {
  const { MOBILE_AREA } = config;
  const formRef = useRef(null);
  const formData = formRef?.current?.getData();

  const areaCodeOptions = MOBILE_AREA.map((val) => {
    return {
      label: val.code,
      value: val.code,
      country: val.country,
    };
  });
  async function handleSubmit(data) {
    console.log(data);
    try {
      formRef.current.setErrors({});

      await validationSchema.validate(data, {
        abortEarly: false,
      });

      await handleIsValidPhone(data);
    } catch (err) {
      const errors = {};
      if (err instanceof yup.ValidationError) {
        // console.log(err.inner);
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        formRef.current.setErrors(errors);
      }
    }
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
                  defaultValue={{
                    value: "+852",
                    label: +"+852",
                  }}
                  onChange={() => formRef.current.setFieldError("areaCode", "")}
                  id="areaCodeInput"
                />
                <div className={styles.marginLeft}>
                  <Input
                    label="Phone Number"
                    placeHolder="Phone Number"
                    name="phoneNumber"
                    inputValueType={"tel"}
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
      <section className={styles.histories}></section>
    </>
  );
};

export default Home;
