import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { QuizContext } from '../context/QuizContext';

QuizParameterButton.propTypes = {
    value: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
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
            className={`mx-4 rounded bg-cs-blue ${
                props.value.isClicked
                    ? 'outline outline-2 outline-cs-darkred'
                    : 'opacity-50 hover:opacity-70'
            }`}
            id={props.value.id}
            onClick={() => toggleButtonClick(props.value.id)}
        >
            {props.value.name}
        </button>
    );
}

export default QuizParameterButton;
