import { useIsFetching } from "@tanstack/react-query";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Table } from "../../components";
import Layout from "../../layout";
import { columns } from "./Column";
import { useAudit } from "./hooks";

const Audit = () => {
  const isLoading = useIsFetching();
  const data = useAudit();
  console.log(data, "audit");
  return (
    <Layout name="Audit" pageTitle="Audit">
      <div className="pageContents">
        {isLoading ? (
          <div className="center">
            <InfinitySpin width="200" color="#5cb85c" />
          </div>
        ) : (
          <Table columns={columns} data={data} />
        )}
      </div>
    </Layout>
  );
};

export default Audit;
