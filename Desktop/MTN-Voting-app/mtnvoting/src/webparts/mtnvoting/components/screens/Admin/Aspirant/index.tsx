import * as React from 'react'
import { AdminNavigation, Card, AdminHeader, MenuBar, Input, Modal, Spinner, DateInput, Select, Helpers } from '../../../containers'
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp"
import swal from 'sweetalert';


const Aspirant = ({ history }) => {

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
        { title: "Start Date", field: "StartDate", type: "string" as const },
        { title: "End Date", field: "EndDate", type: "string" as const },
        { title: "Time", field: "Time", type: "string" as const },
    ]);

    const [data, setData] = React.useState([])

    const [Date, setDate] = React.useState("")
    const [endDate, setEndDate] = React.useState("")
    const [time, setTime] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [id, setID] = React.useState(null)

    React.useEffect(() => {
        sp.web.lists.getByTitle(`AspirantRegistration`).items.get().then
            ((res) => {
                setData(res)
            })
    }, [])

    // Menubar Items
    const menu = [
        { name: "Approvals", url: "/admin/add", },
        { name: "Aspirant Registration", url: "/admin/aspirant", active: true, },
        { name: "Voting Exercise", url: "/admin/config" },
        { name: "Region", url: "/admin/region" },
        { name: "Location", url: "/admin/location" },
        { name: "Revoke Reasons", url: "/admin/reason" },
    ];

    const submitHandler = (e) => {
        e.preventDefault()
        sp.web.lists.getByTitle(`AspirantRegistration`).items.get().then
            ((res) => {
                if (res.length > 0) {
                    sp.web.lists.getByTitle("AspirantRegistration").items.getById(res[0].ID).update({
                        StartDate: Date,
                        EndDate: endDate,
                        Time: time,
                    }).then((res) => {
                        setOpen(false)
                        swal("Success", "Success", "success");
                        sp.web.lists.getByTitle(`AspirantRegistration`).items.get().then
                            ((res) => {
                                setData(res)
                            })
                    }).catch((e) => {
                        swal("Warning!", "An Error Occured, Try Again!", "error");
                        console.error(e);
                    });
                } else {
                    sp.web.lists.getByTitle("AspirantRegistration").items.add({
                        StartDate: Date,
                        EndDate: endDate,
                        Time: time,
                    }).then((res) => {
                        setOpen(false)
                        swal("Success", "Success", "success");
                        sp.web.lists.getByTitle(`AspirantRegistration`).items.get().then
                            ((res) => {
                                setData(res)
                            })

                    }).catch((e) => {
                        swal("Warning!", "An Error Occured, Try Again!", "error");
                        console.error(e);
                    });
                }
            })


    }

    const editHandler = (e) => {
        e.preventDefault()
        sp.web.lists.getByTitle("AspirantRegistration").items.getById(id).update({
            StartDate: Date,
            EndDate: endDate,
            Time: time,
        }).then((res) => {
            setOpen(false)
            swal("Success", "Success", "success");
            sp.web.lists.getByTitle(`AspirantRegistration`).items.get().then
                ((res) => {
                    setData(res)
                })
        }).catch((e) => {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    }
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete")) {
            sp.web.lists.getByTitle("AspirantRegistration").items.getById(id).delete().then((res) => {
                swal("Success", "deleted Successfully", "success");
                sp.web.lists.getByTitle(`AspirantRegistration`).items.get().then
                    ((res) => {
                        setData(res)
                    })
            });
        }
    }
    const openHandler = () => {
        setOpen(true)
        setEdit(false)
        setDate("")
        setEndDate("")
        setTime("")
    }


    return (
        <div className='appContainer'>
            <AdminNavigation config={`active`} />
            <div className='contentsRight'>
                <AdminHeader title='Voting Exercise' />
                <MenuBar menu={menu} />
                <div className='btnContainer right'>
                    <button onClick={openHandler} className="mtn__btn mtn__yellow" type='button'>Set Registration Date</button>
                </div>
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
                            tooltip: "Edit",

                            onClick: (event, rowData) => {
                                setEdit(true)
                                setOpen(true)
                                setID(rowData.ID)
                                setDate(rowData.StartDate)
                                setEndDate(rowData.EndDate)
                                setTime(rowData.Time)
                            },
                        },

                        {
                            icon: "visibility",
                            iconProps: { style: { fontSize: "20px", color: "gold" } },
                            tooltip: "Delete",

                            onClick: (event, rowData) => {
                                deleteHandler(rowData.ID)
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
                <Modal
                    isVisible={open}
                    title="Registration Date"
                    size='lg'
                    content={

                        loading ? <Spinner /> : <div className="mtn__InputFlex">

                            <DateInput
                                title="Start Date"
                                value={Date}
                                onChange={(e) => setDate(e.target.value)} type="text"

                            />
                            <DateInput
                                title="End Date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)} type="text"

                            />
                            <Input
                                title="Time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)} type="time"
                                size='mtn__adult'
                            />

                            <div className='btnContainer'>
                                <button
                                    onClick={edit ? editHandler : submitHandler}
                                    type="button"
                                    className='mtn__btn mtn__yellow'
                                >{edit ? "Edit Date" : "Set Date"}</button>
                            </div>


                        </div>

                    }
                    onClose={() => setOpen(false)}

                    footer=""

                />

            </div>
        </div>
    )
}

export default Aspirant