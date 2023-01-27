import * as React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { AiOutlineAppstore, AiOutlineAliwangwang, AiOutlineBook, AiOutlineUsergroupAdd, AiFillSignal, AiOutlineLogout, AiOutlineDisconnect } from 'react-icons/ai'
import { GrFormView } from 'react-icons/Gr'

const CandidateNavigation = ({ dashboard = "", register = "", viewRequest = "", }) => {
    return (
        <div className={styles.mtn__navigation}>
            <div className={styles.mtn__logo}>
                <img src={require('../../assets/logo.png')} alt="MTN Logo" />
            </div>
            <div className={styles.mtn__url}>

                <ul>
                    <li className={styles[dashboard]}><Link to={`/candidate`}><AiOutlineAppstore />Dashboard</Link></li>
                    <li className={styles[register]}><Link to={`/candidate/register`}><AiOutlineAliwangwang />Register</Link></li>
                    <li className={styles[viewRequest]}><Link to={`/candidate/view`}><GrFormView />View Request</Link></li>
                    <li><Link to={`/`}><AiOutlineLogout />Logout</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default CandidateNavigation