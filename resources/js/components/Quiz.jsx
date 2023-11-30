import React, { useEffect } from 'react';

function Quiz() {
    useEffect(() => {
        // this needs to fetch from THIS api to get the 10 questions
        // then it needs to fetch from MO api to get the 4 images
    }, []);

    return <div>Quiz is being taken</div>;
}

export default Quiz;
