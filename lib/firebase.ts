import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDSRfgnqcL0e6gPB2wRmWREY1zCf-P6zVQ",
    authDomain: "afzal-yousaf-78551.firebaseapp.com",
    databaseURL: "https://afzal-yousaf-78551-default-rtdb.firebaseio.com",
    projectId: "afzal-yousaf-78551",
    storageBucket: "afzal-yousaf-78551.firebasestorage.app",
    messagingSenderId: "688986460815",
    appId: "1:688986460815:web:f7497e98ac8d320a0d96fa",
    measurementId: "G-5W5RWV5PKW"
};

// Initialize Firebase securely to avoid multiple app initializations
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);
const storage = getStorage(app);

export { app, db, storage };
