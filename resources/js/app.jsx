import './bootstrap';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';

import HomePage from './components/HomePage';
import { QuizContext } from './context/QuizContext';
import Quiz from './components/Quiz';

import { QueryClient, QueryClientProvider } from 'react-query';

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

    const [currentPage, setCurrentPage] = useState('edibilities');
    const [token] = useState(props.token);
    const [quiz, setQuiz] = useState();
    const [quizSlug, setQuizSlug] = useState();

    const [isFirstQuestionLoaded, setIsFirstQuestionLoaded] = useState(false);
    const [questionOrder, setQuestionOrder] = useState([]);
    const [questionOn, setQuestionOn] = useState();

    const [totalQuestionsLoaded, setTotalQuestionsLoaded] = useState(0);

    const queryClient = new QueryClient();

    useEffect(() => {
        setCurrentPage('edibilities');
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <QuizContext.Provider
                value={{
                    quiz,
                    setQuiz,
                    quizSlug,
                    setQuizSlug,
                    isFirstQuestionLoaded,
                    setIsFirstQuestionLoaded,
                    questionOrder,
                    setQuestionOrder,
                    questionOn,
                    setQuestionOn,
                    totalQuestionsLoaded,
                    setTotalQuestionsLoaded,
                    currentPage,
                    setCurrentPage,
                    edibilities,
                    setEdibilities,
                    locations,
                    setLocations,
                    difficulties,
                    setDifficulties,
                    token,
                }}
            >
                {currentPage == 'Quiz' && <Quiz />}
                {currentPage != 'Quiz' && <HomePage />}
            </QuizContext.Provider>
        </QueryClientProvider>
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
