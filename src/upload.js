import { addQuestion } from './services/firebase.js';
import localQuestions from './services/questions.js';
import localQuestions from './services/localQuestions.js';

async function uploadDataset() {
  console.log('Uploading 70 questions to Firebase...');
  for (const q of localQuestions) {
    try {
      await addQuestion(q);
      console.log(`Uploaded: ${q.question.substring(0,50)}...`);
    } catch (e) {
      console.error('Upload error:', e);
    }
  }
  console.log('Upload complete!');
}

uploadDataset().catch(console.error);


