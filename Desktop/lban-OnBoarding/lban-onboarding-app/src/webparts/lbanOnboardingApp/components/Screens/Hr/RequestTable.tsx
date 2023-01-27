import * as React from "react";
import { useHistory } from "react-router-dom";

// import { Header, Spinner } from "../../../Containers";
import { sp } from "@pnp/sp";
import { graph } from "@pnp/graph";
import "@pnp/graph/users";
import { AppWrapper } from "../../Container/AppWrapper";
import MenuBar from "../../Container/Profile MenuBar";
import { Menu } from "../../Container/AppNavigation";
import { map } from "lodash";

const HRViewRequest = () => {
  const history = useHistory();

  type IType =
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  const string: IType = "string";

  const [columns, setColumns] = React.useState([
    { title: "Employee Name", field: "StaffName", type: "string" as const },
    {
      title: "Employee Email",
      field: "StaffEmail",
      type: "string" as const,
    },
    ,
  ]);

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [ID, setID] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`StaffProfile`)
      .items.filter(`ProfileStatus eq 'Pending'`)
      .getAll()
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  const btnHandler = (item) => {
    history.push(`/hr/profile-biodata/${item.ID}`);
  };

  return (
    <AppWrapper menu={menu} showBackButton={true}>
      <div className="Displayflex">
        {loading ? (
          <div>Loading</div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "rgba(155, 28, 141, 1)",
                color: "white",
                padding: "1rem 4rem",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              <div>SN</div>
              <div style={{ marginRight: "2rem" }}>Staff Name</div>
              <div style={{ marginRight: "1rem" }}>Action</div>
            </div>
            {data?.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "1rem 4rem",
                  fontWeight: "bold",
                }}
              >
                <div>{i + 1}</div>
                <div>{item.StaffName}</div>
                <div>
                  <button
                    className="btns smallBtn"
                    type="button"
                    onClick={() => btnHandler(item)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppWrapper>
  );
};

export default HRViewRequest;
const menu: Menu[] = [
  { title: "Pending", link: "/hr/viewrequest" },
  { title: "Approved", link: "/hr/approved" },
  { title: "Roles", link: "/manage-roles" },
];
