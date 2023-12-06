import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizParameterQuestion from './QuizParameterQuestion';

export default function HomePage() {
    const {
        edibilities,
        locations,
        difficulties,
        setQuizSlug,
        setIsQuizActive,
        token,
    } = useContext(QuizContext);

    function isQuizButtonDisabled() {
        return (
            edibilities.filter(edibility => edibility.isClicked).length == 0 ||
            locations.filter(location => location.isClicked).length == 0 ||
            difficulties.filter(difficulty => difficulty.isClicked).length == 0
        );
    }

    function getSelectedParameterIds(parameters) {
        let paramIds = [];
        for (let i = 0; i < parameters.length; i++) {
            if (parameters[i]['isClicked']) {
                paramIds.push(parameters[i]['id']);
            }
        }
        return paramIds.join(',');
    }

    function startQuiz() {
        const data = {
            edibilities: getSelectedParameterIds(edibilities),
            locations: getSelectedParameterIds(locations),
            difficulty: getSelectedParameterIds(difficulties),
            _token: token,
        };
        fetch('/api/storequiz', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                setQuizSlug(data);
                setIsQuizActive(true);
            });
    }

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

            <QuizParameterQuestion values={edibilities} type="edibility" />
            <QuizParameterQuestion values={locations} type="location" />
            <QuizParameterQuestion values={difficulties} type="difficulty" />

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
        </>
    );
}
