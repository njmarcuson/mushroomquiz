import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import { CSSTransition } from 'react-transition-group';
import EdibilitiesQuestion from './EdibilitiesQuestion';
import LocationsQuestion from './LocationsQuestion';
import DifficultiesQuestion from './DifficultiesQuestion';
import getTransitionCssClasses from '../helperFunctions/getTransitionCssClasses';

export default function HomePage() {
    const { currentPage } = useContext(QuizContext);

    return (
        <>
            <div className="fixed w-full top-0 pr-8 bg-cs-grey z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mt-6 mb-5">
                    Mushroom Quiz
                </h1>
            </div>

            <h2 className="text-l md:text-xl lg-text-2xl text-center mb-10 mt-32">
                The quiz engine that helps you identify mushrooms with real
                world images
            </h2>

            <CSSTransition
                in={currentPage == 'edibilities'}
                timeout={100}
                classNames={getTransitionCssClasses(true)}
                unmountOnExit
            >
                <EdibilitiesQuestion />
            </CSSTransition>

            <CSSTransition
                in={currentPage == 'locations'}
                timeout={100}
                classNames={getTransitionCssClasses(true)}
                unmountOnExit
            >
                <LocationsQuestion />
            </CSSTransition>

            <CSSTransition
                in={currentPage == 'difficulties'}
                timeout={100}
                classNames={getTransitionCssClasses(true)}
                unmountOnExit
            >
                <DifficultiesQuestion />
            </CSSTransition>
        </>
    );
}
