import React from 'react';
import PropTypes from 'prop-types';

QuizMushroomButton.propTypes = {
    scientificName: PropTypes.string.isRequired,
    popularName1: PropTypes.string,
    popularName2: PropTypes.string,
    popularName3: PropTypes.string,
    isCorrect: PropTypes.bool.isRequired,
    answerQuestion: PropTypes.func.isRequired,
    questionAnswered: PropTypes.bool.isRequired,
};

export default function QuizMushroomButton(props) {
    console.log('button rendered');

    let extraClassNames = '';
    if (!props.questionAnswered) {
        extraClassNames = 'opacity-40 hover:opacity-60';
    } else if (props.isCorrect) {
        extraClassNames = 'text-cs-green';
    } else {
        extraClassNames = 'text-cs-red';
    }

    return (
        <button
            className={`parameter-button relative py-3 w-full font-semibold outline outline-2 outline-cs-darkred
                shadow-2xl h-full z-40 text-lg relative transition-opacity
                rounded-2xl hover:outline-3 ${extraClassNames}`}
            id={props.scientificName}
            onClick={e => props.answerQuestion(e)}
            disabled={props.questionAnswered}
        >
            <span className="">
                {props.scientificName}
                {props.popularName1 && <div>({props.popularName1})</div>}
                {props.popularName2 && <div>({props.popularName2})</div>}
                {props.popularName3 && <div>({props.popularName3})</div>}
            </span>
        </button>
    );
}
