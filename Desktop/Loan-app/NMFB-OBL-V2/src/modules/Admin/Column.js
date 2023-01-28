export const columns = [
  { title: "email", field: "email" },

  {
    title: "Role",
    field: "role",
    render: (item) => (
      <ul>
        {item?.role?.map((details, i) => (
          <li key={i}>{details.name}</li>
        ))}
      </ul>
    ),
  },
  { title: "Group", field: "groupName" },
];
