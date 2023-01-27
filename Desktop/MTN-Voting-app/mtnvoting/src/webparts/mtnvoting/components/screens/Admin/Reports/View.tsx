import * as React from 'react'
import { AdminNavigation, Card, AdminHeader, MenuBar, Input, Modal, Spinner, DateInput, Select, Helpers } from '../../../containers'
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp"
import swal from 'sweetalert';
import styles from './table.module.scss'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const AdminResult = ({ history, match }) => {

    const params = match.params.title

    type IType =
        | "string"
        | "boolean"
        | "numeric"
        | "date"
        | "datetime"
        | "time"
        | "currency";
    const string: IType = "string";




    const [data, setData] = React.useState([])
    const [votes, setVotes] = React.useState([])
    const [test, setTest] = React.useState([])
    const [locations, setLocations] = React.useState([])
    const [location, setLocation] = React.useState("")
    const [regions, setRegions] = React.useState([])
    const [region, setRegion] = React.useState("")
    const [Title, setTitle] = React.useState("")
    const [country, setCountry] = React.useState("")
    const [NomineeCount, setNomineeCount] = React.useState(null)

    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [id, setID] = React.useState(null)

    const today = new Date().toJSON().slice(0, 10)
    React.useEffect(() => {
        sp.web.lists.getByTitle(`Votes`).items.get().then
            ((res) => {
                setVotes(res)
            })
    }, [])

    React.useEffect(() => {
        setLoading(true)
        sp.web.lists.getByTitle(`Nominees`).items.filter(`Status eq 'Approved' and Constituency eq '${params}'`).get().then
            ((res) => {
                setData(res)
                setLoading(false)
            })
    }, [])

    const voteCount = (id) => {
        var count = votes.filter((x) => x.Nominee == id)
        console.log(count)
        return count.length
    }


    const [columns, setColumns] = React.useState([
        { title: "Candidate", field: "EmployeeName", type: "string" as const },
        { title: "Votes", field: "", render: rowData => voteCount(rowData.ID), type: "string" as const },
    ]);

    return (
        <div className='appContainer'>
            <AdminNavigation report={`active`} />
            <div className='contentsRight'>
                <AdminHeader title='Results' />

                {loading ? <Spinner /> :
                    <>
                        <div className='btnContainer right'>
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="mtn__btn mtn__black"
                                table="myTable"
                                filename={`${params} Election Results`}
                                sheet="tablexls"
                                buttonText="Download as XLS" />
                        </div>

                        <table className={styles.table} id="myTable">
                            <thead className={styles.thead}>
                                <th className={styles.th}>Election Date</th>
                                <th className={styles.th}>Candidate</th>
                                <th className={styles.th}>Votes</th>
                            </thead>
                            <tbody>

                                {data.map((item, i) => (
                                    <tr key={i} className={styles.tr}>
                                         <td className={styles.td}>{item.EndDate}</td>
                                        <td className={styles.td}>{item.EmployeeName}</td>
                                        <td className={styles.td}>{voteCount(item.ID)}</td>
                                       

                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </>


                    // <MaterialTable
                    //     title=""
                    //     columns={columns}
                    //     data={data}
                    //     options={{
                    //         exportButton: true,
                    //         actionsCellStyle: {
                    //             backgroundColor: "none",
                    //             color: "#FF00dd",
                    //         },
                    //         actionsColumnIndex: -1,

                    //         headerStyle: {
                    //             backgroundColor: "#FFCC00",
                    //             color: "black",
                    //         },

                    //     }}
                    //     style={{
                    //         boxShadow: "none",
                    //         width: "100%",
                    //         background: "none",
                    //         fontSize: "13px",
                    //     }}
                    // // icons={{Add: () => 'Add Row'}}

                    // />
                }
            </div>
        </div>
    )
}

export default AdminResult