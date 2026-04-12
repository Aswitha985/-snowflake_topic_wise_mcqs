const admin = require("firebase-admin");
const serviceAccount = require("./src/services/serviceAccountKey.json");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./src/services/questions.json", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadData() {
  try {
    console.log(`Uploading ${data.length} questions...`);
    
    // Clear existing
    const snapshot = await db.collection("questions").get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    
    // Upload new with batches
    const uploadBatch = db.batch();
    let count = 0;
    for (const item of data) {
      const docRef = db.collection("questions").doc(item.id.toString());
      uploadBatch.set(docRef, item);
      count++;
      if (count === 500) {
        await uploadBatch.commit();
        console.log('Batch committed');
        count = 0;
        uploadBatch = db.batch();
      }
    }
    if (count > 0) {
      await uploadBatch.commit();
    }
    
    console.log("✅ All questions uploaded to Firestore!");
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

uploadData();
