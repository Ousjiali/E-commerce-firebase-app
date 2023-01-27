import * as React from 'react'
import styles from './styles.module.scss'
const Card2 = ({ title, info, color }) => {
    return (
        <div className={`${styles.card} ${color}`}>
            <h5>{title}</h5>
            <h2>{info}</h2>
        </div>
    )
}

export default Card2