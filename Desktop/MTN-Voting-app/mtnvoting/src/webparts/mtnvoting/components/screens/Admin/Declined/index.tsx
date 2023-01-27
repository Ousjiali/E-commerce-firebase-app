import * as React from 'react'
import { AdminNavigation, Card, AdminHeader, Spinner } from '../../../containers'
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp"
import "@pnp/sp/sites";
import { IMtnvotingProps } from '../../../IMtnvotingProps';
import { useHistory } from 'react-router-dom'

import { SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse } from '@microsoft/sp-http';

const AdminDeclined: React.FC<IMtnvotingProps> = ({ context }: IMtnvotingProps) => {


    const history = useHistory()
    type IType =
        | "string"
        | "boolean"
        | "numeric"
        | "date"
        | "datetime"
        | "time"
        | "currency";
    const string: IType = "string";


    const [columns, setColumns] = React.useState([
        { title: "Employee Name", field: "EmployeeName", type: "string" as const },
        { title: "Email", field: "EmployeeEmail", type: "string" as const },
        { title: "Date Employed", field: "DateEmployed", type: "string" as const },
        { title: "Job Level", field: "JobLevel", type: "string" as const },
        { title: "Region", field: "Region", type: "string" as const },
        { title: "Location", field: "Location", type: "string" as const },
        { title: "Status", field: "Status", type: "string" as const },

    ]);


    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        sp.web.lists.getByTitle(`Nominees`).items.filter(`Status eq 'Declined'`).get().then
            ((res) => {
                setData(res)
                setLoading(false)
            })

        // context.spHttpClient.get(`https://lotusbetaanalytics.sharepoint.com/sites/business_solutions/_api/lists/GetByTitle('CURRENT HCM STAFF LIST-test')/items`,
        //     SPHttpClient.configurations.v1)
        //     .then((response: SPHttpClientResponse) => {
        //         response.json().then((responseJSON: any) => {
        //             console.log(responseJSON);
        //         });
        //     });

    }, [])
    return (
        <div className='appContainer'>
            <AdminNavigation declined={`active`} />
            <div className='contentsRight'>
                <AdminHeader title='Declined Request' />
                <MaterialTable
                    title=""
                    columns={columns}
                    data={data}
                    options={{
                        exportButton: true,
                        exportAllData:true,
                        actionsCellStyle: {
                            backgroundColor: "none",
                            color: "#FF00dd",
                        },
                        actionsColumnIndex: -1,

                        headerStyle: {
                            backgroundColor: "#FFCC00",
                            color: "black",
                        },

                    }}
                    style={{
                        boxShadow: "none",
                        width: "100%",
                        background: "none",
                        fontSize: "13px",
                    }}
                    // icons={{Add: () => 'Add Row'}}
                    actions={[
                        {
                            icon: "visibility",
                            iconProps: { style: { fontSize: "20px", color: "gold" } },
                            tooltip: "View",

                            onClick: (event, rowData) => {
                                history.push(`/admin/declined/${rowData.ID}`)
                            },
                        },
                    ]}
                    components={{
                        Action: (props) => (
                            <button
                                onClick={(event) => props.action.onClick(event, props.data)}
                                className="mtn__btn__table mtn__black"
                            >
                                {props.action.tooltip}
                            </button>
                        ),
                    }}
                />
            </div>
        </div>
    )
}

export default AdminDeclined