import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  // TODO: Replace with your config
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Get all topics
export const getTopics = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "questions"));
    const topicsSet = new Set();
    querySnapshot.docs.forEach(doc => {
      topicsSet.add(doc.data().topic);
    });
    return Array.from(topicsSet);
  } catch (error) {
    console.error("Error getting topics:", error);
    return ["Operators", "Functions", "Syntax", "Data Types", "Input/Output", "Data Structures", "Loops"];
  }
};

  // Get questions by topic
export const getQuestionsByTopic = async (topic) => {
  try {

    let q = query(collection(db, "questions"));
    if (topic) {
      q = query(collection(db, "questions"), where("topic", "==", topic));
    }
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

