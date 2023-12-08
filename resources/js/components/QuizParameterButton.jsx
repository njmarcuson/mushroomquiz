import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { QuizContext } from '../context/QuizContext';

QuizParameterButton.propTypes = {
    value: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    emoji: PropTypes.string,
};

function QuizParameterButton(props) {
    const {
        edibilities,
        setEdibilities,
        locations,
        setLocations,
        difficulties,
        setDifficulties,
    } = useContext(QuizContext);

    function toggleButtonClick(id) {
        if (props.type == 'edibility') {
            const updatedEdibilities = edibilities.map(edibility => {
                if (edibility.id == id) {
                    edibility.isClicked = !edibility.isClicked;
                }
                return edibility;
            });

            setEdibilities(updatedEdibilities);
        }

        if (props.type == 'location') {
            const updatedLocations = locations.map(location => {
                if (location.id == id) {
                    location.isClicked = !location.isClicked;
                }
                return location;
            });

            setLocations(updatedLocations);
        }

        if (props.type == 'difficulty') {
            const updatedDifficulties = difficulties.map(difficulty => {
                difficulty.isClicked = difficulty.id == id;
                return difficulty;
            });

            setDifficulties(updatedDifficulties);
        }
    }

    return (
        <button
            className={`parameter-button relative py-3 w-full font-semibold outline outline-2 outline-cs-darkred
                 shadow-2xl h-full z-40 text-xl relative transition-opacity
                 rounded-2xl ${
                     props.value.isClicked
                         ? 'parameter-button-active opacity-90 hover:opacity-100 focus:opacity-100'
                         : 'opacity-40 hover:opacity-60 hover:outline-3 focus:opacity-60 focus:outline-3'
                 }`}
            id={props.value.name}
            onClick={() => toggleButtonClick(props.value.id)}
        >
            <span className="">
                {props.value.name}
                {props.emoji && (
                    <div className="text-6xl mt-2">{props.emoji}</div>
                )}
            </span>
        </button>
    );
}

export default QuizParameterButton;
