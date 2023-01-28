import React from "react";

export const columns = [
  { title: "Loan Name", field: "loanTypeName" },
  {
    title: "Document",
    field: "documentDetails",
    render: (item) => (
      <ul>
        {item?.documentDetails?.map((details, i) => (
          <li key={i}>{details.documentType}</li>
        ))}
      </ul>
    ),
  },
  { title: "Minimum Loan Amount", field: "minimunLoanAmount" },
  { title: "Maximum Loan Amount", field: "maximumLoanAmount" },
];
