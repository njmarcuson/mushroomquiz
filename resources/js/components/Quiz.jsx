import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizQuestions from './QuizQuestions';

function Quiz() {
    const { quiz, setQuiz, quizSlug, token } = useContext(QuizContext);

    useEffect(() => {
        const data = {
            _token: token,
            quizSlug: quizSlug,
        };

        fetch('/api/getquestions', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setQuiz(data);
            });
    }, []);

    return <div>{quiz ? <QuizQuestions /> : 'Loading...'}</div>;
}

export default Quiz;
