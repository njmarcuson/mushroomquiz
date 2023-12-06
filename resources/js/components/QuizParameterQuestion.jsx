import React from 'react';
import QuizParameterButton from './QuizParameterButton';
import PropTypes from 'prop-types';

QuizParameterQuestion.propTypes = {
    values: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
};

function QuizParameterQuestion(props) {
    function getEmoji(valueName) {
        let emoji = null;
        if (valueName == 'Psychedelic') {
            emoji = '🌈⃤';
        } else if (valueName == 'Poisonous') {
            emoji = '☠️';
        } else if (valueName == 'Inedible') {
            emoji = '🤢';
        } else if (valueName == 'Edible') {
            emoji = '🍴';
        } else if (valueName == 'Easy') {
            emoji = '😎';
        } else if (valueName == 'Medium') {
            emoji = '😐';
        } else if (valueName == 'Hard') {
            emoji = '😣';
        } else if (valueName == 'Europe') {
            emoji = '🇪🇺';
        } else if (valueName == 'North America') {
            emoji = '⬆️';
        } else if (valueName == 'South America') {
            emoji = '⬇️';
        } else if (valueName == 'Africa') {
            emoji = '🌍';
        } else if (valueName == 'Oceania') {
            emoji = '🐨';
        } else if (valueName == 'Asia') {
            emoji = '🌏';
        }

        return emoji;
    }

    let gridType = 'grid-cols-2 md:grid-cols-4';
    if (props.type == 'location') {
        gridType = 'grid-cols-3';
    } else if (props.type == 'difficulty') {
        gridType = 'grid-cols-3';
    }

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold text-center mb-4">
                {props.type == 'edibility' && 'Select Mushroom Types'}
                {props.type == 'location' && 'Select Mushroom Regions'}
                {props.type == 'difficulty' && 'Select Quiz Difficulty'}
            </h3>

            <div className={`grid ${gridType} w-full md:w-9/12 m-auto`}>
                {props.values.map(value => (
                    <QuizParameterButton
                        value={value}
                        key={value.id}
                        type={props.type}
                        emoji={getEmoji(value.name)}
                    />
                ))}
            </div>
        </div>
    );
}

export default QuizParameterQuestion;
