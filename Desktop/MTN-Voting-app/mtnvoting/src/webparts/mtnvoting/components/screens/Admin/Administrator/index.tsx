import * as React from 'react'
import { AdminNavigation, Card, AdminHeader, MenuBar, Input, Modal, Spinner, DateInput } from '../../../containers'
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp"
import swal from 'sweetalert';
import { graph } from "@pnp/graph";
import '@pnp/graph/users';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";


const Administrator = ({context}) => {

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
        { title: "Name", field: "Title", type: "string" as const },
        { title: "Email", field: "Email", type: "string" as const },

    ]);

    const [data, setData] = React.useState([])
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [id, setID] = React.useState(null)

    React.useEffect(() => {
        sp.web.lists.getByTitle(`Administrator`).items.get().then
            ((res) => {
                setData(res)
            })

    }, [])

    // Menubar Items
    const menu = [
        { name: "Approvals", url: "/admin/add", active: true, },
        { name: "Aspirant Registration", url: "/admin/aspirant" },
        { name: "Voting Exercise", url: "/admin/config", },
        { name: "Region", url: "/admin/region" },
        { name: "Location", url: "/admin/location" },
        { name: "Revoke Reasons", url: "/admin/reason" },
    ];

    const submitHandler = (e) => {
        e.preventDefault()
        sp.web.lists.getByTitle("Administrator").items.add({
            Title: name,
            Email: email
        }).then((res) => {
            setOpen(false)
            swal("Success", "Administrator added Successfully", "success");
            sp.web.lists.getByTitle(`Administrator`).items.get().then
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
        sp.web.lists.getByTitle("Administrator").items.getById(id).update({
            Title: name,
            Email: email
        }).then((res) => {
            setOpen(false)
            swal("Success", "Administrator Edited Successfully", "success");
            sp.web.lists.getByTitle(`Administrator`).items.get().then
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
            sp.web.lists.getByTitle("Administrator").items.getById(id).delete().then((res) => {
                swal("Success", "Administrator has been deleted", "success");
                sp.web.lists.getByTitle(`Administrator`).items.get().then
                    ((res) => {
                        setData(res)
                    })
            });
        }
    }
    const openHandler = () => {
        setOpen(true)
        setEdit(false)
        setName("")
        setEmail("")
    }

    const Handler = (e) => {
        setName(e.target.value)
        const staff = e.target.value
        graph.users.top(999).get().then((res) => {
            const filteredData = res.filter((x) => x.displayName === staff)
            setEmail(filteredData[0].mail)
        })

    }
    function getPeoplePickerItems(items: any[]) {
        setName(items[0].text)
        setEmail(items[0].secondaryText)
    }
    return (
        <div className='appContainer'>
            <AdminNavigation config={`active`} />
            <div className='contentsRight'>
                <AdminHeader title='Administrator' />
                <MenuBar menu={menu} />
                <div className='btnContainer right'>
                    <button onClick={openHandler} className="mtn__btn mtn__yellow" type='button'>Add Administrator</button>
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
                    title="Administrator"
                    size='lg'
                    content={

                        loading ? <Spinner /> : <div className="mtn__InputFlex">
                                                 <div className={`mtn__InputContainer mtn__adult`}>
                                <PeoplePicker
                                    context={context}
                                    titleText="Name"
                                    personSelectionLimit={1}
                                    groupName="" // Leave this blank in case you want to filter from all users
                                    showtooltip={true}
                                    required={true}
                                    disabled={false}
                                    onChange={getPeoplePickerItems}
                                    showHiddenInUI={false}
                                    principalTypes={[PrincipalType.User]}
                                    resolveDelay={1000}

                                />
                            </div>
                            <button
                                onClick={edit ? editHandler : submitHandler}
                                type="button"
                                className='mtn__btn mtn__yellow'
                            >{edit ? "Edit Administrator" : "Add Administrator"}</button>

                        </div>

                    }
                    onClose={() => setOpen(false)}

                    footer=""

                />
            </div>
        </div>
    )
}

export default Administrator