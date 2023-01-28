import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { FormGroup, Button, Input, Textarea } from "mtforms";
import React, { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Modal, Table } from "../../components";
import Layout from "../../layout";
import { columns } from "./Column";
import {
  useGroup,
  useCreateGroup,
  useDeleteGroup,
  useUpdateGroup,
} from "./hooks";

const Group = () => {
  const loading = useIsMutating();
  const isLoading = useIsFetching();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = useGroup();
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
  const { mutate, isSuccess, reset } = useCreateGroup();
  const {
    mutate: editGroup,
    isSuccess: success,
    reset: Reset,
  } = useUpdateGroup();
  const submitHandler = () => {
    mutate(formData);
  };
  const { mutate: remove } = useDeleteGroup();
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
    editGroup(formData);
  };

  return (
    <Layout name="Groups" pageTitle="Groups">
      <div className="pageContents">
        <div className="btnContainer">
          <button className="btn green" onClick={openHandler}>
            Create Group
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
                Fill the form to {!edit ? "create a" : "update"} Group
              </div>
              <FormGroup
                onSubmit={edit ? editHandler : submitHandler}
                validation={formData}
                errors={errors}
                setErrors={setErrors}
              >
                <Input
                  name="name"
                  label="Group Name"
                  type="text"
                  value={formData["name"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.name}
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
                  title={edit ? "Edit Group" : "Create Group"}
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

export default Group;
