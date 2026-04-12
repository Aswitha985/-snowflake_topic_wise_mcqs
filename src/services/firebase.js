import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, addDoc, serverTimestamp, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDMDqHl-VY0S4QwMvUbLruaI3X7cD_9pQY",
  authDomain: "snowflake-mcq-app.firebaseapp.com",
  projectId: "snowflake-mcq-app",
  storageBucket: "snowflake-mcq-app.firebasestorage.app",
  messagingSenderId: "108356901848",
  appId: "1:108356901848:web:75e86b2356d9dbdb7130ad",
  measurementId: "G-QKCG7EYHCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Get all topics
export const getTopics = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "snowflake_topics"));
    return querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        return data?.topic_name
          ? { id: doc.id, topic_name: data.topic_name }
          : null;
      })
      .filter(Boolean);
  } catch (error) {
    console.error("Error getting topics:", error);
    // return [
    //   { id: "1", topic_name: "SnowPipe" },
    //   { id: "2", topic_name: "Streams" },
    // ];
  }
};

const normalizeTopicName = (topic) => {
  return topic.toLowerCase().replace(/\s+/g, "");
};

const getTopicSubcollectionCandidates = (topic) => {
  const normalized = normalizeTopicName(topic);
  return [
    `${topic}_topic_questions`,
    `${topic.toLowerCase().replace(/\s+/g, "_")}_topic_questions`,
    `${normalized}_topic_questions`,
    `${normalized.replace(/s$/, "")}_topic_questions`,
  ];
};

const findExistingSubcollectionName = async (topicDocRef, candidates) => {
  for (const name of [...new Set(candidates)]) {
    const snapshot = await getDocs(collection(topicDocRef, name));
    if (!snapshot.empty) {
      return name;
    }
  }
  return candidates[0];
};

// Get questions by topic
export const getQuestionsByTopic = async (topic) => {
  try {
    if (!topic) {
      return [];
    }

    const topicDocRef = doc(db, "questions", topic);
    const subcollectionName = await findExistingSubcollectionName(
      topicDocRef,
      getTopicSubcollectionCandidates(topic)
    );
    const q = collection(topicDocRef, subcollectionName);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting questions:", error);
    const localQuestions = (await import('./localQuestions.js')).default;
    if (topic) {
      return localQuestions.filter(q => q.topic === topic);
    }
    return localQuestions;
  }
};

// Add new question
export const addQuestion = async (questionData) => {
  try {
    questionData.createdAt = serverTimestamp();
    const docRef = await addDoc(collection(db, "questions"), questionData);
    console.log("Question added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding question: ", error);
    throw error;
  }
};

// Add multiple questions under a topic's nested subcollection
export const addQuestionsToTopic = async (topic, questions) => {
  if (!topic) {
    throw new Error("Topic is required.");
  }
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("Questions array is required.");
  }

  const topicDocRef = doc(db, "questions", topic);
  const subcollectionName = await findExistingSubcollectionName(
    topicDocRef,
    getTopicSubcollectionCandidates(topic)
  );

  for (const question of questions) {
    const questionData = {
      ...question,
      topic,
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(topicDocRef, subcollectionName), questionData);
  }

  return questions.length;
};

