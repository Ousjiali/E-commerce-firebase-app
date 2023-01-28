import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { FormGroup, Button, Input } from "mtforms";
import React, { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Modal, Table } from "../../../components";
import Layout from "../../../layout";
import { columns } from "./Column";
import {
  useDocument,
  useCreateDocument,
  useDeleteDocument,
  useUpdateDocument,
} from "./hooks";

const Document = () => {
  const loading = useIsMutating();
  const isLoading = useIsFetching();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = useDocument();
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
  const { mutate, isSuccess, reset } = useCreateDocument();
  const {
    mutate: editDocument,
    isSuccess: success,
    reset: Reset,
  } = useUpdateDocument();
  const submitHandler = () => {
    mutate(formData);
  };
  const { mutate: remove } = useDeleteDocument();
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
    editDocument(formData);
  };

  return (
    <Layout name="Loan Config" pageTitle="Document">
      <div className="pageContents">
        <div className="btnContainer">
          <button className="btn green" onClick={openHandler}>
            Create Document
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
                Fill the form to {!edit ? "create a" : "update"} Document
              </div>
              <FormGroup
                onSubmit={edit ? editHandler : submitHandler}
                validation={formData}
                errors={errors}
                setErrors={setErrors}
              >
                <Input
                  name="documentType"
                  label="Document"
                  type="text"
                  value={formData["documentType"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.documentType}
                  size="large"
                />

                <Button
                  type="submit"
                  title={edit ? "Edit Document" : "Create Document"}
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

export default Document;
