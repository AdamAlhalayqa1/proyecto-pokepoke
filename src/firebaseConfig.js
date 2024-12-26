import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqDSJvhOdogxugyYHZUv2PDVdAzLO4BUc",
  authDomain: "pokepoke-81942.firebaseapp.com",
  projectId: "pokepoke-81942",
  storageBucket: "pokepoke-81942.firebasestorage.app",
  messagingSenderId: "484398784097",
  appId: "1:484398784097:web:98b93c1a2c3e48abd61420",
  measurementId: "G-KPL4NFLX23"
};

// Inicializar Firebase solo si no hay una instancia existente
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exportar Auth para otros componentes
export const auth = getAuth(app);
