export const columns = [
  { title: "Title", field: "userDetails.firstName" },
  { title: "Fullname", field: "userDetails.lastName" },
  { title: "Email", field: "userDetails.email" },
  { title: "Mobile", field: "userDetails.phoneNumber", type: "numeric" },
  { title: "Loan Type", field: "loanType", type: "numeric" },
  { title: "Loan Amount", field: "loanAmount", type: "numeric" },
  {
    title: "Eligible Amount",
    field: "eligibleAmount",
    type: "numeric",
  },
  {
    title: "Recommended Amount",
    field: "recommendedAmount",
    type: "numeric",
  },
  {
    title: "Status",
    field: "status",
  },
];
