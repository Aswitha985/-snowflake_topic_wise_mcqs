import { useState, useEffect } from "react";
import { getTopics, addQuestionsToTopic } from "../../services/firebase";
import "../../App.css";

function UploadJsonPage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [jsonFile, setJsonFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true);
      const loadedTopics = await getTopics();
      setTopics(loadedTopics || []);
      setLoading(false);
    };

    loadTopics();
  }, []);

  const handleFileChange = (event) => {
    setJsonFile(event.target.files?.[0] || null);
    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedTopic) {
      setStatus("Please select a topic before uploading the JSON file.");
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

      await addQuestionsToTopic(selectedTopic, questions);
      setStatus(`Successfully added ${questions.length} questions to ${selectedTopic}.`);
      setJsonFile(null);
      event.target.reset();
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
            Select topic:
            <select
              value={selectedTopic}
              onChange={(event) => setSelectedTopic(event.target.value)}
            >
              <option value="">Choose a topic</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.topic_name}>
                  {topic.topic_name}
                </option>
              ))}
            </select>
          </label>

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
