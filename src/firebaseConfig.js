import { initializeApp } from "firebase/app"
import { connectAuthEmulator, getAuth } from "firebase/auth"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
  console.log("CONNECT AS DEV")
  const authUrl = import.meta.env.VITE_USE_AUTH_EMULATOR_URL
  connectAuthEmulator(auth, authUrl)
  const firestoreHost = import.meta.env.VITE_USE_FIRESTORE_EMULATOR_HOST
  const firestorePort = parseInt(import.meta.env.VITE_USE_FIRESTORE_EMULATOR_PORT)
  connectFirestoreEmulator(db, firestoreHost, firestorePort)
}

export { auth, db }
