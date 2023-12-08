import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

function QuizQuestions() {
    const { quiz, setQuiz } = useContext(QuizContext);

    function addImagesToQuiz(imageIds, questionIndex) {
        setQuiz(previousQuiz => {
            previousQuiz[questionIndex]['4'] = imageIds;
            console.log(questionIndex);
            return previousQuiz;
        });
    }

    function getImageUrls(scientificName, questionIndex) {
        const url = `/api/getimages?scientific_name=${scientificName}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(imageIds => {
                addImagesToQuiz(imageIds, questionIndex);
            });
    }

    for (let i = 0; i < quiz.length; i++) {
        getImageUrls(quiz[i][0]['scientific_name'], 0);
    }

    return <div>asdf</div>;
}

export default QuizQuestions;
