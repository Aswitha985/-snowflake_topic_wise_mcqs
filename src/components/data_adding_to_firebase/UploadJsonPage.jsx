import { useState, useEffect } from "react";
import {
  getTopics,
  addQuestionsToTopic,
  addTopic,
} from "../../services/firebase";
import "../../App.css";

function UploadJsonPage() {
  const subjects = ["Python", "Snowflake", "SQL"];
  const [topics, setTopics] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [jsonFile, setJsonFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true);
      if (!selectedSubject) {
        setTopics([]);
        setSelectedTopic("");
        setLoading(false);
        return;
      }

      const loadedTopics = await getTopics(selectedSubject);
      setTopics(loadedTopics || []);
      setSelectedTopic("");
      setLoading(false);
    };

    loadTopics();
  }, [selectedSubject]);

  const handleFileChange = (event) => {
    setJsonFile(event.target.files?.[0] || null);
    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedSubject) {
      setStatus("Please select a subject before uploading.");
      return;
    }

    const topicName = showNewTopic ? newTopicName.trim() : selectedTopic;
    if (!topicName) {
      setStatus(
        "Please select a topic or enter a new topic name before uploading.",
      );
      return;
    }

    if (!jsonFile) {
      setStatus("Please choose a JSON file to upload.");
      return;
    }

    setUploading(true);
    setStatus("Parsing JSON file...");

    try {
      const fileText = await jsonFile.text();
      const parsed = JSON.parse(fileText);
      const questions = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed.questions)
          ? parsed.questions
          : [];

      if (!questions.length) {
        throw new Error("JSON file must contain an array of question objects.");
      }

      if (showNewTopic) {
        await addTopic(topicName, selectedSubject);
        setTopics((prev) => [
          ...prev,
          { id: topicName, topic_name: topicName },
        ]);
      }

      await addQuestionsToTopic(topicName, questions, selectedSubject);
      setStatus(
        `Successfully added ${questions.length} questions to ${topicName}.`,
      );
      setJsonFile(null);
      event.target.reset();
      if (showNewTopic) {
        setShowNewTopic(false);
        setNewTopicName("");
        setSelectedTopic(topicName);
      }
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Failed to upload questions.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="quiz-container">
      <h2 className="title">Upload JSON Questions to Firebase</h2>

      {loading ? (
        <p>Loading topics...</p>
      ) : (
        <form className="question-form" onSubmit={handleSubmit}>
          <label>
            Select subject:
            <select
              value={selectedSubject}
              onChange={(event) => {
                setSelectedSubject(event.target.value);
                setShowNewTopic(false);
                setNewTopicName("");
                setStatus("");
              }}
            >
              <option value="">Choose a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </label>

          {selectedSubject && (
            <>
              <label>
                Select topic:
                <select
                  value={selectedTopic}
                  onChange={(event) => setSelectedTopic(event.target.value)}
                  disabled={showNewTopic}
                >
                  <option value="">Choose a topic</option>
                  {topics.map((topic) => (
                    <option key={topic.id} value={topic.topic_name}>
                      {topic.topic_name}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className="submit-btn"
                onClick={() => {
                  if (!selectedSubject) {
                    setStatus("Select a subject first to add a new topic.");
                    return;
                  }
                  setShowNewTopic((value) => !value);
                  setNewTopicName("");
                  setStatus("");
                }}
                style={{ marginTop: 10 }}
              >
                {showNewTopic ? "Cancel new topic" : "Add new topic"}
              </button>

              {showNewTopic && (
                <label style={{ marginTop: 12 }}>
                  New topic name:
                  <input
                    type="text"
                    value={newTopicName}
                    onChange={(event) => setNewTopicName(event.target.value)}
                    placeholder="Enter new topic name"
                  />
                </label>
              )}
            </>
          )}

          <label>
            Upload JSON file:
            <input
              type="file"
              accept="application/json"
              onChange={handleFileChange}
            />
          </label>

          <button className="submit-btn" type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Questions"}
          </button>

          {status && <p style={{ color: "white", marginTop: 16 }}>{status}</p>}
        </form>
      )}
    </div>
  );
}

export default UploadJsonPage;
