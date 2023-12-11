import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizQuestions from './QuizQuestions';

function Quiz() {
    const {
        setQuiz,
        quizSlug,
        token,
        isFirstQuestionLoaded,
        setIsFirstQuestionLoaded,
        setQuestionOrder,
        setQuestionOn,
        setTotalQuestionsLoaded,
    } = useContext(QuizContext);

    useEffect(() => {
        const data = {
            _token: token,
            quizSlug: quizSlug,
        };

        fetch('/api/getquestions', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                setQuiz(data);
                getImageIdsForQuiz(data);
            });
    }, []);

    function getImageIdsForQuiz(data) {
        for (let i = 0; i < data.length; i++) {
            getImageIdsForQuestion(data[i][0]['scientific_name'], i);
        }
    }

    function getImageIdsForQuestion(scientificName, questionIndex) {
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

    let firstQuestionsImagesAdded = false;
    function addImagesToQuiz(imageIds, questionIndex) {
        if (firstQuestionsImagesAdded == false) {
            console.log('HERE');
            setQuestionOn(0);
            setIsFirstQuestionLoaded(true);
            firstQuestionsImagesAdded = true;
        }

        setTotalQuestionsLoaded(val => val + 1);

        setQuestionOrder(previousQuestionOrder => {
            previousQuestionOrder.push(questionIndex);
            return previousQuestionOrder;
        });
        setQuiz(previousQuiz => {
            previousQuiz[questionIndex]['4'] = imageIds;
            console.log(questionIndex);
            return previousQuiz;
        });
    }

    return (
        <div>{isFirstQuestionLoaded ? <QuizQuestions /> : 'Loading...'}</div>
    );
}

export default Quiz;
