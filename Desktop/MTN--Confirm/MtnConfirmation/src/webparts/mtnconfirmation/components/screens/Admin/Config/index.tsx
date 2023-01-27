import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Select,
  AdminHeader,
  Input,
  Navigation,
  Helpers,
  MenuBar,
  Spinner,
  Modal,
} from "../../../Containers";
import MaterialTable from "material-table";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { graph } from "@pnp/graph";
import "@pnp/graph/users";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";

const Roles = ({ context }) => {
  // Helpers
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
    { title: "Name", field: "Title", type: "string" as const },
    { title: "Role", field: "Role", type: "string" as const },
  ]);

  const [data, setData] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [id, setID] = React.useState(null);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      sp.web.lists
        .getByTitle(`Admin`)
        .items.filter(
          `Title eq '${response.DisplayName}' and Role eq 'HR HCM Administrator'`
        )
        .get()
        .then((res) => {
          if (res.length === 0) {
            history.push("/");
          }
        });
    });
  }, []);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`Admin`)
      .items.get()
      .then((res) => {
        setData(res);
      });
    sp.web.lists
      .getByTitle(`Role`)
      .items.get()
      .then((res) => {
        setRoles(res);
      });
  }, []);

  // Menubar Items
  const menu = [
    { name: "Admin", url: "/admin/config", active: true },
    { name: "Report", url: "/admin/config/report" },
    { name: "Roles", url: "/admin/roles" },
    { name: "Location", url: "/admin/location" },
    { name: "Division", url: "/admin/division" },
    { name: "Department", url: "/admin/Department" },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!role || !email) {
      swal("Warning!", "All fields required", "error");
      setLoading(false);
    } else {
      sp.web.lists
        .getByTitle("Admin")
        .items.filter(`Role eq '${role}' and Email eq '${email}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            swal("Warning!", "User already exist", "error");
            setLoading(false);
          } else
            sp.web.lists
              .getByTitle("Admin")
              .items.add({
                Title: name,
                Email: email,
                Role: role,
              })
              .then((res) => {
                setLoading(false);
                setOpen(false);
                swal("successful", {
                  buttons: { cancel: false, confirm: false },
                  timer: 2000,
                });
              })
              .catch((e) => {
                swal("Warning!", "An Error Occured, Try Again!", "error");
                console.error(e);
              });
        });
    }
  };

  const editHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("Admin")
      .items.getById(id)
      .update({
        Title: name,
        Email: email,
        Role: role,
      })
      .then((res) => {
        setOpen(false);
        swal("Success", "Admin Edited Successfully", "success");
        sp.web.lists
          .getByTitle(`Admin`)
          .items.get()
          .then((res) => {
            setData(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      sp.web.lists
        .getByTitle("Admin")
        .items.getById(id)
        .delete()
        .then((res) => {
          swal("Success", "Admin has been deleted", "success");
          sp.web.lists
            .getByTitle(`Admin`)
            .items.get()
            .then((res) => {
              setData(res);
            });
        });
    }
  };
  const openHandler = () => {
    setOpen(true);
    setEdit(false);
  };

  function getPeoplePickerItems(items: any[]) {
    setName(items[0].text);
    setEmail(items[0].secondaryText);
  }

  return (
    <div className="appContainer">
      <Navigation config={`active`} />
      <div className="contentsRight">
        <AdminHeader title="Roles" />
        <MenuBar menu={menu} />
        <div className="btnContainer right">
          <button
            onClick={openHandler}
            className="mtn__btns mtn__blue"
            type="button"
          >
            Add Admin
          </button>
        </div>
        <MaterialTable
          title=""
          columns={columns}
          data={data}
          options={{
            exportButton: true,
            actionsCellStyle: {
              backgroundColor: "none",
              color: "#FF00dd",
            },
            actionsColumnIndex: -1,

            headerStyle: {
              backgroundColor: "#FFCC00",
              color: "black",
            },
            rowStyle: {
              fontSize: 13,
            },
          }}
          style={{
            boxShadow: "none",
            width: "100%",
            background: "none",
            fontSize: "13px",
          }}
          // icons={{Add: () => 'Add Row'}}
          actions={[
            {
              icon: "visibility",
              iconProps: { style: { fontSize: "11px", color: "gold" } },
              tooltip: "Edit",

              onClick: (event, rowData) => {
                setEdit(true);
                setOpen(true);
                setID(rowData.ID);
                setName(rowData.Title);
                setRole(rowData.Role);
              },
            },
            {
              icon: "visibility",
              iconProps: { style: { fontSize: "11px", color: "gold" } },
              tooltip: "Delete",

              onClick: (event, rowData) => {
                deleteHandler(rowData.ID);
              },
            },
          ]}
          components={{
            Action: (props) => (
              <button
                onClick={(event) => props.action.onClick(event, props.data)}
                className="mtn__btn_table mtn__black"
              >
                {props.action.tooltip}
              </button>
            ),
          }}
        />
        <Modal
          isVisible={open}
          title="Admin"
          size="lg"
          content={
            loading ? (
              <Spinner />
            ) : (
              <div className="mtn__InputFlex">
                <div className={`mtn__InputContainer mtn__adult`}>
                  <PeoplePicker
                    context={context}
                    titleText="Employee Name"
                    personSelectionLimit={1}
                    groupName="" // Leave this blank in case you want to filter from all users
                    showtooltip={true}
                    required={true}
                    disabled={false}
                    onChange={getPeoplePickerItems}
                    showHiddenInUI={false}
                    principalTypes={[PrincipalType.User]}
                    resolveDelay={1000}
                  />
                </div>

                <Select
                  title="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  size="mtn__adult"
                  options={roles}
                  filter={true}
                  filterOption="Title"
                />

                <button
                  onClick={edit ? editHandler : submitHandler}
                  type="button"
                  className="mtn__btn mtn__yellow"
                >
                  {edit ? "Edit Admin" : "Add Admin"}
                </button>
              </div>
            )
          }
          onClose={() => setOpen(false)}
          footer=""
        />
      </div>
    </div>
  );
};

export default Roles;
