import './bootstrap';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';

import { AdminContext } from './context/AdminContext';

import { QueryClient, QueryClientProvider } from 'react-query';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

Admin.propTypes = {
    token: PropTypes.string.isRequired,
};

export default function Admin(props) {
    const [token] = useState(props.token);

    const queryClient = new QueryClient();

    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const data = {
            _token: token,
        };

        fetch('/is-logged-in', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                setIsLoggedIn(data);
            });
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <AdminContext.Provider
                value={{
                    token,
                    setIsLoggedIn,
                }}
            >
                {isLoggedIn !== false || <Login />}
                {isLoggedIn && <AdminPanel />}
            </AdminContext.Provider>
        </QueryClientProvider>
    );
}

if (document.getElementById('admin')) {
    const root = createRoot(document.getElementById('admin'));
    const token = document.getElementById('admin').getAttribute('token');
    root.render(<Admin token={token} />);
}
