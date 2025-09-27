import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, orderByChild, limitToFirst, query, startAfter as startAfterQuery } from "firebase/database";
import { Psychologist } from "./types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export const dbRefs = {
  psychologists: () => ref(database, "psychologists"),
  psychologist: (id: string) => ref(database, `psychologists/${id}`),
  users: () => ref(database, "users"),
  user: (uid: string) => ref(database, `users/${uid}`),
  userFavorites: (uid: string) => ref(database, `users/${uid}/favorites`)
}

export const populateDatabase = async (psychologists: Psychologist[]) => {
  try {
    const psychologistsRef = dbRefs.psychologists()
    const psychologistsData : {[key: string]: Psychologist} = {}
    psychologists.forEach((psychologist) => {
      psychologistsData[psychologist.id] = psychologist
    })
    await set(psychologistsRef, psychologistsData)
    console.log('Database populated successfully!');
  } catch (error) {
    console.error("Error populating database:", error)
    throw error
  }
}

export const fetchAllPsychologists = async (): Promise<Psychologist[]> => {
  try {
    const snapshot = await get(dbRefs.psychologists())
    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.values(data)
    }
    return []
  } catch (error) {
    console.error("Error fetching psychologists:", error)
    throw error;
  }
}

export const fetchPsychologists = async (
  limit: number = 3,
  startAfter?: string
): Promise<{psychologists: Psychologist[], hasMore: boolean, lastKey?: string}> => {
  try {
    let psychologistsQuery;

    if(startAfter) {
      psychologistsQuery = query(
        dbRefs.psychologists(),
        orderByChild("name"),
        startAfterQuery(startAfter),
        limitToFirst(limit + 1),
      )
    } else {
      psychologistsQuery = query(
        dbRefs.psychologists(),
        orderByChild("name"),
        limitToFirst(limit + 1)
      )
    }
    const snapshot = await get(psychologistsQuery)
    if (snapshot.exists()) {
      const data = snapshot.val()
      const psychologists: Psychologist[] = Object.entries(data).map(([id, psychologist]: [string, any]) => ({
        ...psychologist,
        id
      }))
      const hasMore = psychologists.length > limit;
      const resultPsychologists = hasMore ? psychologists.slice(0, limit): psychologists;
      const lastKey = hasMore ? psychologists[limit - 1].id : undefined;

      return {
        psychologists: resultPsychologists,
        hasMore,
        lastKey
      }
    }
    return {psychologists: [], hasMore: false}
  } catch (error) {
    console.error("Error fetching sorted psychologists:", error)
    throw error
  }
}

export const fetchPsychologist = async (id: string): Promise<Psychologist | null> => {
  try {
    const snapshot = await get(dbRefs.psychologist(id))
    if (snapshot.exists()) {
      return {...snapshot.val(), id}
    }
    return null;
  } catch (error) {
    console.error("Error fetching psychologist:", error)
    throw error;
  }
}

export default app;
