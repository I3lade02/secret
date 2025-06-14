import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function AlertBox() {
    const { alert } = useContext(AppContext);

    if (!alert) return null;

    return (
        <div className={`alert alert-${alert.type} text-center`} role='alert'>
            {alert.message}
        </div>
    );
}