import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { FormGroup, Button, Input, Textarea } from "mtforms";
import React, { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Modal, Table } from "../../components";
import Layout from "../../layout";
import { columns } from "./Column";
import { useRole, useUpdateRole } from "./hooks";

const Role = () => {
  const loading = useIsMutating();
  const isLoading = useIsFetching();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = useRole();
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

  const {
    mutate: editRole,
    isSuccess: success,
    reset: Reset,
  } = useUpdateRole();

  if (success) {
    Reset();
    setOpen(false);
  }
  //   const openHandler = () => {
  //     setFormData("");
  //     setOpen(true);
  //     setEdit(false);
  //   };

  const editHandler = () => {
    editRole(formData);
  };

  return (
    <Layout name="Roles" pageTitle="Roles">
      <div className="pageContents">
        {/* <div className="btnContainer">
          <button className="btn green" onClick={openHandler}>
            Create Role
          </button> 
        </div>*/}
        {isLoading ? (
          <div className="center">
            <InfinitySpin width="200" color="#5cb85c" />
          </div>
        ) : (
          <Table
            columns={columns}
            data={data}
            setFormData={setFormData}
            setOpen={setOpen}
            setEdit={setEdit}
          />
        )}

        <Modal
          isVisible={open}
          size="lg"
          onClose={() => setOpen(!open)}
          content={
            <>
              <div className="modalTitle">Fill the form to edit Role</div>
              <FormGroup
                onSubmit={editHandler}
                // validation={formData}
                errors={errors}
                setErrors={setErrors}
              >
                <Input
                  name="name"
                  label="Role Name"
                  type="text"
                  value={formData["name"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.name}
                />
                <Input
                  name="sla"
                  label="SLA"
                  type="text"
                  value={formData["sla"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.sla}
                />
                <Input
                  name="minimumAmount"
                  label="Minimum Amount"
                  type="text"
                  value={formData["minimumAmount"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.minimumAmount}
                />
                <Input
                  name="maximumAmount"
                  label="Maximum Amount"
                  type="text"
                  value={formData["maximumAmount"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.maximumAmount}
                />

                <Textarea
                  name="description"
                  label="Description"
                  type="text"
                  value={formData["description"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.description}
                />

                <Button
                  type="submit"
                  title={edit ? "Edit Role" : "Create Role"}
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

export default Role;
