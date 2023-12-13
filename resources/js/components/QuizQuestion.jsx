import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { QuizContext } from '../context/QuizContext';
import QuizMushroomButton from './QuizMushroomButton';

QuizQuestion.propTypes = {
    questionIndex: PropTypes.number.isRequired,
};

function QuizQuestion(props) {
    const { quiz, questionOn, setQuestionOn } = useContext(QuizContext);
    const [questionAnswered, setQuestionAnswered] = useState(false);

    const question = quiz[props.questionIndex];

    const images = [];
    const imageIds = question['image_ids'];
    for (let i = 0; i < imageIds.length; i++) {
        images.push(
            <img
                src={`https://images.mushroomobserver.org/320/${imageIds[i]}.jpg`}
                key={i}
                className="rounded-lg shadow-lg w-40 md:w-60 lg:w-auto"
            />
        );
    }

    const answerQuestion = e => {
        console.log(e.currentTarget.id);
        setQuestionAnswered(true);
        // 4. say the type of mushroom it is
        // 5. store in state whether it was answered correctly or not
    };

    const mushroomButtons = [];
    const mushrooms = question['mushrooms'];
    for (let i = 0; i < mushrooms.length; i++) {
        mushroomButtons.push(
            <QuizMushroomButton
                key={i}
                scientificName={mushrooms[i]['scientific_name']}
                isCorrect={mushrooms[i]['is_correct']}
                popularName1={mushrooms[i]['popular_name1']}
                popularName2={mushrooms[i]['popular_name2']}
                popularName3={mushrooms[i]['popular_name3']}
                answerQuestion={answerQuestion}
                questionAnswered={questionAnswered}
            />
        );
    }

    return (
        <div>
            <h2 className="text-xl md:text-2xl lg-text-4xl text-center mb-6 mt-10 font-bold">
                Question {questionOn + 1}/10
            </h2>

            <div className="flex flex-wrap justify-center space-x-5 space-y-5 mb-6">
                {images}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 w-full md:w-9/12 m-auto gap-x-8 gap-y-4">
                {mushroomButtons}
            </div>

            <br />
            {questionAnswered && (
                <div className="flex justify-center">
                    <button
                        className={`relative py-3 w-1/12 font-semibold outline outline-2 outline-cs-darkred
                            shadow-2xl h-full z-40 text-lg relative bg-cs-green
                            rounded-2xl hover:outline-3`}
                        onClick={() =>
                            setQuestionOn(prevQuestionOn => prevQuestionOn + 1)
                        }
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default QuizQuestion;
