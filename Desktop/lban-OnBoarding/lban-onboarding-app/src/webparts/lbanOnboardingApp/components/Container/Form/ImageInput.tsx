import * as React from "react";

const ImageUpload = ({
  onChange,
  title,
  value,
  loading = false,
  required = false,
  disabled = false,
  accept = "",
}) => {
  return (
    <div className="onBoarding__InputContainer mtn__child">
      <div className="uploadWrapper">
        <button className="mtn__btn uploadBtn_" disabled={loading}>
          {title} {loading && <span className="loading"></span>}
        </button>
        <input
          type="file"
          onChange={onChange}
          value={value}
          required={required}
          disabled={disabled}
          accept={accept}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
