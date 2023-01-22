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
  TitleHeader,
} from "../../Containers";
import MaterialTable from "material-table";
import { sp } from "@pnp/sp";
import swal from "sweetalert";

const Division = () => {
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
    { title: "Division", field: "Title", type: "string" as const },
    { title: "Department", field: "Department", type: "string" as const },
    { title: "Unit", field: "Unit", type: "string" as const },
  ]);

  const [data, setData] = React.useState([]);
  const [Divisions, setDivisions] = React.useState("");
  const [Department, setDepartment] = React.useState("");
  const [Unit, setUnit] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [id, setID] = React.useState(null);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`Division`)
      .items.get()
      .then((res) => {
        setData(res);
        console.log(data);
      });
  }, []);

  // Menubar Items
  const menu = [
    { name: "Admin", url: "/admin/config/roles/add" },
    { name: "Roles", url: "/admin/config/roles" },
    { name: "Location", url: "/admin/config/location" },
    { name: "Division", url: "/admin/config/division", active: true },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("i am here");
    sp.web.lists
      .getByTitle("Division")
      .items.add({
        Title: Divisions,
        Department: Department,
        Unit: Unit,
      })
      .then((res) => {
        setOpen(false);
        swal("Success", "Division added Successfully", "success");
        sp.web.lists
          .getByTitle(`Division`)
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

  const editHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("Division")
      .items.getById(id)
      .update({
        Title: Divisions,
        Department: Department,
        Unit: Unit,
      })
      .then((res) => {
        setOpen(false);
        swal("Success", "Division Edited Successfully", "success");
        sp.web.lists
          .getByTitle(`Division`)
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
        .getByTitle("Division")
        .items.getById(id)
        .delete()
        .then((res) => {
          swal("Success", "Division has been deleted", "success");
          sp.web.lists
            .getByTitle(`Division`)
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

  return (
    <div className="appContainer">
      <Navigation config={`active`} />
      <div className="contentsRight">
        <div className="contentPage">
          <div className="dashboard">
            <TitleHeader title="Division" />
            <MenuBar menu={menu} />
            <div className="btnContainer right">
              <button
                onClick={openHandler}
                className="mtn__btns mtn__blue"
                type="button"
              >
                Add Division
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
                    setDivisions(rowData.Title);
                    setDepartment(rowData.Department);
                    setUnit(rowData.Unit);
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
              title="Division"
              size="lg"
              content={
                loading ? (
                  <Spinner />
                ) : (
                  <div className="mtn__InputFlex">
                    <Input
                      title="Division"
                      value={Divisions}
                      onChange={(e) => setDivisions(e.target.value)}
                      type="text"
                      size="mtn__adult"
                    />
                    <Input
                      title="Department"
                      value={Department}
                      onChange={(e) => setDepartment(e.target.value)}
                      type="text"
                      size="mtn__adult"
                    />
                    <Input
                      title="Unit"
                      value={Unit}
                      onChange={(e) => setUnit(e.target.value)}
                      type="text"
                      size="mtn__adult"
                    />

                    <button
                      onClick={edit ? editHandler : submitHandler}
                      type="button"
                      className="mtn__btn mtn__yellow"
                    >
                      {edit ? "Edit Division" : "Add Division"}
                    </button>
                  </div>
                )
              }
              onClose={() => setOpen(false)}
              footer=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Division;
