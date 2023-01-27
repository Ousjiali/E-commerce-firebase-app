import * as React from "react";

const Select = ({
  onChange,
  value,
  name = "name",
  title,
  options,
  required = false,
  filter = false,
  filterOption = "",
  onBlur = null,
  size = "mtn__child",
  readOnly = false,
  disabled = false,
}) => {
  return (
    <div className={`onBoarding__InputContainer ${size}`}>
      <label>
        {title} {required && <span className="required">*</span>}
      </label>
      <select
        onChange={onChange}
        value={value}
        // defaultValue={title}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        name={name}
      >
        <option value="" disabled>
          {title}
        </option>
        {options &&
          options.map((item) =>
            !filter ? (
              <option value={item.value}>{item.value}</option>
            ) : (
              <option value={item[filterOption]}>{item[filterOption]}</option>
            )
          )}
      </select>
    </div>
  );
};

export default Select;
