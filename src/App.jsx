import { useState } from "react";
import Login from "./components/login";
import Quiz from "./components/quiz";
import Result from "./components/result";
import TopicSelector from "./components/TopicSelector";
import UploadJsonPage from "./components/data_adding_to_firebase/UploadJsonPage";

function App() {
  const [user, setUser] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showUploadPage, setShowUploadPage] = useState(false);

  return (
    <div className="app-bg">
      <div className="university-header">
        <span
          role="img"
          aria-label="quiz"
          style={{
            marginRight: 12,
            fontSize: "2.2rem",
            verticalAlign: "middle",
          }}
        >
          📝
        </span>
        <span style={{ fontWeight: 700 }}>Snowflake Topic Wise Question</span>
        <span
          style={{
            marginLeft: 12,
            fontSize: "1.5rem",
            verticalAlign: "middle",
          }}
        >
          ✨
        </span>
      </div>
      {user && (
        <div style={{ textAlign: "center", margin: "16px 0" }}>
          <button
            className="submit-btn"
            onClick={() => setShowUploadPage(!showUploadPage)}
          >
            {showUploadPage ? "Back to Quiz" : "Go to Upload JSON Page"}
          </button>
        </div>
      )}

      {showUploadPage ? (
        <UploadJsonPage />
      ) : !user ? (
        <Login onLogin={setUser} />
      ) : !selectedTopic ? (
        <TopicSelector onSelect={setSelectedTopic} />
      ) : !submitted ? (
        <Quiz
          topic={selectedTopic}
          onSubmit={(s, a) => {
            setScore(s);
            setAnswers(a);
            setSubmitted(true);
          }}
        />
      ) : (
        <Result score={score} answers={answers} topic={selectedTopic} />
      )}
    </div>
  );
}

export default App;
