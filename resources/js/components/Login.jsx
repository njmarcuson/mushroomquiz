import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';

function Login() {
    const { token, setIsLoggedIn } = useContext(AdminContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    function attemptLogin() {
        const data = {
            username: username,
            password: password,
            _token: token,
        };

        fetch('/admin/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            //.then(response => console.log(response))
            .then(data => {
                console.log(data);
                if (data['success'] == 'success') {
                    setIsLoggedIn(true);
                } else {
                    setErrorMessage(data['error_message']);
                }
            });
    }
    return (
        <form action="#" className="grid justify-center">
            <div className="mt-4 flex justify-center font-bold text-xl">
                Admin Login
            </div>
            <div className="mt-4 mb-4">
                <input
                    className="px-2 py-1 "
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    className="px-2 py-1"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            {errorMessage && (
                <div className="text-cs-red mt-4">{errorMessage}</div>
            )}
            <div className="flex justify-center mt-4">
                <button
                    type="submit"
                    className="bg-cs-green px-4 py-2 rounded rounded-xl opacity-80 hover:opacity-100"
                    onClick={() => attemptLogin()}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default Login;
