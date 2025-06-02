import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  function addQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function updateQuestion(updatedQuestion) {
    setQuestions(
       (questions.map((q) => (q.id === updatedQuestion.id)) ? updatedQuestion : q))
    ;
  }

  return (
    <div>
      <QuestionForm onAddQuestion={addQuestion} />
      <QuestionList
        questions={questions}
        onDeleteQuestion={deleteQuestion}
        onUpdateQuestion={updateQuestion}
      />
    </div>
  );
}

export default App;
