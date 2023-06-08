import React, { useState } from 'react';
import FormBuilder from './FormBuilder';
import FormViewer from './FormViewer';

function App() {
  const [formQuestions, setFormQuestions] = useState([]);

  const handleAddQuestion = (question) => {
    setFormQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  return (
    <div className="app">
      <div className="form-builder">
        <h2>Form Builder</h2>
        <FormBuilder onAddQuestion={handleAddQuestion} />
      </div>
      <div className="form-viewer">
        <h2>Form Viewer</h2>
        <FormViewer questions={formQuestions} />
      </div>
    </div>
  );
}

export default App;
