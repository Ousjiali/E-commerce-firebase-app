import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { FormGroup, Button, Input, Textarea } from "mtforms";
import React, { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Modal, Table } from "../../../components";
import Layout from "../../../layout";
import { columns } from "./Column";
import {
  useLoanType,
  useCreateLoanType,
  useDeleteLoanType,
  useUpdateLoanType,
} from "./hooks";

const LoanType = () => {
  const loading = useIsMutating();
  const isLoading = useIsFetching();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = useLoanType();
  const [formData, setFormData] = useState({
    minimunLoanAmount: 0,
    maximumLoanAmount: 0,
  });
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
  const { mutate, isSuccess, reset } = useCreateLoanType();
  const {
    mutate: editLoanType,
    isSuccess: success,
    reset: Reset,
  } = useUpdateLoanType();
  const submitHandler = () => {
    mutate(formData);
  };
  const { mutate: remove } = useDeleteLoanType();
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
    editLoanType(formData);
  };

  return (
    <Layout name="Loan Config" pageTitle="Loan Type">
      <div className="pageContents">
        <div className="btnContainer">
          <button className="btn green" onClick={openHandler}>
            Create Loan Type
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
          onClose={() => setOpen(!open)}
          content={
            <>
              <div className="modalTitle">
                Fill the form to {!edit ? "create a" : "update"} Loan Type
              </div>
              <FormGroup
                onSubmit={edit ? editHandler : submitHandler}
                validation={formData}
                errors={errors}
                setErrors={setErrors}
              >
                <Input
                  name="loanName"
                  label="Loan Name"
                  type="text"
                  value={formData["loanName"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.loanName}
                  size="large"
                />
                <Input
                  name="minimunLoanAmount"
                  label="Minimum Loan Amount"
                  type="number"
                  value={formData["minimunLoanAmount"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.minimunLoanAmount}
                  size="large"
                />
                <Input
                  name="maximumLoanAmount"
                  label="Maximum Loan Amount"
                  type="number"
                  value={formData["maximumLoanAmount"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.maximumLoanAmount}
                  size="large"
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
                  title={edit ? "Edit Loan Type" : "Create Loan Type"}
                  loading={loading === 1}
                  className="green"
                  size="large"
                />
              </FormGroup>
            </>
          }
        />
      </div>
    </Layout>
  );
};

export default LoanType;
