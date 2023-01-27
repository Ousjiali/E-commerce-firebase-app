import * as React from "react";
const TextArea = ({
  onChange,
  value,
  title,
  required = false,
  readOnly = false,
  disabled = false,
  name = "name",
}) => {
  return (
    <div className="textArea__container">
      <label>
        {title} {required && <span className="required">*</span>}
      </label>
      <textarea
        placeholder={title}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
      ></textarea>
    </div>
  );
};

export default TextArea;
