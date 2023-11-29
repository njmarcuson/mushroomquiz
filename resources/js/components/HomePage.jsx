import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizParameterQuestion from './QuizParameterQuestion';

export default function HomePage() {
    const { edibilities, locations, difficulties } = useContext(QuizContext);
    return (
        <>
            <h1 className="text-6xl font-black text-center mt-10 mb-5">
                Mushroom Quiz
            </h1>
            <h2 className="text-2xl text-center mb-10">
                The quiz engine that helps you identify mushrooms with real
                world images
            </h2>

            <QuizParameterQuestion values={edibilities} type="edibility" />
            <QuizParameterQuestion values={locations} type="location" />
            <QuizParameterQuestion values={difficulties} type="difficulty" />
        </>
    );
}
