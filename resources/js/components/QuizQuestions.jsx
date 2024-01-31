import React, { useState, useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizQuestion from './QuizQuestion';
import { CSSTransition } from 'react-transition-group';
import QuizInstructions from './QuizInstructions';
import FlagPopup from './FlagPopup';
import getTransitionCssClasses from '../helperFunctions/getTransitionCssClasses';

function QuizQuestions() {
    const showInstructionsInitially = !JSON.parse(
        localStorage.getItem('hide-instructions')
    );

    const { quiz, questionOn, flagImageId } = useContext(QuizContext);
    const [showInstructions, setShowInstructions] = useState(
        showInstructionsInitially
    );

    return (
        <>
            <CSSTransition
                in={showInstructions}
                timeout={100}
                classNames={getTransitionCssClasses()}
                unmountOnExit
            >
                <QuizInstructions setShowInstructions={setShowInstructions} />
            </CSSTransition>

            <CSSTransition
                in={flagImageId}
                timeout={100}
                classNames={getTransitionCssClasses()}
                unmountOnExit
            >
                <FlagPopup />
            </CSSTransition>

            <div
                className={`${
                    (showInstructions || flagImageId) &&
                    'opacity-30 pointer-events-none'
                }`}
            >
                <h2 className="text-xl md:text-2xl lg-text-4xl text-center mb-6 mt-10 font-bold">
                    Question {questionOn + 1}/{quiz.length}
                </h2>

                {quiz.map((q, i) => (
                    <CSSTransition
                        in={questionOn == i}
                        timeout={300}
                        key={i}
                        classNames={getTransitionCssClasses(true)}
                        unmountOnExit
                    >
                        <QuizQuestion questionIndex={i} />
                    </CSSTransition>
                ))}
            </div>
        </>
    );
}

export default QuizQuestions;
