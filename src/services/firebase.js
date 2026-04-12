import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  setDoc,
  serverTimestamp,
  doc,
} from 'firebase/firestore';

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

const getCollectionNameForSubject = (subject = "") =>
  subject ? `${subject.toLowerCase().replace(/\s+/g, "_")}_topics` : "snowflake_topics";

// Get all topics or subject-specific topics
export const getTopics = async (subject = "") => {
  try {
    const collectionName = getCollectionNameForSubject(subject);
    const querySnapshot = await getDocs(collection(db, collectionName));
    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.flatMap((docSnapshot) => {
      const data = docSnapshot.data();
      const value = data?.topic_name;
      if (Array.isArray(value)) {
        return value.map((topic, index) => ({
          id: `${docSnapshot.id}-${index}`,
          topic_name: topic,
        }));
      }
      if (typeof value === "string") {
        return [{ id: docSnapshot.id, topic_name: value }];
      }
      if (docSnapshot.id && docSnapshot.id !== "topics_list") {
        return [{ id: docSnapshot.id, topic_name: docSnapshot.id }];
      }
      return [];
    });
  } catch (error) {
    console.error("Error getting topics:", error);
    return [];
  }
};

export const addTopic = async (topicName, subject = "") => {
  if (!topicName || !topicName.trim()) {
    throw new Error("Topic name is required.");
  }

  const normalizedName = topicName.trim();
  const collectionName = getCollectionNameForSubject(subject);
  const topicDocRef = doc(db, collectionName, normalizedName);
  const existingDoc = await getDoc(topicDocRef);

  if (existingDoc.exists()) {
    throw new Error(`Topic '${normalizedName}' already exists.`);
  }

  await setDoc(topicDocRef, {
    topic_name: normalizedName,
  });
  return topicDocRef.id;
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
export const getQuestionsByTopic = async (topic, subject = "") => {
  try {
    if (!topic) {
      return [];
    }

    const rootCollectionName = subject
      ? `${subject.toLowerCase().replace(/\s+/g, "_")}_questions`
      : "questions";
    const topicDocRef = doc(db, rootCollectionName, topic);
    const subcollectionName = subject
      ? "questions"
      : await findExistingSubcollectionName(
          topicDocRef,
          getTopicSubcollectionCandidates(topic),
        );
    const q = collection(topicDocRef, subcollectionName);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting questions:", error);
    const localQuestions = (await import("./localQuestions.js")).default;
    if (topic) {
      return localQuestions.filter((q) => q.topic === topic);
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
export const addQuestionsToTopic = async (
  topic,
  questions,
  subject = "",
) => {
  if (!topic) {
    throw new Error("Topic is required.");
  }
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("Questions array is required.");
  }

  const rootCollectionName = subject
    ? `${subject.toLowerCase().replace(/\s+/g, "_")}_questions`
    : "questions";
  const topicDocRef = doc(db, rootCollectionName, topic);
  const subcollectionName = subject
    ? "questions"
    : await findExistingSubcollectionName(
        topicDocRef,
        getTopicSubcollectionCandidates(topic),
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

