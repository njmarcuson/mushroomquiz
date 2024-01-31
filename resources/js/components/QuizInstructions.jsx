import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

QuizInstructions.propTypes = {
    setShowInstructions: PropTypes.func.isRequired,
};

export default function QuizInstructions(props) {
    const ref = useRef(null);

    const handleCloseInstructions = event => {
        if (
            ref.current &&
            (!ref.current.contains(event.target) ||
                event.target.id == 'close-button')
        ) {
            props.setShowInstructions(false);
            if (document.getElementById('dont-show-checkbox').checked) {
                localStorage.setItem('hide-instructions', JSON.stringify(true));
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleCloseInstructions, true);
        return () => {
            document.removeEventListener(
                'click',
                handleCloseInstructions,
                true
            );
        };
    }, [props.setShowInstructions]);

    return (
        <div
            ref={ref}
            className="absolute z-50 w-11/12 md:w-9/12  lg:w-6/12 bg-cs-blue 
            top-1/4 left-1/4 rounded-3xl shadow-2xl p-6 text-center text-2xl"
        >
            <div className="mb-4 font-bold">
                Each question will display 4 images of the
                <span className="italic"> same </span>mushroom species.
            </div>
            <div className="mb-4 font-bold">
                If an image doesn&apos;t show the correct mushroom, or it gives
                away the answer, click the red flag 🚩 in the top right corner.
            </div>
            <div className="mb-4 font-bold">
                Click the correct species, and play through to test your
                mushroom identification skills!
            </div>

            <div>
                <label
                    htmlFor="dont-show-checkbox"
                    className="ms-2 text-xl font-medium text-gray-900 dark:text-gray-300"
                >
                    <input
                        id="dont-show-checkbox"
                        type="checkbox"
                        value=""
                        className="mr-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    Don&apos;t show this again
                </label>
                <div>
                    <button
                        className="mt-4 border border-2 py-1 px-2 bg-cs-red font-bold rounded-xl opacity-60 hover:opacity-100"
                        onClick={event => handleCloseInstructions(event)}
                        id="close-button"
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
}
