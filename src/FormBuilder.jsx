import React, { useState } from 'react';

function FormBuilder({ onAddQuestion }) {
  const [question, setQuestion] = useState({
    id: 0,
    text: '',
    key: '',
    required: false,
    type: 'input',
    options: [],
    nextQuestionIds: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prevQuestion) => ({ ...prevQuestion, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setQuestion((prevQuestion) => ({ ...prevQuestion, [name]: checked }));
  };

  const handleOptionChange = (e, index) => {
    const { value } = e.target;
    setQuestion((prevQuestion) => {
      const options = [...prevQuestion.options];
      options[index] = value;
      return { ...prevQuestion, options };
    });
  };

  const handleAddOption = () => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: [...prevQuestion.options, ''],
      nextQuestionIds: [...prevQuestion.nextQuestionIds, ''],
    }));
  };

  const handleRemoveOption = (index) => {
    setQuestion((prevQuestion) => {
      const options = [...prevQuestion.options];
      options.splice(index, 1);
      const nextQuestionIds = [...prevQuestion.nextQuestionIds];
      nextQuestionIds.splice(index, 1);
      return { ...prevQuestion, options, nextQuestionIds };
    });
  };

  const handleNextQuestionIdChange = (e, index) => {
    const { value } = e.target;
    setQuestion((prevQuestion) => {
      const nextQuestionIds = [...prevQuestion.nextQuestionIds];
      nextQuestionIds[index] = value;
      return { ...prevQuestion, nextQuestionIds };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddQuestion(question);
    setQuestion((prevQuestion) => ({
      id: prevQuestion.id + 1,
      text: '',
      key: '',
      required: false,
      type: 'input',
      options: [],
      nextQuestionIds: [],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question:</label>
        <input
          type="text"
          name="text"
          value={question.text}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Key:</label>
        <input
          type="text"
          name="key"
          value={question.key}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Required:</label>
        <input
          type="checkbox"
          name="required"
          checked={question.required}
          onChange={handleCheckboxChange}
        />
      </div>
      <div>
        <label>Type:</label>
        <select name="type" value={question.type} onChange={handleInputChange}>
          <option value="input">Input</option>
          <option value="range">Range</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>
      {question.type === 'checkbox' && (
        <div>
          <label>Options:</label>
          {question.options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e, index)}
              />
              <label>Next Question ID:</label>
              <input
                type="text"
                value={question.nextQuestionIds[index]}
                onChange={(e) => handleNextQuestionIdChange(e, index)}
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>
        </div>
      )}
      <div>
        <label>Next Question ID:</label>
        <input
          type="text"
          name="nextQuestionId"
          value={question.nextQuestionId}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default FormBuilder;
