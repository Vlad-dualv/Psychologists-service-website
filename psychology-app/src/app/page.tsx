"use client";
//import Image from "next/image";
import { useEffect } from "react";
import { auth, database } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export default function Home() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("Firebase Auth:", auth);
        console.log("Firebase Database:", database);

        const dbRef = ref(database, "/psychologists");
        const snapshot = await get(dbRef);
        console.log("Psychologists data:", snapshot.val()); // Will be null if empty, but no error
        console.log("Database connection: SUCCESS");
      } catch (error) {
        console.error("Firebase connection error:", error);
      }
    };
    testConnection();
  }, []);

  return (
    <main>
      <h1>Psychology Services</h1>
      <p>Check the console</p>
    </main>
  );
}
