import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizParameterButton from './QuizParameterButton';
import getButtonEmoji from '../helperFunctions/getButtonEmoji';
import isOneButtonClicked from '../helperFunctions/isOneButtonClicked';

function LocationsQuestion() {
    const { setCurrentPage, locations } = useContext(QuizContext);

    return (
        <div className="mt-6 inlin-block">
            <h3 className="text-2xl font-semibold text-center mb-4">
                Select Mushroom Regions
            </h3>

            <div
                className={`grid grid-cols-3 w-full md:w-9/12 lg:w-6/12 m-auto gap-x-8 gap-y-4`}
            >
                {locations.map(value => (
                    <QuizParameterButton
                        value={value}
                        key={value.id}
                        type={'location'}
                        emoji={getButtonEmoji(value.name)}
                    />
                ))}
            </div>

            <div className="text-2xl font-bold flex justify-center mt-6">
                <button
                    className={`bg-cs-green rounded-2xl shadow-2xl px-10 py-4 transition-all outline outline-1  ${
                        isOneButtonClicked(locations)
                            ? 'opacity-20'
                            : 'opacity-80 hover:opacity-100 '
                    }`}
                    disabled={isOneButtonClicked(locations)}
                    onClick={() => setCurrentPage('difficulties')}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default LocationsQuestion;
