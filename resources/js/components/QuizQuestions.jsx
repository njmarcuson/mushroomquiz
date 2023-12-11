import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizQuestion from './QuizQuestion';
import { CSSTransition } from 'react-transition-group';

function QuizQuestions() {
    const { quiz, questionOrder, questionOn, totalQuestionsLoaded } =
        useContext(QuizContext);

    const classNames = {
        appear: 'opacity-0 transition-opacity duration-300',
        appearActive: 'transition-opacity duration-300 opacity-100',
        enter: 'opacity-0 -translate-x-full',
        enterActive: 'transition-opacity duration-300 opacity-100',
        // exit: "opacity-100",  // this breaks the exit transition
        exitActive: 'transition-opacity duration-300 opacity-0',
    };

    /*
    TODO
    create state for which question we're on
    conditionally render question based on state
    button for next question, updates state
    css transitions similar to parameter questions
    */

    const quizQuestions = [];
    for (let i = 0; i < quiz.length; i++) {
        quizQuestions.push(
            <CSSTransition
                in={questionOrder[questionOn] == i}
                timeout={300}
                key={i}
                classNames={classNames}
                unmountOnExit
            >
                <QuizQuestion questionIndex={i} />
            </CSSTransition>
        );
    }

    return (
        <div>
            {questionOn < totalQuestionsLoaded && quizQuestions}
            {questionOn == totalQuestionsLoaded && 'QUIZ LOADING'}
        </div>
    );
}

export default QuizQuestions;
