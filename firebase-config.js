// Configuration Firebase pour FNE CashFlow
// Projet: fne-cashflow

const firebaseConfig = {
  apiKey: "AIzaSyCxUa8lgCLR655NpuTYFL--5RGP75FKINw",
  authDomain: "fne-cashflow.firebaseapp.com",
  projectId: "fne-cashflow",
  storageBucket: "fne-cashflow.firebasestorage.app",
  messagingSenderId: "268100345484",
  appId: "1:268100345484:web:d4d97b7343a5dbbd1365a9",
  measurementId: "G-1YS5ZE0HGE"
};

// Initialisation Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Variables globales
let currentUser = null;

// Écouteur d'état d'authentification
auth.onAuthStateChanged((user) => {
  currentUser = user;
  
  // Redirection immédiate selon l'état
  if (!user) {
    // Pas connecté — rediriger vers login
    if (!window.location.pathname.includes('index.html')) {
      window.location.href = 'index.html';
    }
  }
});
