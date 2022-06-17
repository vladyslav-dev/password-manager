import React from 'react'

interface IDashboardProps {
    children?: React.ReactNode;
}

const DashboardLayout: React.FC<IDashboardProps> = ({ children }) => {

    return (
        <div>
            Dashboard
            {children}
        </div>
    )
}

export default DashboardLayout