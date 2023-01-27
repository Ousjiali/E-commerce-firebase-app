import * as React from 'react'
import { AdminNavigation, Card, AdminHeader, MenuBar, Input, Modal, Spinner, DateInput } from '../../../containers'
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp"
import swal from 'sweetalert';


const AdminRegion = ({ history }) => {

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
        { title: "Region", field: "Title", type: "string" as const },
    ]);

    const [data, setData] = React.useState([])
    const [Region, setRegion] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [id, setID] = React.useState(null)

    React.useEffect(() => {
        sp.web.lists.getByTitle(`Region`).items.get().then
            ((res) => {
                setData(res)
            })

    }, [])

    // Menubar Items
    const menu = [
        { name: "Approvals", url: "/admin/add", },
        { name: "Aspirant Registration", url: "/admin/aspirant" },
        { name: "Voting Exercise", url: "/admin/config", },
        { name: "Region", url: "/admin/region", active: true, },
        { name: "Location", url: "/admin/location" },
        { name: "Revoke Reasons", url: "/admin/reason" },
    ];

    const submitHandler = (e) => {
        e.preventDefault()
        sp.web.lists.getByTitle("Region").items.add({
            Title: Region,
        }).then((res) => {
            setOpen(false)
            swal("Success", "Region added Successfully", "success");
            sp.web.lists.getByTitle(`Region`).items.get().then
                ((res) => {
                    setData(res)
                })

        }).catch((e) => {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });

    }

    const editHandler = (e) => {
        e.preventDefault()
        sp.web.lists.getByTitle("Region").items.getById(id).update({
            Title: Region,
        }).then((res) => {
            setOpen(false)
            swal("Success", "Region Edited Successfully", "success");
            sp.web.lists.getByTitle(`Region`).items.get().then
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
            sp.web.lists.getByTitle("Region").items.getById(id).delete().then((res) => {
                swal("Success", "Region has been deleted", "success");
                sp.web.lists.getByTitle(`Region`).items.get().then
                    ((res) => {
                        setData(res)
                    })
            });
        }
    }
    const openHandler = () => {
        setOpen(true)
        setEdit(false)
        setRegion("")
    }
    return (
        <div className='appContainer'>
            <AdminNavigation config={`active`} />
            <div className='contentsRight'>
                <AdminHeader title='Region' />
                <MenuBar menu={menu} />
                <div className='btnContainer right'>
                    <button onClick={openHandler} className="mtn__btn mtn__yellow" type='button'>Add Region</button>
                </div>
                <MaterialTable
                    title=""
                    columns={columns}
                    data={data}
                    options={{
                        exportButton: true,
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
                                setRegion(rowData.Title)

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
                    title="Region"
                    size='lg'
                    content={

                        loading ? <Spinner /> : <div className="mtn__InputFlex">
                            <Input
                                title="Region"
                                value={Region}
                                onChange={(e) => setRegion(e.target.value)} type="text"
                                size='mtn__adult'
                            />

                            <button
                                onClick={edit ? editHandler : submitHandler}
                                type="button"
                                className='mtn__btn mtn__yellow'
                            >{edit ? "Edit Region" : "Add Region"}</button>

                        </div>

                    }
                    onClose={() => setOpen(false)}

                    footer=""

                />
            </div>
        </div>
    )
}

export default AdminRegion