import React, { useEffect, useState } from 'react';

function AdminStats() {
    const [stats, setStats] = useState(false);

    function getPercentOfQuizzes(stat) {
        return `${
            Math.round((1000 * stats[stat]) / stats['quizzes_taken']) / 10 ?? 0
        }%`;
    }

    function getPercentOfQuestionsAnswered(stat) {
        return `${
            Math.round((1000 * stats[stat]) / stats['questions_answered']) /
                10 ?? 0
        }%`;
    }

    useEffect(() => {
        fetch('/getstats', {
            method: 'GET',
            //body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            //.then(response => console.log(response))
            .then(data => {
                console.log(data);
                setStats(data);
            });
    }, []);

    return (
        <div className="text-center space-y-3 mt-4">
            <span className="font-bold text-2xl">Mushroom Quiz Stats</span>
            {stats && (
                <>
                    <div>
                        <span className="text-xl">General</span>
                        <div className="flex flex-wrap justify-center gap-x-8">
                            <div>Started: {stats['quizzes_taken']}</div>
                            <div>
                                Finished: {stats['quizzes_finished']} (
                                {getPercentOfQuizzes('quizzes_finished')})
                            </div>
                            <div>
                                Mobile: {stats['quizzes_mobile']} (
                                {getPercentOfQuizzes('quizzes_mobile')})
                            </div>
                            <div>
                                Questions Answered:{' '}
                                {stats['questions_answered']}
                            </div>
                            <div>
                                Questions Correct: {stats['questions_correct']}{' '}
                                (
                                {getPercentOfQuestionsAnswered(
                                    'questions_correct'
                                )}
                                )
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="text-xl">Difficulties</span>
                        <div className="flex flex-wrap justify-center gap-x-8">
                            <div>
                                Easy: {stats['quizzes_easy']} (
                                {getPercentOfQuizzes('quizzes_easy')})
                            </div>
                            <div>
                                Medium: {stats['quizzes_medium']} (
                                {getPercentOfQuizzes('quizzes_medium')})
                            </div>
                            <div>
                                Hard: {stats['quizzes_hard']} (
                                {getPercentOfQuizzes('quizzes_hard')})
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="text-xl">Edibilities</span>
                        <div className="flex flex-wrap justify-center gap-x-8">
                            <div>
                                Edible: {stats['quizzes_edible']} (
                                {getPercentOfQuizzes('quizzes_edible')})
                            </div>
                            <div>
                                Inedible: {stats['quizzes_inedible']} (
                                {getPercentOfQuizzes('quizzes_inedible')})
                            </div>
                            <div>
                                Poisonous: {stats['quizzes_poisonous']} (
                                {getPercentOfQuizzes('quizzes_poisonous')})
                            </div>
                            <div>
                                Psychedelic: {stats['quizzes_psychedelic']} (
                                {getPercentOfQuizzes('quizzes_psychedelic')})
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="text-xl">Locations</span>
                        <div className="flex flex-wrap justify-center gap-x-8">
                            <div>
                                North America: {stats['quizzes_north_america']}{' '}
                                ({getPercentOfQuizzes('quizzes_north_america')})
                            </div>
                            <div>
                                South America: {stats['quizzes_south_america']}{' '}
                                ({getPercentOfQuizzes('quizzes_south_america')})
                            </div>
                            <div>
                                Africa: {stats['quizzes_africa']} (
                                {getPercentOfQuizzes('quizzes_africa')})
                            </div>
                            <div>
                                Europe: {stats['quizzes_europe']} (
                                {getPercentOfQuizzes('quizzes_europe')})
                            </div>
                            <div>
                                Asia: {stats['quizzes_asia']} (
                                {getPercentOfQuizzes('quizzes_asia')})
                            </div>
                            <div>
                                Europe: {stats['quizzes_oceania']} (
                                {getPercentOfQuizzes('quizzes_oceania')})
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminStats;
