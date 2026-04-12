import { useState, useEffect } from "react";
import { getQuestionsByTopic } from "../services/firebase";
import "../App.css";

function Quiz({ onSubmit, topic, subject }) {
  const [answers, setAnswers] = useState({});
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const questions = await getQuestionsByTopic(topic, subject);
      setFilteredQuestions(questions || []);
      setLoading(false);
    };
    if (topic) loadQuestions();
  }, [topic]);

  const handleSelect = (id, option) => {
    setAnswers({ ...answers, [id]: option });
  };

  const getOptions = (q) => {
    if (Array.isArray(q.options)) {
      return q.options;
    }
    if (q.options && typeof q.options === "object") {
      return Object.values(q.options);
    }
    return [];
  };

  const handleSubmit = () => {
    let score = 0;
    filteredQuestions.forEach((q) => {
      const options = getOptions(q);
      const selectedIndex = options.findIndex((opt) => opt === answers[q.id]);
      if (selectedIndex >= 0 && selectedIndex.toString() === q.answer) {
        score++;
      }
    });
    onSubmit(score, answers);
  };

  const optionLabels = ["A", "B", "C", "D"];

  if (loading) {
    return (
      <div className="quiz-container">
        <h2>Loading questions...</h2>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2 className="title">
        {topic ? `${topic} Quiz` : "Snowflake MCQ Quiz"}
      </h2>

      {filteredQuestions.length === 0 ? (
        <div className="question-card">
          <h3>No questions found for this topic.</h3>
        </div>
      ) : (
        filteredQuestions.map((q, index) => {
          const options = getOptions(q);
          return (
            <div className="question-card" key={q.id}>
              <h3>
                {index + 1}. {q.question}
              </h3>

              {options.map((opt, i) => (
                <div
                  key={i}
                  className={`option ${answers[q.id] === opt ? "selected" : ""}`}
                  onClick={() => handleSelect(q.id, opt)}
                >
                  <span className="label">{optionLabels[i]}.</span> {opt}
                </div>
              ))}
            </div>
          );
        })
      )}

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  );
}

export default Quiz;
