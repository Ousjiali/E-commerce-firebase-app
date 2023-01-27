import * as React from "react";

const Input = ({
  onChange,
  value,
  type,
  title,
  required = false,
  readOnly = false,
  size = "midi",
  disabled = false,
  name = "name",
}) => {
  return (
    <div className={`onBoarding__InputContainer ${size}`}>
      <label>
        {title} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        placeholder={title}
        readOnly={readOnly}
        name={name}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
