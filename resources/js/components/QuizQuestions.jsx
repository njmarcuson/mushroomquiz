import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

function QuizQuestions() {
    const { quiz, questionOrder } = useContext(QuizContext);

    return <div>{quiz[questionOrder[0]][0]['scientific_name']}</div>;
}

export default QuizQuestions;
