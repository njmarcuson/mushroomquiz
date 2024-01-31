import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { QuizContext } from '../context/QuizContext';
import { CSSTransition } from 'react-transition-group';
import QuizMushroomButton from './QuizMushroomButton';

QuizQuestion.propTypes = {
    questionIndex: PropTypes.number.isRequired,
};

function QuizQuestion(props) {
    const {
        quiz,
        quizSlug,
        edibilities,
        questionOn,
        setQuestionOn,
        setNumberCorrect,
        setFlagImageId,
        token,
    } = useContext(QuizContext);
    const [questionAnswered, setQuestionAnswered] = useState(false);

    const [imagesLoading, setImagesLoading] = useState(true);
    const imageLoadedCounter = useRef(0);

    const classNames = {
        appear: 'opacity-0 transition-opacity duration-300',
        appearActive: 'transition-opacity duration-300 opacity-100',
        enter: 'opacity-0 -translate-x-full',
        enterActive: 'transition-opacity duration-300 opacity-100',
        // exit: "opacity-100",  // this breaks the exit transition
        exitActive: 'transition-opacity duration-300 opacity-0',
    };

    function imageLoaded() {
        imageLoadedCounter.current += 1;
        if (imageLoadedCounter.current == imageIds.length) {
            setImagesLoading(false);
        }
    }

    const question = quiz[props.questionIndex];
    const correctMushroom = question['mushrooms'].filter(
        mushroom => mushroom['is_correct']
    )[0];

    const images = [];
    const imageIds = question['image_ids'];
    for (let i = 0; i < imageIds.length; i++) {
        const imageId = imageIds[i];
        images.push(
            <div className="relative" key={i}>
                <div className="h-full">
                    <span className="group">
                        <img
                            key={i}
                            src={`https://images.mushroomobserver.org/320/${imageId}.jpg`}
                            id={imageId}
                            className="mt-5 rounded-lg shadow-lg w-40 md:w-60 lg:w-full h-10/12"
                            onLoad={imageLoaded}
                        />
                        <span
                            className="absolute right-1 top-5 opacity-0 group-hover:opacity-100 text-3xl font-bold hover:cursor-pointer text-cs-red"
                            onClick={() => setFlagImageId(imageId)}
                        >
                            🚩
                        </span>
                    </span>
                </div>
            </div>
        );
    }

    function answerQuestion(mushroomId) {
        // frontend
        setQuestionAnswered(true);
        setNumberCorrect(val =>
            correctMushroom['id'] == mushroomId ? val + 1 : val
        );

        // backend
        const data = {
            _token: token,
            quizSlug: quizSlug,
        };
        fetch(
            `api/answerquestion?quizSlug=${quizSlug}&quizQuestion=${questionOn}&answer=${mushroomId}`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        );
    }

    const mushroomButtons = [];
    const mushrooms = question['mushrooms'];
    for (let i = 0; i < mushrooms.length; i++) {
        const mushroom = mushrooms[i];
        mushroomButtons.push(
            <QuizMushroomButton
                key={i}
                mushroomId={mushroom['id']}
                scientificName={mushroom['scientific_name']}
                isCorrect={mushroom['is_correct']}
                popularName1={mushroom['popular_name1']}
                popularName2={mushroom['popular_name2']}
                popularName3={mushroom['popular_name3']}
                answerQuestion={answerQuestion}
                questionAnswered={questionAnswered}
            />
        );
    }

    return (
        <div>
            {imagesLoading && (
                <div className="text-center text-2xl mb-6">
                    Images loading...
                </div>
            )}

            <div
                className={`${
                    imagesLoading && 'hidden'
                } flex flex-wrap justify-center space-x-5 mb-12`}
            >
                {images}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 w-full md:w-9/12 m-auto gap-x-8 gap-y-4">
                {mushroomButtons}
            </div>

            <br />

            <CSSTransition
                in={questionAnswered}
                timeout={0}
                classNames={classNames}
                unmountOnExit
            >
                <div>
                    {edibilities.filter(e => e.isClicked).length > 1 && (
                        <div className="text-center mb-6 text-xl">
                            {correctMushroom['scientific_name']} is{' '}
                            {correctMushroom['edibility']}!
                        </div>
                    )}
                    <div className="flex justify-center">
                        <button
                            className={`relative py-3 w-1/12 font-semibold outline outline-2 outline-cs-darkred
                            shadow-2xl h-full z-40 text-lg relative bg-cs-green
                            rounded-2xl hover:outline-3`}
                            onClick={() => setQuestionOn(val => val + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default QuizQuestion;
