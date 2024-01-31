import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizQuestions from './QuizQuestions';
import QuizDone from './QuizDone';

function Quiz() {
    const {
        quiz,
        setQuiz,
        questionOn,
        setQuestionOn,
        setNumberCorrect,
        quizSlug,
        token,
    } = useContext(QuizContext);

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
                setQuiz(data);
                setQuestionOn(0);
                setNumberCorrect(0);
            });
    }, []);

    return (
        <div>
            {quiz && questionOn < quiz.length ? <QuizQuestions /> : ''}
            {quiz && questionOn >= quiz.length ? <QuizDone /> : ''}
        </div>
    );
}

export default Quiz;
