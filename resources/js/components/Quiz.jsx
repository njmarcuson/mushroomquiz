import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../context/QuizContext';

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

    return <div>{quiz ? 'Quiz Loaded' : 'Loading...'}</div>;
}

export default Quiz;
