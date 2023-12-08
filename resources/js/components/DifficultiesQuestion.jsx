import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizParameterButton from './QuizParameterButton';
import getButtonEmoji from '../helperFunctions/getButtonEmoji';
import isOneButtonClicked from '../helperFunctions/isOneButtonClicked';

function DifficultiesQuestion() {
    const {
        setCurrentPage,
        edibilities,
        locations,
        difficulties,
        setQuizSlug,
        token,
    } = useContext(QuizContext);

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
                setCurrentPage('Quiz');
            });
    }

    return (
        <div className="mt-6 inlin-block">
            <h3 className="text-2xl font-semibold text-center mb-4">
                Select Quiz Difficulty
            </h3>

            <div
                className={`grid grid-cols-3 w-full md:w-9/12 lg:w-6/12 m-auto gap-x-8 gap-y-4`}
            >
                {difficulties.map(value => (
                    <QuizParameterButton
                        value={value}
                        key={value.id}
                        type={'difficulty'}
                        emoji={getButtonEmoji(value.name)}
                    />
                ))}
            </div>

            <div className="text-2xl font-bold flex justify-center mt-6">
                <button
                    className={`bg-cs-green rounded-2xl shadow-2xl px-10 py-4 transition-all outline outline-1  ${
                        isOneButtonClicked(difficulties)
                            ? 'opacity-20'
                            : 'opacity-80 hover:opacity-100 '
                    }`}
                    disabled={isOneButtonClicked(difficulties)}
                    onClick={() => startQuiz()}
                >
                    Start Quiz!
                </button>
            </div>
        </div>
    );
}

export default DifficultiesQuestion;
