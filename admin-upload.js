import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };
import questions from "./src/services/questions.json" assert { type: "json" };

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function uploadData() {
  for (let q of questions) {
    await db.collection("questions").add(q);
    console.log("Uploaded:", q.question);
  }
  console.log("All questions uploaded!");
}

uploadData();