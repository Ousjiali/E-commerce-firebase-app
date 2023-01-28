import React, { useState } from "react";
import { Table, Modal } from "../../../components";
import Layout from "../../../layout";
import { usePendingLoan, useSummary } from "./hooks";
import { columns } from "../Column";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useIsFetching } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";
import styles from "./styles.module.css";

const PendingLoan = () => {
  const data = usePendingLoan();
  const loading = useIsFetching();
  const [credit, setCredit] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const { data: summary, refetch } = useSummary(selectedUser.code);

  const TotalCredit = summary?.reduce((acc, item) => item.credit + acc, 0);
  const TotalDebit = summary?.reduce((acc, item) => item.debit + acc, 0);

  return (
    <Layout name="Loan Request" pageTitle="Pending Loan">
      <div className="pageContents">
        {loading ? (
          <div className="center">
            <InfinitySpin width="200" color="#5cb85c" />
          </div>
        ) : (
          <Table
            data={data}
            columns={columns}
            url="/app/loan/pending"
            credit={true}
            setCredit={setCredit}
            setSelectedUser={setSelectedUser}
            refetch={refetch}
          />
        )}

        <Modal
          isVisible={credit}
          size="xl"
          onClose={() => setCredit(!credit)}
          content={
            <>
              <div className="modalTitle">Credit History</div>
              {loading ? (
                <div className="center">
                  <InfinitySpin width="200" color="#5cb85c" />
                </div>
              ) : (
                <>
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn green"
                    table="credit"
                    filename="Credit Summary"
                    sheet="tablexls"
                    buttonText="Download as XLS"
                  />
                  <table className={styles.table} id="credit">
                    <table className={styles.table}>
                      <tbody>
                        <tr>
                          <td>
                            <b>Name</b>
                          </td>
                          <td>
                            {selectedUser?.userDetails?.firstName +
                              " " +
                              selectedUser?.userDetails?.lastName}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Email Address</b>
                          </td>
                          <td>{selectedUser?.userDetails?.email}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Phone Number</b>
                          </td>
                          <td>{selectedUser?.userDetails?.phoneNumber}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Available Balance</b>
                          </td>
                          <td>{Math.round(TotalCredit - TotalDebit)}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Book Balance</b>
                          </td>
                          <td>{Math.round(TotalCredit - TotalDebit)}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Total Credit</b>
                          </td>
                          <td>{Math.round(TotalCredit)}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Total Debit</b>
                          </td>
                          <td>{Math.round(TotalDebit)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <br />
                    <br />
                    <table className={styles.table}>
                      <thead className={styles.tableBG}>
                        <tr>
                          <th>Year</th>
                          <th>Month</th>
                          <th>Total Debit</th>
                          <th>Total Credit</th>
                        </tr>
                      </thead>

                      <tbody>
                        {summary.map((item, index) => (
                          <tr key={index}>
                            <td>{item.year}</td>
                            <td>{item.month}</td>
                            <td>{item.debit}</td>
                            <td>{item.credit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </table>
                </>
              )}
            </>
          }
        />
      </div>
    </Layout>
  );
};

export default PendingLoan;
