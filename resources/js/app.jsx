import './bootstrap';

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';

import HomePage from './components/HomePage';
import { QuizContext } from './context/QuizContext';
import Quiz from './components/Quiz';

App.propTypes = {
    edibilities: PropTypes.string.isRequired,
    locations: PropTypes.string.isRequired,
    difficulties: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
};

export default function App(props) {
    const [edibilities, setEdibilities] = useState(
        JSON.parse(props.edibilities)
    );

    const [locations, setLocations] = useState(JSON.parse(props.locations));

    const [difficulties, setDifficulties] = useState(
        JSON.parse(props.difficulties)
    );

    const [isQuizActive, setIsQuizActive] = useState(false);

    const [token] = useState(props.token);

    const [quiz, setQuiz] = useState();

    const [quizSlug, setQuizSlug] = useState();

    return (
        <QuizContext.Provider
            value={{
                quiz,
                setQuiz,
                quizSlug,
                setQuizSlug,
                isQuizActive,
                setIsQuizActive,
                edibilities,
                setEdibilities,
                locations,
                setLocations,
                difficulties,
                setDifficulties,
                token,
            }}
        >
            {isQuizActive && <Quiz />}
            {!isQuizActive && <HomePage />}
        </QuizContext.Provider>
    );
}

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    const edibilities = document
        .getElementById('app')
        .getAttribute('edibilities');
    const locations = document.getElementById('app').getAttribute('locations');
    const difficulties = document
        .getElementById('app')
        .getAttribute('difficulties');
    const token = document.getElementById('app').getAttribute('token');
    root.render(
        <App
            edibilities={edibilities}
            locations={locations}
            difficulties={difficulties}
            token={token}
        />
    );
}
