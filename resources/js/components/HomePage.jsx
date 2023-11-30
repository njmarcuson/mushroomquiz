import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizParameterQuestion from './QuizParameterQuestion';

export default function HomePage() {
    const { edibilities, locations, difficulties, setIsQuizActive, token } =
        useContext(QuizContext);

    function isQuizButtonDisabled() {
        return (
            edibilities.filter(edibility => edibility.isClicked).length == 0 ||
            locations.filter(location => location.isClicked).length == 0 ||
            difficulties.filter(difficulty => difficulty.isClicked).length == 0
        );
    }

    function startQuiz() {
        const data = {
            edibilities: '1,2',
            locations: '1,2,3',
            difficulty: '1',
            _token: token,
        };
        fetch('/api/storequiz', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(() => setIsQuizActive(true));
    }

    return (
        <>
            <h2 className="text-2xl text-center mb-10">
                The quiz engine that helps you identify mushrooms with real
                world images
            </h2>

            <QuizParameterQuestion values={edibilities} type="edibility" />
            <QuizParameterQuestion values={locations} type="location" />
            <QuizParameterQuestion values={difficulties} type="difficulty" />

            <div className="flex justify-center mt-10">
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
        </>
    );
}
