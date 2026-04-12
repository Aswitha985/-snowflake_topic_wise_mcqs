import "../App.css";

function SubjectPage({ onSelect }) {
  const subjects = ["Python", "Snowflake", "SQL"];

  return (
    <div className="topic-selector">
      <div className="login-wrapper">
        <div className="topic-card">
          <h2>Select a Subject</h2>
          <div className="topics-grid">
            {subjects.map((subject) => (
              <button
                key={subject}
                className="topic-btn"
                onClick={() => onSelect(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectPage;
