import React from "react";
import "./Infobox.css";

function Infobox({ title, count, Icon, color }) {
  return (
    <div className="infobox">
      <div className="grid">
        <div className="card">
          <h1>{title}</h1>
          <p>{count}</p>
        </div>
        <div className="card">
          <Icon style={{ color: color }} />
        </div>
      </div>
    </div>
  );
}

export default Infobox;
