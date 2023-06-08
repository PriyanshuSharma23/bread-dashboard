import React from 'react';

function FormViewer({ questions }) {
  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <p>ID: {question.id}</p>
          <p>Text: {question.text}</p>
          <p>Key: {question.key}</p>
          <p>Required: {question.required ? 'Yes' : 'No'}</p>
          <p>Type: {question.type}</p>
          {question.type === 'checkbox' && (
            <div>
              <p>Options:</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    Option: {option} | Next Question ID: {question.nextQuestionIds[optionIndex]}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p>Next Question ID: {question.nextQuestionId}</p>
        </div>
      ))}
    </div>
  );
}

export default FormViewer;
