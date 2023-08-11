import React from "react";

const Select = ({ name, handleChange, value, text }) => {
  return (
    <select name={name} onChange={handleChange}>
      <option value={value}>{text}</option>
    </select>
  );
};

export default Select;
