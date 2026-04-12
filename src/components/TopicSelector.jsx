import { useState, useEffect } from "react";
import { getTopics } from "../services/firebase";
import "../App.css";

function TopicSelector({ subject, onSelect }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true);
      const loadedTopics = await getTopics(subject);
      setTopics(loadedTopics);
      setLoading(false);
    };
    loadTopics();
  }, [subject]);

  if (loading) {
    return (
      <div className="topic-selector">
        <div className="login-wrapper">
          <div className="topic-card">
            <h2>Loading topics...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="topic-selector">
        <div className="login-wrapper">
          <div className="topic-card">
            <h2>No topics available</h2>
            <p>Please check your Firebase collection.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="topic-selector">
      <div className="login-wrapper">
        <div className="topic-card">
          <h2>{subject ? `Select ${subject} Topic` : "Select Quiz Topic"}</h2>
          {topics.map((topic, index) => (
            <div key={topic.id} className="topic-list-item">
              <button
                className="topic-btn"
                onClick={() => onSelect(topic.topic_name)}
              >
                {index + 1} . {topic.topic_name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopicSelector;
