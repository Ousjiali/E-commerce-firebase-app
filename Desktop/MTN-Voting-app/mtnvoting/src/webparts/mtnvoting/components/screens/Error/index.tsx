import * as React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
const ErrorScreen = () => {
    return (
        <div className={styles.errorScreen}>
            <h1>Error 404</h1>
            <h2>Page Not Found</h2>
            <div className='minimizeBtn'>
                <Link to={'/'} className="mtn__btn mtn__yellow">Go Back</Link>
            </div>

        </div>
    )
}

export default ErrorScreen