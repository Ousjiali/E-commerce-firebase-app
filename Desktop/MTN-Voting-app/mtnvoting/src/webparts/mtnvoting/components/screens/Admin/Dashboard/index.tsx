import * as React from 'react'
import { AdminNavigation, Card, AdminHeader, Spinner } from '../../../containers'
import styles from './styles.module.scss'
import { sp, } from "@pnp/sp"


const AdminDashboard = () => {
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [pending, setPending] = React.useState(0)
    const [approved, setApproved] = React.useState(0)
    const [declined, setDeclined] = React.useState(0)
    const [revoked, setRevoked] = React.useState(0)

    React.useEffect(() => {
        setLoading(true)
        sp.web.lists.getByTitle(`Nominees`).items.get().then
            ((res) => {
                const pend = res.filter((x) => x.Status === "Pending")
                const app = res.filter((x) => x.Status === "Approved")
                const dec = res.filter((x) => x.Status === "Declined")
                const rev = res.filter((x) => x.Status === "Revoked")
                setTotal(res.length)
                setPending(pend.length)
                setApproved(app.length)
                setDeclined(dec.length)
                setRevoked(rev.length)
                setLoading(false)
            })
    }, [])

    return (
        <div className='appContainer'>
            <AdminNavigation dashboard={`active`} />
            <div className='contentsRight'>
                <AdminHeader title='Dashboard' />
                {loading ? <Spinner /> : <div className={styles.cardContainer}>
                    <Card url="/admin/pending" title="Total Request" count={total} color="mtn__yellow" />
                    <Card url="/admin/pending" title="Pending Request" count={pending} color="mtn__yellow" />
                    <Card url="/admin/approved" title="Approved Request" count={approved} color="mtn__yellow" />
                    <Card url="/admin/declined" title="Declined Request" count={declined} color="mtn__yellow" />
                    <Card url="/admin/revoked" title="Revoked Request" count={revoked} color="mtn__yellow" />
                </div>}
            </div>
        </div>
    )
}

export default AdminDashboard