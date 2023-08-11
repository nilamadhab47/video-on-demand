import React, { Children } from "react";
import styles from "../styles/Checkbox.module.css";

const Checkbox = ({
  checkboxStyle,
  checkboxLabel,
  checkboxlabelStyle,
  id,
  value,
  handleChange,
}) => {
  // const handleChange = (e) => {
  //   console.log(e.target.value);
  // };
  // const handleClick = (e) => {
  //   e.target.value = "kids";
  //   // console.log(value);
  // };
  // console.log(value);

  return (
    <>
      <label className={styles.container} style={checkboxlabelStyle}>
        <input type="checkbox" id={id} onChange={handleChange} value={value} />
        <span className={styles.checkmark} style={checkboxStyle}></span>
        {checkboxLabel}
      </label>
    </>
  );
};

export default Checkbox;
