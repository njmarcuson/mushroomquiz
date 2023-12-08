import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import { CSSTransition } from 'react-transition-group';
import EdibilitiesQuestion from './EdibilitiesQuestion';
import LocationsQuestion from './LocationsQuestion';
import DifficultiesQuestion from './DifficultiesQuestion';

export default function HomePage() {
    const { currentPage } = useContext(QuizContext);

    const classNames = {
        appear: 'opacity-0 transition-opacity duration-300',
        appearActive: 'transition-opacity duration-300 opacity-100',
        enter: 'opacity-0 -translate-x-full',
        enterActive: 'transition-opacity duration-300 opacity-100',
        // exit: "opacity-100",  // this breaks the exit transition
        exitActive: 'transition-opacity duration-300 opacity-0',
    };

    return (
        <>
            <div className="fixed w-full top-0 pr-8 bg-cs-grey z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mt-10 mb-5">
                    Mushroom Quiz
                </h1>
            </div>

            <h2 className="text-l md:text-xl lg-text-2xl text-center mb-10 mt-32">
                The quiz engine that helps you identify mushrooms with real
                world images
            </h2>

            <CSSTransition
                in={currentPage == 'edibilities'}
                timeout={300}
                classNames={classNames}
                unmountOnExit
            >
                <EdibilitiesQuestion />
            </CSSTransition>

            <CSSTransition
                in={currentPage == 'locations'}
                timeout={300}
                classNames={classNames}
                unmountOnExit
            >
                <LocationsQuestion />
            </CSSTransition>

            <CSSTransition
                in={currentPage == 'difficulties'}
                timeout={300}
                classNames={classNames}
                unmountOnExit
            >
                <DifficultiesQuestion />
            </CSSTransition>

            {/*
            {currentPage == 'Edibilities' && (
                <QuizParameterQuestion values={edibilities} type="edibility" />
            )}
            {currentPage == 'Locations' && (
                <QuizParameterQuestion values={locations} type="location" />
            )}
            {currentPage == 'Difficulties' && (
                <QuizParameterQuestion
                    values={difficulties}
                    type="difficulty"
                />
            )}
            */}
            {/*
            <div className="flex justify-center mt-6">
                <button
                    className={`bg-cs-green rounded px-10 py-4 ${
                        isQuizButtonDisabled()
                            ? 'opacity-40'
                            : 'opacity-90 hover:opacity-100 hover:border'
                    }`}
                    disabled={isQuizButtonDisabled()}
                    onClick={() => startQuiz()}
                >
                    Take Quiz!
                </button>
            </div>
            */}
        </>
    );
}
