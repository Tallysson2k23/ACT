// Importações corretas
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBe63bdjNOzmcxEw7No9wrLeHy26lNb-P0",
  authDomain: "acompanhamentotec-1fea7.firebaseapp.com",
  projectId: "acompanhamentotec-1fea7",
  storageBucket: "acompanhamentotec-1fea7.appspot.com",
  messagingSenderId: "1016001792744",
  appId: "1:1016001792744:web:00c19b7342447f0aa0d75d"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Firestore e Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Agora você pode usar "db" e "auth" no resto do seu código
export { db, auth };
