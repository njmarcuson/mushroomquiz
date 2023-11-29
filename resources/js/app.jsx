import './bootstrap';

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import HomePage from './components/HomePage';
import { QuizContext } from './context/QuizContext';

export default function App() {
    const [edibilities, setEdibilities] = useState([
        {
            id: 1,
            name: 'Edible',
            isClicked: false,
        },
        {
            id: 2,
            name: 'Inedible',
            isClicked: false,
        },
        {
            id: 3,
            name: 'Poisonous',
            isClicked: false,
        },
        {
            id: 4,
            name: 'Psychedlic',
            isClicked: false,
        },
    ]);

    const [locations, setLocations] = useState([
        {
            id: 1,
            name: 'North America',
            isClicked: false,
        },
        {
            id: 2,
            name: 'South America',
            isClicked: false,
        },
        {
            id: 3,
            name: 'Europe',
            isClicked: false,
        },
        {
            id: 4,
            name: 'Africa',
            isClicked: false,
        },
        {
            id: 5,
            name: 'Asia',
            isClicked: false,
        },
        {
            id: 6,
            name: 'Pacific Islands',
            isClicked: false,
        },
    ]);

    const [difficulties, setDifficulties] = useState([
        {
            id: 1,
            name: 'Easy',
            isClicked: false,
        },
        {
            id: 2,
            name: 'Medium',
            isClicked: false,
        },
        {
            id: 3,
            name: 'Hard',
            isClicked: false,
        },
    ]);

    return (
        <QuizContext.Provider
            value={{
                edibilities,
                setEdibilities,
                locations,
                setLocations,
                difficulties,
                setDifficulties,
            }}
        >
            <HomePage />
        </QuizContext.Provider>
    );
}

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}
