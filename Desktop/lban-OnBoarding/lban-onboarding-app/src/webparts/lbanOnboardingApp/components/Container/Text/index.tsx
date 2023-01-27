import * as React from "react";

const Text = ({ value, title, size = "midi" }) => {
  return (
    <div className={`onBoarding__InputContainer ${size}`}>
      <label>{title}</label>
      <h4 style={{ marginLeft: "5px", marginTop: "3px", fontWeight: "500" }}>
        {value}
      </h4>
    </div>
  );
};

export default Text;
