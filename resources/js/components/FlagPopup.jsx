import React, { useContext, useEffect, useRef, useState } from 'react';
import { QuizContext } from '../context/QuizContext';

function FlagPopup() {
    const ref = useRef(null);
    const { token, flagImageId, setFlagImageId } = useContext(QuizContext);
    const [reasons, setReasons] = useState([
        {
            id: 'incorrect-mushroom',
            reason: 'Incorrect mushroom',
            checked: false,
        },
        {
            id: 'no-mushroom',
            reason: 'Doesn&apos;t show mushroom',
            checked: false,
        },
        {
            id: 'gives-answer',
            reason: 'Contains mushroom name',
            checked: false,
        },
    ]);

    function handlePageClick(event) {
        if (ref.current) {
            togglePopup(event.target);
        }
    }

    function togglePopup(element) {
        if (!ref.current.contains(element) || element.id == 'close-button') {
            setFlagImageId(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handlePageClick, true);
        return () => {
            document.removeEventListener('click', handlePageClick, true);
        };
    }, [setFlagImageId]);

    function clickCheckbox(e) {
        const id = e.target.getAttribute('id');

        setReasons(prevReasons => {
            const reasonsCopy = JSON.parse(JSON.stringify(prevReasons));

            reasonsCopy.map(r => {
                if (r['id'] == id) {
                    r['checked'] = !r['checked'];
                }
                return r;
            });

            return reasonsCopy;
        });
    }

    function submitImageFlag() {
        const data = {
            image_id: flagImageId,
            _token: token,
        };
        fetch('/api/flagimage', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(() => setFlagImageId(false));
    }

    return (
        <div
            ref={ref}
            className="absolute z-50 top-1/8 bg-cs-blue 
                rounded-3xl shadow-2xl p-6 text-2xl text-center
                w-11/12       md:w-9/12       lg:w-6/12 
                left-[4.167%] md:left-[12.5%] lg:left-1/4"
        >
            <button
                type="button"
                className=" text-cs-red outline outline-2 outline-cs-red rounded-md p-2 inline-flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-cs-grey
                absolute top-4 right-4"
                onClick={() => togglePopup(this)}
                id="close-button"
            >
                <span className="sr-only">Close menu</span>
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <div className="mb-4 font-bold">
                Reason(s) for flagging this image
            </div>
            <img
                src={`https://images.mushroomobserver.org/320/${flagImageId}.jpg`}
                id={`flag-popup`}
                className="mt-5 mx-auto rounded-lg shadow-lg max-h-60"
            />
            <div className="text-lg md:text-xl mt-4">
                <ul>
                    {reasons.map(reason => {
                        return (
                            <li key={reason['id']}>
                                <label htmlFor={reason['id']}>
                                    <input
                                        id={reason['id']}
                                        value={reason['reason']}
                                        type="checkbox"
                                        className="mr-2"
                                        checked={reason['checked']}
                                        onChange={e => clickCheckbox(e)}
                                    />
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: reason['reason'],
                                        }}
                                    />
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <button
                className={`mt-4 outline outline-1 bg-cs-red px-4 py-2 rounded-xl font-bold
                    ${
                        reasons.filter(r => r.checked).length == 0
                            ? 'opacity-50'
                            : 'opacity-80 hover:opacity-100 hover:outline-2'
                    }`}
                disabled={reasons.filter(r => r.checked).length == 0}
                onClick={() => submitImageFlag()}
            >
                Submit
            </button>
            <div className="mt-6 text-sm">
                After submitting, the image will be reviewed before it&apos;s
                removed from the quiz.
            </div>
        </div>
    );
}

export default FlagPopup;
