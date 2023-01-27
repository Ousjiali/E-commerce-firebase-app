import * as React from "react";
import { GiCheckMark } from "react-icons/gi";

const table = ({ score = 0 }) => {
  // const [score, setScore] = React.useState({score});

  return (
    <div className="tableContainer">
      <table>
        <tr>
          <th>Score Check</th>
          <th colSpan={4}>Actual Test Scores and Percentage</th>
          <th>Scales</th>
          <th>Recommendation</th>
        </tr>
        <tr>
          <td></td>
          <td colSpan={2}>Non-Supervisory</td>
          <td colSpan={2}>Supervisory</td>
          <td></td>
          <td></td>
          {/* <td >Supervisory</td> */}
        </tr>
        <tr>
          <td>Unit Check</td>
          <td>Score</td>
          <td>Percentage</td>
          <td>Score</td>
          <td>Percentage</td>
          <td></td>
        </tr>
        <tr>
          <td>
            {score > 0 && score <= 20 ? (
              <span className="table-icon">
                <GiCheckMark />
              </span>
            ) : null}
          </td>
          <td>0-20</td>
          <td>0%-39.99%</td>
          <td>0-28</td>
          <td>0%-39.99%</td>
          <td>Not Achieved</td>
          <td>Do not Confirm</td>
        </tr>
        <tr>
          <td>
            {score > 20 && score <= 31 ? (
              <span className="table-icon">
                <GiCheckMark />
              </span>
            ) : null}
          </td>
          <td>21-31</td>
          <td>40%-59.99%</td>
          <td>29-43</td>
          <td>40%-59.99%</td>
          <td>Partly Achieved</td>
          <td>
            Defer for three months following which another evaluation is
            conducted
          </td>
        </tr>
        <tr>
          <td>
            {score > 31 && score <= 36 ? (
              <span className="table-icon">
                <GiCheckMark />
              </span>
            ) : null}
          </td>
          <td>32–36</td>
          <td>60%-69.99%</td>
          <td>44–50</td>
          <td>60% -69.99%</td>
          <td>Achieved</td>
          <td>Confirm </td>
        </tr>
        <tr>
          <td>
            {score > 36 && score <= 41 ? (
              <span className="table-icon">
                <GiCheckMark />
              </span>
            ) : null}
          </td>
          <td>37-41</td>
          <td>70%-79.99%</td>
          <td>51–57</td>
          <td>70% -79.99%</td>
          <td>Achieved more than required</td>
          <td>Confirm </td>
        </tr>
        <tr>
          <td>
            {score > 41 ? (
              <span className="table-icon">
                <GiCheckMark />
              </span>
            ) : null}
          </td>
          <td>42-52</td>
          <td>80%-100%</td>
          <td>58-72</td>
          <td>80%-100%</td>
          <td>Exceed Target</td>
          <td>Confirm </td>
        </tr>
      </table>
      <p style={{ marginTop: "20px" }}>Note: Pass mark is 60%</p>
    </div>
  );
};

export default table;
