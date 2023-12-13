import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizQuestion from './QuizQuestion';
import { CSSTransition } from 'react-transition-group';

function QuizQuestions() {
    const { quiz, questionOn } = useContext(QuizContext);

    const classNames = {
        appear: 'opacity-0 transition-opacity duration-300',
        appearActive: 'transition-opacity duration-300 opacity-100',
        enter: 'opacity-0 -translate-x-full',
        enterActive: 'transition-opacity duration-300 opacity-100',
        // exit: "opacity-100",  // this breaks the exit transition
        exitActive: 'transition-opacity duration-300 opacity-0',
    };

    const quizQuestions = [];
    for (let i = 0; i < quiz.length; i++) {
        quizQuestions.push(
            <CSSTransition
                in={questionOn == i}
                timeout={300}
                key={i}
                classNames={classNames}
                unmountOnExit
            >
                <QuizQuestion questionIndex={i} />
            </CSSTransition>
        );
    }

    return <div>{quizQuestions}</div>;
}

export default QuizQuestions;
