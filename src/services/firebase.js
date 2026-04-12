/*import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDMDqHl-VY0S4QwMvUbLruaI3X7cD_9pQY",
  authDomain: "snowflake-mcq-app.firebaseapp.com",
  projectId: "snowflake-mcq-app",
  storageBucket: "snowflake-mcq-app.firebasestorage.app",
  messagingSenderId: "108356901848",
  appId: "1:108356901848:web:75e86b2356d9dbdb7130ad"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const getTopics = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "questions"));
    const topicsSet = new Set();
    querySnapshot.docs.forEach((doc) => {
      topicsSet.add(doc.data().topic);
    });
    if (topicsSet.size > 0) return Array.from(topicsSet);
  } catch (error) {
    console.error("Error getting topics:", error);
  }
  // Fallback to static topics
  return ["Python"];

};

export const getQuestionsByTopic = async (topic) => {
  try {
    let q = query(collection(db, "questions"));
    if (topic) {
      q = query(collection(db, "questions"), where("topic", "==", topic));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting questions:", error);
    const localQuestions = (await import('./localQuestions.js')).default;
    if (topic) {
      return localQuestions.filter(q => q.topic === topic);
    }
return localQuestions;
  }

};

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
};*/
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyDMDqHl-VY0S4QwMvUbLruaI3X7cD_9pQY",
   authDomain: "snowflake-mcq-app.firebaseapp.com",
   projectId: "snowflake-mcq-app",
   storageBucket: "snowflake-mcq-app.firebasestorage.app",
   messagingSenderId: "108356901848",
   appId: "1:108356901848:web:75e86b2356d9dbdb7130ad"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
