import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { FormGroup, Button, Input, Select } from "mtforms";
import React, { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Modal, Table, Switch, List } from "../../../components";
import Layout from "../../../layout";
import { useDocument } from "../Document/hooks";
import { useLoanType } from "../LoanType/hooks";
import { columns } from "./Column";
import {
  useChecklist,
  useCreateChecklist,
  useDeleteChecklist,
  useUpdateChecklist,
} from "./hooks";

const Checklist = () => {
  const loading = useIsMutating();
  const isLoading = useIsFetching();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [hasRange, setHasRange] = useState(false);
  const [docs, setDocs] = useState(false);
  const [documentType, setDocumentType] = useState([]);
  const [doc, setDoc] = useState("");
  const data = useChecklist();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const loanType = useLoanType();
  const documents = useDocument();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };
  const { mutate, isSuccess, reset } = useCreateChecklist();
  const {
    mutate: editChecklist,
    isSuccess: success,
    reset: Reset,
  } = useUpdateChecklist();
  const submitHandler = () => {
    const data = { ...formData, hasRange: hasRange };
    mutate(data);
  };
  const { mutate: remove } = useDeleteChecklist();
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
    const data = { ...formData, hasRange: hasRange };
    editChecklist(data);
  };

  const documentChange = (name, value) => {
    setDoc(value);
    setDocumentType([...documentType, value]);
  };
  const documentHandler = (e) => {
    setFormData({ ...formData, documentId: documentType });
  };

  //   get document name by ID
  const getDocument = (id) => {
    const documentName = documents?.find((x) => x.id === parseInt(id));
    return documentName?.documentType;
  };

  // api data restructure
  const myFunction = (rowData) => {
    setFormData({
      ...formData,
      documentId: rowData?.documentDetails,
      ...rowData,
    });
    setHasRange(rowData.hasRange);
    setDocs(true);
    var arr = [];
    for (var i = 0; i < rowData?.documentDetails?.length; i++) {
      arr.push(rowData?.documentDetails?.[i]?.id);
    }
    setDocumentType(arr);
  };

  //   reomve ID
  const removeHandler = (id) => {
    const data = formData["documentId"]?.filter((x) => x !== id);
    setFormData({ ...formData, documentId: data });
    setDocumentType(data);
  };

  return (
    <Layout name="Loan Config" pageTitle="Checklist">
      <div className="pageContents">
        <div className="btnContainer">
          <button className="btn green" onClick={openHandler}>
            Create Checklist
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
            myFunction={myFunction}
          />
        )}

        <Modal
          isVisible={open}
          onClose={() => setOpen(!open)}
          size="lg"
          content={
            <>
              <div className="modalTitle">
                Fill the form to {!edit ? "create a" : "update"} Checklist
              </div>
              <FormGroup
                onSubmit={edit ? editHandler : submitHandler}
                validation={formData}
                errors={errors}
                setErrors={setErrors}
              >
                <Select
                  name="loanTypeId"
                  value={formData["loanTypeId"]}
                  onChange={handleChange}
                  required={true}
                  data={loanType}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.loanTypeId}
                  label="Loan Type"
                  labelClassName="whiteLabel"
                  filter="loanName"
                  filterValue="id"
                  size="large"
                />
                <Switch
                  title="Has Range"
                  checked={hasRange}
                  onChange={(e) => setHasRange(!hasRange)}
                />

                {hasRange && (
                  <>
                    <Input
                      name="minimunLoanAmount"
                      label="Minimum Loan Amount"
                      type="text"
                      value={formData["minimunLoanAmount"]}
                      onChange={handleChange}
                      required={hasRange}
                      className="whiteBorder"
                      validationHandler={validationHandler}
                      error={errors.minimunLoanAmount}
                      size="large"
                    />
                    <Input
                      name="maximumLoanAmount"
                      label="Maximum Loan Amount"
                      type="text"
                      value={formData["maximumLoanAmount"]}
                      onChange={handleChange}
                      required={hasRange}
                      className="whiteBorder"
                      validationHandler={validationHandler}
                      error={errors.maximumLoanAmount}
                      size="large"
                    />
                  </>
                )}
                <Switch
                  title="Add Documents"
                  checked={docs}
                  onChange={() => setDocs(!docs)}
                />
                {docs && (
                  <>
                    <Select
                      name="document"
                      value={doc}
                      onChange={documentChange}
                      //   required={docs}
                      data={documents}
                      className="whiteBorder"
                      validationHandler={validationHandler}
                      error={errors.document}
                      label="Document"
                      labelClassName="whiteLabel"
                      filter="documentType"
                      filterValue="id"
                      size="large"
                    />
                    <Button
                      type="button"
                      title="Add Document"
                      className="success"
                      size="large"
                      onClick={documentHandler}
                    />
                  </>
                )}
                <div className="cardFlex">
                  {formData["documentId"]?.map((item, i) => (
                    <List
                      key={i}
                      name={getDocument(item?.id ? item?.id : item)}
                      remove={() => removeHandler(item?.id ? item?.id : item)}
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  title={edit ? "Edit Checklist" : "Create Checklist"}
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

export default Checklist;
