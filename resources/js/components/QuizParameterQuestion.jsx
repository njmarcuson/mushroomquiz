import React from 'react';
import QuizParameterButton from './QuizParameterButton';
import PropTypes from 'prop-types';

QuizParameterQuestion.propTypes = {
    values: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
};

function QuizParameterQuestion(props) {
    return (
        <div className="mt-10">
            <h3 className="text-xl font-semibold text-center mb-4">
                {props.type == 'edibility' && 'Select Mushroom Types'}
                {props.type == 'location' && 'Select Mushroom Regions'}
                {props.type == 'difficulty' && 'Select Quiz Difficulty'}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 w-full lg:w-9/12 m-auto">
                {props.values.map(value => (
                    <QuizParameterButton
                        value={value}
                        key={value.id}
                        type={props.type}
                    />
                ))}
            </div>
        </div>
    );
}

export default QuizParameterQuestion;
