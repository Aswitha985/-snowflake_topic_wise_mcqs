import { useState, useEffect } from "react";
import { getQuestionsByTopic } from "../services/firebase";
import "../App.css";

function Result({ score, answers, topic, subject }) {
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

  const getOptions = (q) => {
    if (Array.isArray(q.options)) {
      return q.options;
    }
    if (q.options && typeof q.options === "object") {
      return Object.values(q.options);
    }
    return [];
  };

  const optionLabels = ["A", "B", "C", "D"];

  if (loading) {
    return (
      <div className="quiz-container">
        <h2>Loading results...</h2>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2 className="title">
        Final Score: {score} / {filteredQuestions.length}{" "}
        {topic ? `(${topic})` : ""}
      </h2>

      <h3 style={{ color: "white", textAlign: "center" }}>Answer Review</h3>

      {filteredQuestions.map((q, index) => {
        const options = getOptions(q);
        const selectedIndex = options.findIndex((opt) => opt === answers[q.id]);
        const selectedLabel =
          selectedIndex >= 0
            ? optionLabels[selectedIndex]
            : answers[q.id]
              ? "?"
              : "Not Answered";
        const correctIndex =
          typeof q.answer === "string" ? parseInt(q.answer, 10) : q.answer;
        const correctLabel =
          !Number.isNaN(correctIndex) &&
          correctIndex >= 0 &&
          correctIndex < optionLabels.length
            ? optionLabels[correctIndex]
            : q.answer;

        return (
          <div className="question-card" key={q.id}>
            <h3>
              {index + 1}. {q.question}
            </h3>

            <p
              style={{
                color:
                  selectedLabel === correctLabel
                    ? "green"
                    : selectedLabel !== "Not Answered"
                      ? "red"
                      : "gray",
                fontWeight: "bold",
              }}
            >
              Your Answer: {selectedLabel}
            </p>

            <p style={{ color: "blue", fontWeight: "bold" }}>
              Correct Answer: {correctLabel}
            </p>
          </div>
        );
      })}

      <button className="submit-btn" onClick={() => window.location.reload()}>
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;
