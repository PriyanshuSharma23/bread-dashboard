import React, { useState } from "react";

import { QuestionBlock } from "./components/QuestionBlock";
import { BranchQuestion } from "./types/question";
import { AddQuestion } from "./components/AddQuestion";

function App() {
  const [formQuestions, setFormQuestions] = useState([]);

  // const handleAddQuestion = (question) => {
  //   setFormQuestions((prevQuestions) => [...prevQuestions, question]);
  // };

  return (
    <div className="app mx-auto flex  min-h-screen flex-col items-center  gap-8 bg-slate-100  pt-8">
      {formQuestions.map((formQuestion, idx) => (
        <QuestionBlock
          question={formQuestion}
          updateQuestion={updateQuestion}
          questionIdx={idx}
          key={idx}
          questions={formQuestions}
          addQuestion={addQuestion}
        />
      ))}
      {formQuestions[formQuestions.length - 1]?.constructor !==
        BranchQuestion && <AddQuestion addQuestion={addQuestion} />}
    </div>
  );

  function addQuestion({ question, idx = formQuestions.length - 1 }) {
    // setFormQuestions((prevQuestions) => [...prevQuestions, question]);

    setFormQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(idx + 1, 0, question);
      return newQuestions;
    });

    return question.id;
  }

  function updateQuestion({ idx, question }) {
    setFormQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[idx] = question;
      return newQuestions;
    });
  }
}

// let

export default App;
