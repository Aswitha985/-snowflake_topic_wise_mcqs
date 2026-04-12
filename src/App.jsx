import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/login";
import Quiz from "./components/quiz";
import Result from "./components/result";
import TopicSelector from "./components/TopicSelector";
import UploadJsonPage from "./components/data_adding_to_firebase/UploadJsonPage";
import SubjectPage from "./components/SubjectPage";

function App() {
  const [user, setUser] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (userData) => {
    setUser(userData);
    navigate("/subject");
  };

  const handleUploadToggle = () => {
    navigate("/upload");
  };

  const handleBackFromUpload = () => {
    if (selectedTopic) {
      navigate("/quiz");
    } else if (selectedSubject) {
      navigate("/topics");
    } else {
      navigate("/subject");
    }
  };

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
          {location.pathname === "/upload" ? (
            <button className="submit-btn" onClick={handleBackFromUpload}>
              Back
            </button>
          ) : (
            <button className="submit-btn" onClick={handleUploadToggle}>
              Go to Upload JSON Page
            </button>
          )}
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/subject" : "/login"} replace />}
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/subject" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/subject"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <SubjectPage
                onSelect={(subject) => {
                  setSelectedSubject(subject);
                  setSelectedTopic(null);
                  setSubmitted(false);
                  navigate("/topics");
                }}
              />
            )
          }
        />
        <Route
          path="/topics"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : !selectedSubject ? (
              <Navigate to="/subject" replace />
            ) : (
              <TopicSelector
                subject={selectedSubject}
                onSelect={(topic) => {
                  setSelectedTopic(topic);
                  setSubmitted(false);
                  navigate("/quiz");
                }}
              />
            )
          }
        />
        <Route
          path="/quiz"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : !selectedSubject ? (
              <Navigate to="/subject" replace />
            ) : !selectedTopic ? (
              <Navigate to="/topics" replace />
            ) : (
              <Quiz
                topic={selectedTopic}
                subject={selectedSubject}
                onSubmit={(s, a) => {
                  setScore(s);
                  setAnswers(a);
                  setSubmitted(true);
                  navigate("/result");
                }}
              />
            )
          }
        />
        <Route
          path="/result"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : !submitted ? (
              <Navigate to="/quiz" replace />
            ) : (
              <Result score={score} answers={answers} topic={selectedTopic} />
            )
          }
        />
        <Route
          path="/upload"
          element={
            !user ? <Navigate to="/login" replace /> : <UploadJsonPage />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
