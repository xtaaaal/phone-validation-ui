import { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import InputError from "@/components/elements/inputError";
import styles from "./input.module.css";

const Input = ({
  name,
  label,
  placeHolder,
  inputValueType,
  onBlur,
  required,
  ...rest
}) => {
  const inputRef = useRef();

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref) => {
        return ref.value;
      },
      setValue: (ref, value) => {
        ref.value = value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <div className={styles.inputcontainer} id={`${name}-input`}>
        <input
          type={inputValueType}
          className={`${error ? styles.errorsBorder : ""} ${styles.input}`}
          placeholder={placeHolder}
          id={name}
          ref={inputRef}
          defaultValue={defaultValue}
          onBlur={onBlur}
          {...rest}
        />

        {error && <InputError errorText={error} />}
      </div>
    </>
  );
};

export default Input;
