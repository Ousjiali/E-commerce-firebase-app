import * as React from "react";

const Select = ({
  onChange,
  value,
  title,
  data,
  readOnly = false,
  required = false,
  filter = "",
  filterValue = "",
  secondaryFilter = "",
  secondaryValue = "",
  concat = "",
  size = "medium",
}) => {
  return (
    <div className={`nirsal__InputContainer ${size}`}>
      <label>{title}</label>
      <select
        onChange={onChange}
        value={value}
        // defaultValue={title}
        readOnly={readOnly}
        required={required}
      >
        {" "}
        <option value="" disabled>
          {title}
        </option>
        {data &&
          data.map((item, i) =>
            filter ? (
              <option
                value={
                  secondaryValue ? item[secondaryValue] : item[filterValue]
                }
                key={i}
              >
                {secondaryFilter
                  ? item[filter][secondaryFilter] + " " + item[filter][concat]
                  : item[filter]}
              </option>
            ) : (
              <option value={item.value} key={i}>
                {item.value}
              </option>
            )
          )}
      </select>
    </div>
  );
};

export default Select;
