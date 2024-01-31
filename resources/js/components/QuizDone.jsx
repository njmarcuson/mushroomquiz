import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

function QuizDone() {
    const { numberCorrect, quiz } = useContext(QuizContext);

    const isHappy = numberCorrect / quiz.length <= 0.5;

    const mushroomImage = isHappy
        ? '/images/sad_shroom.png'
        : '/images/happy_shroom.jpeg';

    return (
        // 1. You answered x/n correctly!
        // 2. Funny image
        // 3. Retake quiz button
        <>
            <div className="fixed w-full top-0 pr-8 bg-cs-grey z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mt-6 mb-5">
                    Mushroom Quiz
                </h1>
            </div>
            <div className="text-2xl text-center font-semibold mt-32">
                <div className="mb-4">
                    You answered {numberCorrect} out of {quiz.length} correctly!
                </div>

                <div className="flex justify-center">
                    <img
                        src={mushroomImage}
                        className="rounded-lg w-40 w-1/2 md:w-1/4 max-h-40 md:max-h-64 lg:max-h-none"
                    />
                </div>

                <div className="mt-4">
                    {isHappy
                        ? 'You made this mushroom sad :('
                        : 'You made this mushroom happy :)'}
                </div>

                <div className="text-2xl font-bold flex justify-center mt-6">
                    <button
                        className="bg-cs-green rounded-2xl shadow-2xl px-10 py-4 transition-all outline outline-1 
                                opacity-80 hover:opacity-100 "
                        onClick={() => location.reload()}
                    >
                        New Quiz
                    </button>
                </div>
            </div>
        </>
    );
}

export default QuizDone;
