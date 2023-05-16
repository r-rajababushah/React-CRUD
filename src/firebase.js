import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAAxz0hZokHRALo0daiqLK62hC0YkimXpc",
    authDomain: "react-contact-8bfaf.firebaseapp.com",
    projectId: "react-contact-8bfaf",
    storageBucket: "react-contact-8bfaf.appspot.com",
    messagingSenderId: "945427223024",
    appId: "1:945427223024:web:841a6960dd51b2a3a44d35"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;