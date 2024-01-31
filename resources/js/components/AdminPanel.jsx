import React from 'react';
import AdminStats from './AdminStats';
import AdminFlaggedImages from './AdminFlaggedImages';

function AdminPanel() {
    return (
        <div>
            <AdminStats />
            <AdminFlaggedImages />
        </div>
    );
}

export default AdminPanel;
