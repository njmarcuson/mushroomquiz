import './bootstrap';

import React from 'react';
import { createRoot } from 'react-dom/client';

import HelloReact from './HelloReact';

export default function App() {
    return (
        <div>
            <h1>APP</h1>
            <HelloReact />
        </div>
    );
}

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}
