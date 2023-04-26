import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Select, { StylesConfig } from "react-select";
import { useField } from "@unform/core";
import styles from "./customSelect.module.css";
import InputError from "@/components/elements/inputError";

const CustomSelect = (
  { options, label, name, isSearchable = false, ...rest },
  ref
) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        const val = ref.commonProps.selectProps.value;

        if (!val) {
          return "";
        }
        return val.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  useImperativeHandle(
    ref,
    () => ({
      clearValue() {
        selectRef.current.clearValue();
      },
      setValue(v) {
        selectRef.current.setValue(v);
      },
    }),
    []
  );

  const customStyles: StylesConfig = {
    option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
      color: "#1f1f1f",
      padding: 10,
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: 8,
      padding: 2,
    }),
  };

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <Select
        options={options}
        defaultValue={defaultValue}
        styles={customStyles}
        ref={selectRef}
        isSearchable={isSearchable}
        {...rest}
      />
      {error && <InputError errorText={error} />}
    </>
  );
};

export default forwardRef(CustomSelect);
