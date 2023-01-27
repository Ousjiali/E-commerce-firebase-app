import * as React from "react";
import styles from "./textarea.module.scss";
const TextArea = ({ onChange, value, required = false, readOnly = false }) => {
  return (
    <div className={styles.textArea__container}>
      <textarea
        placeholder="comment character shouldn't be less than 60"
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
      ></textarea>
    </div>
  );
};

export default TextArea;

export const TextAreaSmall = ({
  onChange,
  value,
  // style,
  rows = 3,
  required = false,
  readOnly = false,
}) => {
  return (
    <div>
      <textarea
        value={value}
        // style={style}
        onChange={onChange}
        rows={rows}
        required={required}
        readOnly={readOnly}
      ></textarea>
    </div>
  );
};
