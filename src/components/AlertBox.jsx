import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { FiCheckCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

export default function AlertBox() {
    const { alert, setAlert } = useContext(AppContext);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3500);
            return () => clearTimeout(timer);
        }
    }, [alert, setAlert]);

    if (!alert) return null;

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <FiCheckCircle className='me-2 text-success' />;
            case 'info':
                return <FiInfo className='me-2 text-info' />;
            case 'danger':
            case 'error':
                return <FiAlertTriangle className='me-2 text-danger' />;
            default: 
                return null;
        }
    };

    return (
        <div className='position-fixed top-0 start-50 translate-middle-x mt-4 px-3' style={{ zIndex: 9999 }}>
            <div className='d-flex align-items-center bg-white border rounded shadow px-4 py-3 animate__animated animate__faceInDown' style={{ minWidth: '280px', maxWidth: '90vw', borderLeft: `4px solid ${alert.type === 'success' ? '#28a745' : alert.type === 'danger' ? '#dc3545' : '#17a2b8'}`, }}>
                {getIcon(alert.type)}
                <div className='flex-grow-1 text-dark'>{alert.message}</div>
                <button
                    className='btn btn-sm btn-close ms-3'
                    onClick={() => setAlert(null)}
                ></button>
            </div>
        </div>
    );
}