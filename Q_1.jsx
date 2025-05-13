import React, { useState } from "react";


const QuizSystem = () => {
  const [questionBank, setQuestionBank] = useState([]);
  const [lastQuestionId, setLastQuestionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

 
  const loadQuestionBank = (questions) => {
    setQuestionBank(questions);
    setLastQuestionId(null);
    setCurrentQuestion(null);
  };

  
  const getRandomQuestion = (previousId) => {
    if (questionBank.length === 0) return null;

    let availableQuestions = questionBank;

   
    if (questionBank.length > 1 && previousId !== null) {
      availableQuestions = questionBank.filter(q => q.id !== previousId);
    }

    const randomQuestion =
      availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

    setCurrentQuestion(randomQuestion);
    setLastQuestionId(randomQuestion.id);
  };

  const reshuffle = () => {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    setQuestionBank(shuffled);
    setLastQuestionId(null);
    setCurrentQuestion(null);
  };

  const sampleQuestions = [
    { id: 1, text: "What is 2 + 2?" },
    { id: 2, text: "What is the capital of France?" },
    { id: 3, text: "What is React?" },
  ];

  return (
    <div>
      <button onClick={() => loadQuestionBank(sampleQuestions)}>Load Questions</button>
      <button onClick={() => getRandomQuestion(lastQuestionId)}>Get Random Question</button>
      <button onClick={reshuffle}>Reshuffle Questions</button>
      <div>
        <h3>Current Question:</h3>
        <p>{currentQuestion ? currentQuestion.text : "No question selected"}</p>
      </div>
    </div>
  );
};

export default QuizSystem;
