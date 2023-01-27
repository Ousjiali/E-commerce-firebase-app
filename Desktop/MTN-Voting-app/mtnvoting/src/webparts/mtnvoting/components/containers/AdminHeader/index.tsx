import * as React from 'react'
import styles from './styles.module.scss'
const AdminHeader = ({ title }) => {
    return (
        <div className={styles.header}>
            {title}
        </div>
    )
}

export default AdminHeader