import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { QuizContext } from '../context/QuizContext';

QuizQuestion.propTypes = {
    questionIndex: PropTypes.number.isRequired,
};

function QuizQuestion(props) {
    const { quiz, setQuestionOn } = useContext(QuizContext);

    const question = quiz[props.questionIndex];

    const images = [];
    const imageIds = question[4];
    for (let i = 0; i < imageIds.length; i++) {
        images.push(
            <img
                src={`https://images.mushroomobserver.org/320/${imageIds[i]}.jpg`}
                alt="mushroom"
                width="200"
                height="300"
                key={i}
            />
        );
    }

    return (
        <div>
            {images}
            {question[0]['scientific_name']}
            <br />
            <button
                onClick={() =>
                    setQuestionOn(prevQuestionOn => prevQuestionOn + 1)
                }
            >
                Next
            </button>
        </div>
    );
}

export default QuizQuestion;
