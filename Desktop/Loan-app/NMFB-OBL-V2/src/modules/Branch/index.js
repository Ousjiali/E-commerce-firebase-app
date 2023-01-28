import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { FormGroup, Button, Input, Select, Textarea } from "mtforms";
import React, { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Modal, Options, Table } from "../../components";
import Layout from "../../layout";
import { useBank } from "../Bank/hooks";
import { columns } from "./Column";
import {
  useBranch,
  useCreateBranch,
  useDeleteBranch,
  useUpdateBranch,
} from "./hooks";

const Branch = () => {
  const loading = useIsMutating();
  const isLoading = useIsFetching();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = useBranch();
  const banks = useBank();
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
  const { mutate, isSuccess, reset } = useCreateBranch();
  const {
    mutate: editBranch,
    isSuccess: success,
    reset: Reset,
  } = useUpdateBranch();
  const submitHandler = () => {
    mutate(formData);
  };
  const { mutate: remove } = useDeleteBranch();
  if (isSuccess || success) {
    reset();
    Reset();
    setOpen(false);
  }
  const openHandler = () => {
    setFormData("");
    setOpen(true);
    setEdit(false);
  };

  const editHandler = () => {
    editBranch(formData);
  };

  return (
    <Layout name="Branch" pageTitle="Branch">
      <div className="pageContents">
        <div className="btnContainer">
          <button className="btn green" onClick={openHandler}>
            Create Branch
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
            remove={remove}
            setFormData={setFormData}
            setOpen={setOpen}
            setEdit={setEdit}
            deleteID="code"
          />
        )}

        <Modal
          isVisible={open}
          size="lg"
          onClose={() => setOpen(!open)}
          content={
            <>
              <div className="modalTitle">
                Fill the form to {!edit ? "create a" : "update"} branch
              </div>
              <FormGroup
                onSubmit={edit ? editHandler : submitHandler}
                validation={formData}
                errors={errors}
                setErrors={setErrors}
              >
                <Input
                  name="name"
                  label="Branch Name"
                  type="text"
                  value={formData["name"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.name}
                />
                <Input
                  name="managerEmail"
                  label="Manager's Email"
                  type="text"
                  value={formData["managerEmail"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.managerEmail}
                />
                <Select
                  name="state"
                  value={formData["state"]}
                  onChange={handleChange}
                  required={true}
                  data={Options.allstate}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.state}
                  label="State"
                  labelClassName="whiteLabel"
                />
                <Select
                  name="localGovernment"
                  value={formData["localGovernment"]}
                  onChange={handleChange}
                  required={true}
                  data={formData["state"] && Options[formData["state"]]}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.localGovernment}
                  label="Local Government"
                  labelClassName="whiteLabel"
                />
                <Select
                  name="bankId"
                  value={formData["bankId"]}
                  onChange={handleChange}
                  required={true}
                  data={banks}
                  filter="bankName"
                  filterValue="id"
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.bankId}
                  label="Bank"
                  labelClassName="whiteLabel"
                />

                <Textarea
                  name="address"
                  label="Address"
                  type="text"
                  value={formData["address"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.address}
                />

                <Button
                  type="submit"
                  title={edit ? "Edit Branch" : "Create Branch"}
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

export default Branch;
