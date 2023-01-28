import React from "react";
import { Table } from "../../components";
import Layout from "../../layout";
import { columns } from "../Loan/Column";
import { useIsFetching } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";
import { useAllLoan } from "../Dashboard/hooks";

const AllRequest = () => {
  const data = useAllLoan();
  const loading = useIsFetching();

  return (
    <Layout name="All Loan Request" pageTitle="All Loan Request">
      <div className="pageContents">
        {loading ? (
          <div className="center">
            <InfinitySpin width="200" color="#5cb85c" />
          </div>
        ) : (
          <Table data={data} columns={columns} url="/app/loan" />
        )}
      </div>
    </Layout>
  );
};

export default AllRequest;
