import * as React from 'react'
import { Card, Card2, Header, CandidateNavigation } from '../../../containers'
import styles from './styles.module.scss'
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
// import moment from 'moment';
const CandidateDashboard = () => {

    //   const moment = require('moment');

    const [voteNumber, setVoteNumber] = React.useState(0);
    const [voteDate, setVoteDate] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [endDate,setEndDate] = React.useState("")
    const [startDate,setStartDate] = React.useState("")
   
 
    React.useEffect(() => {
        sp.profiles.myProperties
            .get()
            .then((response) => {
               
                sp.web.lists.getByTitle(`Nominees`).items.filter(`EmployeeEmail eq '${response.Email}' and Status eq 'Approved'`).get()
                    .then((res) => {
                        
                        if (res.length > 0) {
                            sp.web.lists.getByTitle(`Votes`).items.filter(`Nominee eq '${res[0].ID}'`).get().then
                                ((resp) => {
                                    console.log(resp)
                                    setVoteNumber(resp.length)
                                })
                            sp.web.lists.getByTitle(`Constituency`).items.filter(`Title eq '${res[0].Constituency}'`).get().then
                                ((resp) => {
                                    console.log(resp)
                                    setVoteDate(resp[0].Date)
                                })
                                   
                        }
                        

                    })
//get registration close date
                    sp.web.lists.getByTitle(`AspirantRegistration`).items.get()
                    .then((res) => {
                     
                        setStartDate(res[0].StartDate)
                    setEndDate(res[0].EndDate)   
            })
            })
    }, [])





    return (
        <div className='appContainer'>
            <CandidateNavigation dashboard={`active`} />
            <div className='contentsRight'>
                <Header title='Dashboard' />
                
                <div className={styles.cardContainer}>
                    <Card title="Total number of accumulated vote" count={voteNumber} color="mtn__white" url={""} />
                    <Card2 title="Date of voting exercise" info={voteDate} color="mtn__white" />
                    <Card2 title="Aspirant registration starting date" info={startDate} color="mtn__white" />
                    <Card2 title="Aspirant registration closing date" info={endDate} color="mtn__white" />

                </div>
            </div>
        </div>
    )
}

export default CandidateDashboard