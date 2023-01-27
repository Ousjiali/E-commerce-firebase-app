import * as React from "react";

const Radio = ({
  onChange,
  title,
  options,
  value,
  size = "mtn__child",
}) => {
  return (
    <div className={`${size} radioFlex`}>
      <label>{title}</label>

      {options.map((item) => (
        <span>
          {" "}
          <input
            type="radio"
            onChange={onChange}
            value={item.value}
            name={title}
            defaultChecked={value === item.value}
          />
          {item.value}
        </span>
      ))}
    </div>
  );
};
export default Radio;