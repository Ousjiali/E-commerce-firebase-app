import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { AdminCard, AdminHeader, Chart, Navigation, Spinner } from '../../../Containers';
import { AiOutlineFileDone, AiOutlineException, AiFillDatabase } from 'react-icons/ai'
import { sp, } from "@pnp/sp"

const Dashboard = () => {
    // Helpers
    const history = useHistory()

    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [pending, setPending] = React.useState(0)
    const [completed, setCompleted] = React.useState(0)

    React.useEffect(() => {
        setLoading(true)
        sp.web.lists.getByTitle(`Confirmation`).items.get().then
            ((res) => {
                setTotal(res.length)
                const pend = res.filter((x) => x.ConfirmationStatus === "Pending")
                const comp = res.filter((x) => x.ConfirmationStatus === "Completed")
                setPending(pend.length)
                setCompleted(comp.length)
                setLoading(false)
            })
    }, [])

    React.useEffect(()=>{
        sp.profiles.myProperties.get().then((response) => {
            console.log('response:', response)
            sp.web.lists
              .getByTitle(`Admin`)
              .items.filter(`Title eq '${response.DisplayName}' and Role eq 'HR HCM Administrator'`)
              .get()
              .then((res) => {
                if (res.length === 0) {
                  history.push('/')
                }
              });
          });
        },[])

    return <div className="appContainer">
        <Navigation dashboard={`active`} />
        <div className='contentsRight'>
            <AdminHeader title="Dashboard" />
            {loading ? <Spinner /> : <><div className='cardContainer'>
                <AdminCard title="Total Requests" Icon={AiFillDatabase} url="/admin/all" count={total} />
                <AdminCard title="Pending Requests" Icon={AiOutlineException} url="/admin/pending" count={pending} />
                <AdminCard title="Completed Requests" Icon={AiOutlineFileDone} url="/admin/completed" count={completed} />
            </div>
                <div>
                    <Chart pending={pending} completed={completed} total={total} />
                </div>
            </>}
        </div>

    </div>;
};

export default Dashboard;
