import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { FormGroup, Button, Input } from "mtforms";
import React, { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Modal, Table } from "../../components";
import Layout from "../../layout";
import { columns } from "./Column";
import { useBank, useCreateBank, useDeleteBank, useUpdateBank } from "./hooks";

const Bank = () => {
  const loading = useIsMutating();
  const isLoading = useIsFetching();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = useBank();
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
  const { mutate, isSuccess, reset } = useCreateBank();
  const {
    mutate: editBank,
    isSuccess: success,
    reset: Reset,
  } = useUpdateBank();
  const submitHandler = () => {
    mutate(formData);
  };
  const { mutate: remove } = useDeleteBank();
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
    editBank(formData);
  };

  return (
    <Layout name="Bank" pageTitle="Bank">
      <div className="pageContents">
        <div className="btnContainer">
          <button className="btn green" onClick={openHandler}>
            Create Bank
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
            deleteID="bankCode"
          />
        )}

        <Modal
          isVisible={open}
          onClose={() => setOpen(!open)}
          content={
            <>
              <div className="modalTitle">
                Fill the form to {!edit ? "create a" : "update"} Bank
              </div>
              <FormGroup
                onSubmit={edit ? editHandler : submitHandler}
                validation={formData}
                errors={errors}
                setErrors={setErrors}
              >
                <Input
                  name="bankName"
                  label="Bank Name"
                  type="text"
                  value={formData["bankName"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.bankName}
                  size="large"
                />
                <Input
                  name="bankCode"
                  label="Bank Code"
                  type="text"
                  value={formData["bankCode"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.bankCode}
                  size="large"
                />

                <Button
                  type="submit"
                  title={edit ? "Edit Bank" : "Create Bank"}
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

export default Bank;
