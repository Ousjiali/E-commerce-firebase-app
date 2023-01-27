import * as React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
const Card = ({ title, count, color, url }) => {
    return (
        <Link to={url} className={`${styles.card} ${color}`}>
            <h5>{title}</h5>
            <h1>{count}</h1>
        </Link>
    )
}

export default Card