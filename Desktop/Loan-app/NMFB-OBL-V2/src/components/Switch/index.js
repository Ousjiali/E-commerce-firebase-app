import React from "react";
import "./toggle.css";

const Switch = ({ title, checked, onChange }) => {
  return (
    <div className="InputContainer small">
      <label>{title}</label>
      <input
        type="checkbox"
        id={title}
        class="offscreen"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={title} class="switch"></label>
    </div>
  );
};

export default Switch;
