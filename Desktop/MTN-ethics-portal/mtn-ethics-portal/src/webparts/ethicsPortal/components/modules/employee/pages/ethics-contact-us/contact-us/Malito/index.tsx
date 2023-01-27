import * as React from "react";

const Malito = ({ email, subject, body, ...props }) => {
  //   let emailLink = `https://outlook.live.com/mail/0/deeplink/compose?to=nwaeze@lotusbetaanalytics.com `;
  return (
    <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
      {props.children}
    </a>
  );
};

export default Malito;
