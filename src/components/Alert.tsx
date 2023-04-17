import React, { useState, useEffect } from 'react';

// Define the data type for alerts
interface Alert {
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
}

// Alert that displays a temporary message based on the type
const Alert: React.FC<Alert> = ({
    title,
    message,
    type,
    duration = 10000,
}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration]);

    // Function to handle closing the alert
    function handleClose() {
        setVisible(false);
    }

    // Function to render the SVG icon based on the alert type
    function renderSVG() {
        switch (type) {
            case 'success':
                return (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM18.58 32.58L11.4 25.4C10.62 24.62 10.62 23.36 11.4 22.58C12.18 21.8 13.44 21.8 14.22 22.58L20 28.34L33.76 14.58C34.54 13.8 35.8 13.8 36.58 14.58C37.36 15.36 37.36 16.62 36.58 17.4L21.4 32.58C20.64 33.36 19.36 33.36 18.58 32.58Z" fill="#00BA34" />
                    </svg>
                );
            case 'error':
                return (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z" fill="#E92C2C" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.94024 35.0004H35.0602C38.1402 35.0004 40.0602 31.6604 38.5202 29.0004L23.4602 2.98035C21.9202 0.320352 18.0802 0.320352 16.5402 2.98035L1.48024 29.0004C-0.0597576 31.6604 1.86024 35.0004 4.94024 35.0004ZM20.0002 21.0004C18.9002 21.0004 18.0002 20.1004 18.0002 19.0004V15.0004C18.0002 13.9004 18.9002 13.0004 20.0002 13.0004C21.1002 13.0004 22.0002 13.9004 22.0002 15.0004V19.0004C22.0002 20.1004 21.1002 21.0004 20.0002 21.0004ZM22.0002 29.0004H18.0002V25.0004H22.0002V29.0004Z" fill="#F98600" />
                    </svg>
                );
            case 'info':
            default:
                return (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 34C22.9 34 22 33.1 22 32V24C22 22.9 22.9 22 24 22C25.1 22 26 22.9 26 24V32C26 33.1 25.1 34 24 34ZM26 18H22V14H26V18Z" fill="#0085FF" />
                    </svg>
                );
        }
    }

    // Rendering Alert
    return visible ? (
        <div className={`absolute top-10 right-20 alert alert-${type} max-w-sm`}>
            {renderSVG()}
            <div className="flex w-full justify-between">
                <div className="flex flex-col">
                    <span>{title}</span>
                    <span className="text-content2">{message}</span>
                </div>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleClose}
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.3007 5.71C17.9107 5.32 17.2807 5.32 16.8907 5.71L12.0007 10.59L7.1107 5.7C6.7207 5.31 6.0907 5.31 5.7007 5.7C5.3107 6.09 5.3107 6.72 5.7007 7.11L10.5907 12L5.7007 16.89C5.3107 17.28 5.3107 17.91 5.7007 18.3C6.0907 18.69 6.7207 18.69 7.1107 18.3L12.0007 13.41L16.8907 18.3C17.2807 18.69 17.9107 18.69 18.3007 18.3C18.6907 17.91 18.6907 17.28 18.3007 16.89L13.4107 12L18.3007 7.11C18.6807 6.73 18.6807 6.09 18.3007 5.71Z" fill="#969696" />
                </svg>
            </div>
        </div>
    ) : null;
};

export default Alert;
