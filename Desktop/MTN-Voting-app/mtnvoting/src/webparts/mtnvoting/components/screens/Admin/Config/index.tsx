import * as React from 'react'
import { AdminNavigation, Card, AdminHeader, MenuBar, Input, Modal, Spinner, DateInput, Select, Helpers } from '../../../containers'
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp"
import swal from 'sweetalert';


const AdminConfig = ({ history }) => {

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
        { title: "Constituency", field: "Title", type: "string" as const },
        { title: "Number of Applicable Candidate", field: "NomineeCount", type: "string" as const },
        { title: "Start Date", field: "Date", type: "string" as const },
        { title: "End Date", field: "EndDate", type: "string" as const },
        { title: "Time", field: "Time", type: "string" as const },
        // { title: "Country", field: "Country", type: "string" as const },
        { title: "Region", field: "Region", type: "string" as const },
        { title: "Location", field: "Location", type: "string" as const },

    ]);

    const [data, setData] = React.useState([])
    const [locations, setLocations] = React.useState([])
    const [location, setLocation] = React.useState("")
    const [regions, setRegions] = React.useState([])
    const [region, setRegion] = React.useState("")
    const [Title, setTitle] = React.useState("")
    // const [country, setCountry] = React.useState("")
    const [NomineeCount, setNomineeCount] = React.useState(null)
    const [Date, setDate] = React.useState("")
    const [endDate, setEndDate] = React.useState("")
    const [time, setTime] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [iopen, setiOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [id, setID] = React.useState(null)

    React.useEffect(() => {
        sp.web.lists.getByTitle(`Constituency`).items.get().then
            ((res) => {
                setData(res)
            })
        sp.web.lists.getByTitle(`Region`).items.get().then
            ((resp) => {
                setRegions(resp)
            })

    }, [])

    // Menubar Items
    const menu = [
        { name: "Approvals", url: "/admin/add", },
        { name: "Aspirant Registration", url: "/admin/aspirant" },
        { name: "Voting Exercise", url: "/admin/config", active: true, },
        { name: "Region", url: "/admin/region" },
        { name: "Location", url: "/admin/location" },
        { name: "Revoke Reasons", url: "/admin/reason" },
    ];

    const submitHandler = (e) => {
        e.preventDefault()
        sp.web.lists.getByTitle("Constituency").items.add({
            Title: Title,
            NomineeCount: NomineeCount,
            Date: Date,
            EndDate: endDate,
            Time: time,
            Region: region,
            Location: location,
            // Country: country,
            Status: "Open"
        }).then((res) => {
            setOpen(false)
            swal("Success", "Voting Exercise added Successfully", "success");
            sp.web.lists.getByTitle(`Constituency`).items.get().then
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
        sp.web.lists.getByTitle("Constituency").items.getById(id).update({
            Title: Title,
            NomineeCount: NomineeCount,
            Date: Date,
            EndDate: endDate,
            Time: time,
            Region: region,
            Location: location,
            // Country: country
        }).then((res) => {
            setOpen(false)
            swal("Success", "Voting Exercise Edited Successfully", "success");
            sp.web.lists.getByTitle(`Constituency`).items.get().then
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
            sp.web.lists.getByTitle("Constituency").items.getById(id).delete().then((res) => {
                swal("Success", "Voting Exercise has been deleted", "success");
                sp.web.lists.getByTitle(`Constituency`).items.get().then
                    ((res) => {
                        setData(res)
                    })
            });
        }
    }
    const openHandler = () => {
        setOpen(true)
        setEdit(false)
        setTitle("")
        setNomineeCount("")
        setDate("")
        setEndDate("")
        setTime("")
        setLocation("")
        setRegion("")
    }
    const iopenHandler = () => {
        setiOpen(true)
        setDate("")
        setEndDate("")
        setTime("")
    }
    const regionHandler = (e) => {
        setRegion(e.target.value)
        sp.web.lists.getByTitle(`Location`).items.filter(`Region eq '${e.target.value}'`).get().then
            ((res) => {
                setLocations(res)
            })
    }

    const stopHandler = (id) => {
        if (window.confirm("Are you sure you stop this exercise")) {
            sp.web.lists.getByTitle("Constituency").items.getById(id).update({
                Status: "Closed"
            }).then((res) => {
                setOpen(false)
                swal("Success", "Voting has Ended", "success");
                sp.web.lists.getByTitle(`Constituency`).items.get().then
                    ((res) => {
                        setData(res)
                    })
            }).catch((e) => {
                swal("Warning!", "An Error Occured, Try Again!", "error");
                console.error(e);
            });
        }
    }

    const startHandler = (id) => {
        sp.web.lists.getByTitle("Constituency").items.getById(id).update({
            Status: "Open"
        }).then((res) => {
            setOpen(false)
            swal("Success", "Voting has Started", "success");
            sp.web.lists.getByTitle(`Constituency`).items.get().then
                ((res) => {
                    setData(res)
                })
        }).catch((e) => {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    }

    const allHandler =() => {
        sp.web.lists.getByTitle(`Constituency`).items.get().then
            ((res) => {
                if (res.length > 0) {
                    setLoading(true)
                    for (let i = 0; i < res.length; i++) {
                        sp.web.lists.getByTitle("Constituency").items.getById(res[i].ID).update({
                            Date: Date,
                            EndDate: endDate,
                            Time: time,
                        }).then((res) => {
                        
                        }).catch((e) => {
                            swal("Warning!", "An Error Occured, Try Again!", "error");
                            console.error(e);
                        });
                        if(i == res.length - 1){
                            setLoading(false)
                            setiOpen(false)
                    swal("Success", "Success", "success");
                        sp.web.lists.getByTitle(`Constituency`).items.get().then
                    ((res) => {
                        setData(res)
                    })
                 
                          }
                    }
                 
                  
                }
            })

    }
    return (
        <div className='appContainer'>
            <AdminNavigation config={`active`} />
            <div className='contentsRight'>
                <AdminHeader title='Voting Exercise' />
                <MenuBar menu={menu} />
                <div className='btnContainer right'>
                    <button onClick={openHandler} className="mtn__btn mtn__yellow" type='button'>Start Voting Exercise</button>
                    <button onClick={iopenHandler} className="mtn__btn mtn__black" type='button'>Set Voting Date</button>
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
                                setTitle(rowData.Title)
                                setNomineeCount(rowData.NomineeCount)
                                setDate(rowData.Date)
                                setEndDate(rowData.EndDate)
                                setTime(rowData.Time)
                                setRegion(rowData.Region)
                                sp.web.lists.getByTitle(`Location`).items.filter(`Region eq '${rowData.Region}'`).get().then
                                    ((res) => {
                                        setLocations(res)
                                        setLocation(rowData.Location)
                                    })

                            },
                        },
                        {
                            icon: "visibility",
                            iconProps: { style: { fontSize: "20px", color: "gold" } },
                            tooltip: "Start",

                            onClick: (event, rowData) => {
                                startHandler(rowData.ID)
                            },
                        },
                        {
                            icon: "visibility",
                            iconProps: { style: { fontSize: "20px", color: "gold" } },
                            tooltip: "Stop",

                            onClick: (event, rowData) => {
                                stopHandler(rowData.ID)
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
                    title="Constituency"
                    size='lg'
                    content={

                        loading ? <Spinner /> : <div className="mtn__InputFlex">
                            <Input
                                title="Constituency Name"
                                value={Title}
                                onChange={(e) => setTitle(e.target.value)} type="text"
                                size='mtn__adult'
                            />
                            <Input
                                title="Number of Applicable Nominees"
                                value={NomineeCount}
                                onChange={(e) => setNomineeCount(e.target.value)} type="number"
                                size='mtn__adult'
                            />
                            <DateInput
                                title="Start Date of Voting Exercise"
                                value={Date}
                                onChange={(e) => setDate(e.target.value)} type="text"
                               
                            />
                            <DateInput
                                title="End Date of Voting Exercise"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)} type="text"
                               
                            />
                             <Input
                                title="Time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)} type="time"
                                size='mtn__adult'
                            />
                            <Select
                                value={region}
                                onChange={regionHandler}
                                required={false}
                                title="Region"
                                options={regions}
                                filter={true}
                                filterOption="Title"
                                size='mtn__adult'
                            />

                            <Select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required={false}
                                title="Location"
                                options={locations}
                                filter={true}
                                filterOption="Title"
                                size='mtn__adult'
                            />
                            {/* <Select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required={false}
                                title="Country"
                                options={Helpers.countries}
                                size='mtn__adult'

                            /> */}
                            <div className='btnContainer'>
                                <button
                                    onClick={edit ? editHandler : submitHandler}
                                    type="button"
                                    className='mtn__btn mtn__yellow'
                                >{edit ? "Edit Voting Exercise" : "Start Voting Exercise"}</button>
                            </div>


                        </div>

                    }
                    onClose={() => setOpen(false)}

                    footer=""

                />
                 <Modal
                    isVisible={iopen}
                    title="Election Date"
                    size='lg'
                    content={

                        loading ? <Spinner /> : <div className="mtn__InputFlex">
                            
                            <DateInput
                                title="Start Date of Voting Exercise"
                                value={Date}
                                onChange={(e) => setDate(e.target.value)} type="text"
                               
                            />
                            <DateInput
                                title="End Date of Voting Exercise"
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
                                    onClick={allHandler}
                                    type="button"
                                    className='mtn__btn mtn__yellow'
                                >Set Date</button>
                            </div>


                        </div>

                    }
                    onClose={() => setiOpen(false)}

                    footer=""

                />
            </div>
        </div>
    )
}

export default AdminConfig