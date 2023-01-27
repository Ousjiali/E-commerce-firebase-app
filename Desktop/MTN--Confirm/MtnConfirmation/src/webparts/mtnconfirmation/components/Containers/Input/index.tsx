import * as React from "react";

const Input = ({
  onChange,
  value,
  type,
  title,
  required = false,
  readOnly = false,
  size = "mtn__child",
  disabled = false,
}) => {
  return (
    <div className={`mtn__InputContainer ${size}`}>
      <label>
        {title} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        placeholder={title}
        readOnly={readOnly}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
