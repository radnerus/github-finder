import React from 'react'

export const Alert = ({ alert }) => {
    return (
        alert !== null && <div className={`alert alert-${alert.severity}`}><i className="fas fa-info-circle"></i> {alert.message}</div>
    )
}
