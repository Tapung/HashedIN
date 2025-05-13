import React, { useState } from 'react';

const questionsBank = [
  { id: 'q1', text: 'What is 2 + 2?', options: ['3', '4', '5'], correctAnswer: '4' },
  { id: 'q2', text: 'What is the capital of France?', options: ['Paris', 'London', 'Rome'], correctAnswer: 'Paris' },
  { id: 'q3', text: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter'], correctAnswer: 'Mars' },
  { id: 'q4', text: 'What color do you get when you mix red and white?', options: ['Pink', 'Purple', 'Orange'], correctAnswer: 'Pink' },
  { id: 'q5', text: 'What is the boiling point of water in Celsius?', options: ['90', '100', '110'], correctAnswer: '100' },
];

const getRandomQuestion = (questions, lastQuestionId, usedIds) => {
  const unused = questions.filter(q => q.id !== lastQuestionId && !usedIds.includes(q.id));
  if (unused.length === 0) return null;
  return unused[Math.floor(Math.random() * unused.length)];
};

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizLength = 5;

  const startQuiz = () => {
    const question = getRandomQuestion(questionsBank, null, []);
    setCurrentQuestion(question);
    setUsedQuestionIds([question.id]);
    setScore(0);
    setFeedback('');
    setQuizCompleted(false);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) setScore(score + 1);
    setFeedback(isCorrect ? 'Correct!' : `Incorrect, the answer was ${currentQuestion.correctAnswer}.`);
  };

  const handleNext = () => {
    if (usedQuestionIds.length >= quizLength) {
      setQuizCompleted(true);
      return;
    }
    const question = getRandomQuestion(questionsBank, currentQuestion.id, usedQuestionIds);
    if (question) {
      setCurrentQuestion(question);
      setUsedQuestionIds([...usedQuestionIds, question.id]);
      setSelectedOption(null);
      setFeedback('');
    }
  };

  const restartQuiz = () => {
    startQuiz();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Interactive Quiz</h1>
      {!currentQuestion && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={startQuiz}>
          Start Quiz
        </button>
      )}
      {currentQuestion && !quizCompleted && (
        <div>
          <div className="mb-4">
            <p className="text-lg font-semibold">{currentQuestion.text}</p>
            <div className="mt-2 space-y-2">
              {currentQuestion.options.map((opt) => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name="option"
                    value={opt}
                    checked={selectedOption === opt}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />{' '}
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            Submit Answer
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={handleNext}
          >
            Next Question
          </button>
          <div className="mt-3 font-medium">{feedback}</div>
        </div>
      )}
      {quizCompleted && (
        <div className="mt-6">
          <p className="text-lg">Quiz completed! Your score: {score} / {quizLength}</p>
          <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
