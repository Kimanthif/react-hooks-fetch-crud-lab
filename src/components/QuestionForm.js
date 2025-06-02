import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(onAddQuestion);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Question</h2>
      <input
        name="prompt"
        value={formData.prompt}
        onChange={handleChange}
        placeholder="Question prompt"
      />
      {formData.answers.map((ans, i) => (
        <input
          key={i}
          name={`answer${i}`}
          value={ans}
          onChange={handleChange}
          placeholder={`Answer ${i + 1}`}
        />
      ))}
      <select
        name="correctIndex"
        value={formData.correctIndex}
        onChange={handleChange}
      >
        <option value="0">Answer 1</option>
        <option value="1">Answer 2</option>
        <option value="2">Answer 3</option>
        <option value="3">Answer 4</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;
