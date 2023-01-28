import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { FormGroup, Button, Input, Select } from "mtforms";
import React, { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { List, Modal, Table } from "../../components";
import Layout from "../../layout";
import { useGroup } from "../Groups/hooks";
import { useRole } from "../Roles/hooks";
import { columns } from "./Column";
import {
  useAdmin,
  useCreateAdmin,
  //   useDeleteAdmin,
  useUpdateAdmin,
} from "./hooks";

const Admin = () => {
  const loading = useIsMutating();
  const isLoading = useIsFetching();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = useAdmin();
  const [roles, setRoles] = useState(false);
  const [roleType, setRoleType] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };
  const { mutate, isSuccess, reset } = useCreateAdmin();
  const {
    mutate: editAdmin,
    isSuccess: success,
    reset: Reset,
  } = useUpdateAdmin();
  const submitHandler = () => {
    mutate(formData);
  };
  //   const { mutate: remove } = useDeleteAdmin();
  if (isSuccess || success) {
    reset();
    Reset();
    setOpen(false);
  }
  const openHandler = () => {
    setFormData("");
    setOpen(true);
    setEdit(false);
    setRoleType([]);
  };

  const editHandler = () => {
    editAdmin(formData);
  };
  const group = useGroup();
  const role = useRole();

  const roleChange = (name, value) => {
    setRoles(value);
    setRoleType([...roleType, value]);
  };
  const roleHandler = (e) => {
    setFormData({ ...formData, roleId: roleType });
  };

  //   get role name by ID
  const getRole = (id) => {
    const roleName = role?.find((x) => x.id === parseInt(id));
    return roleName?.name;
  };

  //   reomve ID
  const removeHandler = (id) => {
    const data = formData["roleId"]?.filter((x) => x !== id);
    setFormData({ ...formData, roleId: data });
    setRoleType(data);
  };

  // api data restructure
  const myFunction = (rowData) => {
    var arr = [];
    for (var i = 0; i < rowData?.role?.length; i++) {
      arr.push(rowData?.role?.[i]?.id);
    }
    setRoleType(arr);
    setFormData({
      ...formData,
      roleId: arr,
      ...rowData,
    });
  };

  return (
    <Layout name="Admin" pageTitle="Admin">
      <div className="pageContents">
        <div className="btnContainer">
          <button className="btn green" onClick={openHandler}>
            Create Admin
          </button>
        </div>
        {isLoading ? (
          <div className="center">
            <InfinitySpin width="200" color="#5cb85c" />
          </div>
        ) : (
          <Table
            columns={columns}
            data={data}
            // remove={remove}
            setFormData={setFormData}
            setOpen={setOpen}
            setEdit={setEdit}
            deleteID="code"
            myFunction={myFunction}
          />
        )}

        <Modal
          isVisible={open}
          size="lg"
          onClose={() => setOpen(!open)}
          content={
            <>
              <div className="modalTitle">
                Fill the form to {!edit ? "create a" : "update"} Admin
              </div>
              <FormGroup
                onSubmit={edit ? editHandler : submitHandler}
                // validation={formData}
                errors={errors}
                setErrors={setErrors}
              >
                <Input
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData["email"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.email}
                />

                <Select
                  name="group"
                  value={formData["group"]}
                  onChange={handleChange}
                  required={true}
                  data={group}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.group}
                  label="Group"
                  labelClassName="whiteLabel"
                  filter="name"
                  filterValue="id"
                />

                <Select
                  name="role"
                  value={roles}
                  onChange={roleChange}
                  //   required={docs}
                  data={role}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.role}
                  label="Role"
                  labelClassName="whiteLabel"
                  filter="name"
                  filterValue="id"
                  size="large"
                />
                <Button
                  type="button"
                  title="Add Role"
                  className="success"
                  size="large"
                  onClick={roleHandler}
                />
                <div className="cardFlex">
                  {formData["roleId"]?.map((item, i) => (
                    <List
                      key={i}
                      name={getRole(item?.id ? item?.id : item)}
                      remove={() => removeHandler(item?.id ? item?.id : item)}
                    />
                  ))}
                </div>
                <Button
                  type="submit"
                  title={edit ? "Edit Admin" : "Create Admin"}
                  loading={loading === 1}
                  className="green"
                />
              </FormGroup>
            </>
          }
        />
      </div>
    </Layout>
  );
};

export default Admin;
