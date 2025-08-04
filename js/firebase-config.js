// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyBe63bdjNOzmcxEw7No9wrLeHy26lNb-P0",
    authDomain: "acompanhamentotec-1fea7.firebaseapp.com",
    projectId: "acompanhamentotec-1fea7",
    storageBucket: "acompanhamentotec-1fea7.appspot.com",
    messagingSenderId: "1016001792744",
    appId: "1:1016001792744:web:00c19b7342447f0aa0d75d"
};

// Inicializar Firebase (Compat)
firebase.initializeApp(firebaseConfig);

// Firestore e Auth (via compat)
const db = firebase.firestore();
const auth = firebase.auth();
