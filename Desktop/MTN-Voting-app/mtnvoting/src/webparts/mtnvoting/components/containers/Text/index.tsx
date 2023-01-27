import * as React from 'react'
import styles from './styles.module.scss'

const Text = ({ title, value, size = "medium" }) => {
    return (
        <div className={`${styles.textContainer} ${styles[size]}`}>
            <p>{title}</p>
            <h4>{value}</h4>
        </div>
    )
}

export default Text
