/**
 * SEED SCRIPT: Mark a user as Admin
 * Run this from a secure terminal using Firebase Admin SDK
 * 
 * Usage: 
 * 1. Replace 'TARGET_UID' with the user's UID from Firebase Auth
 * 2. Run with node
 */

/*
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function makeAdmin(uid) {
  await db.collection('admins').doc(uid).set({
    name: 'Master Admin',
    email: 'admin@kirtelectronic.com',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  console.log(`User ${uid} promoted to Admin status.`);
}

makeAdmin('TARGET_UID');
*/

console.log("Seed script template created. Review /src/scripts/makeAdmin.js for implementation.");
