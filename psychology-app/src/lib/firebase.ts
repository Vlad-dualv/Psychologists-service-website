import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  get,
  remove,
  set,
  orderByChild,
  limitToFirst,
  query,
  startAfter as startAfterQuery,
} from "firebase/database";
import { Psychologist, UserProfile } from "./types";

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
  userFavorites: (uid: string) => ref(database, `users/${uid}/favorites`),
};

export const populateDatabase = async (psychologists: Psychologist[]) => {
  try {
    const psychologistsRef = dbRefs.psychologists();
    const psychologistsData: { [key: string]: Psychologist } = {};
    psychologists.forEach((psychologist) => {
      psychologistsData[psychologist.id] = psychologist;
    });
    await set(psychologistsRef, psychologistsData);
    console.log("Database populated successfully!");
  } catch (error) {
    console.error("Error populating database:", error);
    throw error;
  }
};

export const fetchAllPsychologists = async (): Promise<Psychologist[]> => {
  try {
    const snapshot = await get(dbRefs.psychologists());
    if (snapshot.exists()) {
      const data = snapshot.val() as Record<string, Omit<Psychologist, "id">>;
      return Object.entries(data).map(([id, p]) => ({ ...p, id }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching psychologists:", error);
    throw error;
  }
};

export const fetchPsychologists = async (
  limit: number = 3,
  startAfter?: string
): Promise<{
  psychologists: Psychologist[];
  hasMore: boolean;
  lastKey?: string;
}> => {
  try {
    let psychologistsQuery;

    if (startAfter) {
      psychologistsQuery = query(
        dbRefs.psychologists(),
        orderByChild("name"),
        startAfterQuery(startAfter),
        limitToFirst(limit + 1)
      );
    } else {
      psychologistsQuery = query(
        dbRefs.psychologists(),
        orderByChild("name"),
        limitToFirst(limit + 1)
      );
    }
    const snapshot = await get(psychologistsQuery);
    if (snapshot.exists()) {
      const data = snapshot.val() as Record<string, Omit<Psychologist, "id">>;
      const psychologists: Psychologist[] = Object.entries(data).map(
        ([id, psychologist]) => ({
          ...psychologist,
          id,
        })
      );
      const hasMore = psychologists.length > limit;
      const resultPsychologists = hasMore
        ? psychologists.slice(0, limit)
        : psychologists;
      const lastKey = hasMore ? psychologists[limit - 1].id : undefined;

      return {
        psychologists: resultPsychologists,
        hasMore,
        lastKey,
      };
    }
    return { psychologists: [], hasMore: false };
  } catch (error) {
    console.error("Error fetching sorted psychologists:", error);
    throw error;
  }
};

export const fetchSortedPsychologists = async (
  sortBy: "name" | "price_per_hour" | "rating",
  order: "asc" | "desc" = "asc",
  limit: number = 3,
  startAfter?: string
): Promise<{
  psychologists: Psychologist[];
  hasMore: boolean;
  lastKey?: string;
}> => {
  try {
    const snapshot = await get(dbRefs.psychologists());

    if (snapshot.exists()) {
      const data = snapshot.val() as Record<string, Omit<Psychologist, "id">>;
      const psychologists: Psychologist[] = Object.entries(data).map(
        ([id, psychologist]) => ({
          ...psychologist,
          id,
        })
      );

      // Sort psychologists
      psychologists.sort((a, b) => {
        let valueA, valueB;

        switch (sortBy) {
          case "name":
            valueA = a.name.toLowerCase();
            valueB = b.name.toLowerCase();
            break;
          case "price_per_hour":
            valueA = a.price_per_hour;
            valueB = b.price_per_hour;
            break;
          case "rating":
            valueA = a.rating;
            valueB = b.rating;
            break;
          default:
            valueA = a.name.toLowerCase();
            valueB = b.name.toLowerCase();
        }

        if (order === "asc") {
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
      });

      // Handle pagination
      const startIndex = startAfter
        ? psychologists.findIndex((p) => p.id === startAfter) + 1
        : 0;
      const endIndex = startIndex + limit;
      const paginatedPsychologists = psychologists.slice(startIndex, endIndex);
      const hasMore = endIndex < psychologists.length;
      const lastKey =
        hasMore && paginatedPsychologists.length > 0
          ? paginatedPsychologists[paginatedPsychologists.length - 1].id
          : undefined;

      return {
        psychologists: paginatedPsychologists,
        hasMore,
        lastKey,
      };
    }

    return { psychologists: [], hasMore: false };
  } catch (error) {
    console.error("Error fetching sorted psychologists:", error);
    throw error;
  }
};

export const fetchPsychologist = async (
  id: string
): Promise<Psychologist | null> => {
  try {
    const snapshot = await get(dbRefs.psychologist(id));
    if (snapshot.exists()) {
      return { ...snapshot.val(), id };
    }
    return null;
  } catch (error) {
    console.error("Error fetching psychologist:", error);
    throw error;
  }
};

export const addToFavorites = async (
  userId: string,
  psychologistId: string
): Promise<void> => {
  try {
    const userFavoritesRef = ref(
      database,
      `users/${userId}/favorites/${psychologistId}`
    );
    await set(userFavoritesRef, true);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

export const removeFromFavorites = async (
  userId: string,
  psychologistId: string
): Promise<void> => {
  try {
    const userFavoriteRef = ref(
      database,
      `users/${userId}/favorites/${psychologistId}`
    );
    await remove(userFavoriteRef);
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

export const fetchUserFavorites = async (userId: string): Promise<string[]> => {
  try {
    const snapshot = await get(dbRefs.userFavorites(userId));
    if (snapshot.exists()) {
      return Object.keys(snapshot.val());
    }
    return [];
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    throw error;
  }
};

export const fetchFavoritePsychologists = async (
  userId: string
): Promise<Psychologist[]> => {
  try {
    const favoriteIds = await fetchUserFavorites(userId);
    if (favoriteIds.length === 0) return [];

    const favorites: Psychologist[] = [];
    for (const id of favoriteIds) {
      const psychologist = await fetchPsychologist(id);
      if (psychologist) {
        favorites.push(psychologist);
      }
    }

    return favorites;
  } catch (error) {
    console.error("Error fetching favorite psychologists:", error);
    throw error;
  }
};

// Create or update user profile
export const createUserProfile = async (user: UserProfile): Promise<void> => {
  try {
    const userRef = dbRefs.user(user.uid);
    await set(userRef, {
      email: user.email,
      name: user.name,
      favorites: user.favorites || {},
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const fetchUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  try {
    const snapshot = await get(dbRefs.user(uid));
    if (snapshot.exists()) {
      const userData = snapshot.val();
      return {
        uid,
        email: userData.email,
        name: userData.name,
        favorites: userData.favorites ? Object.keys(userData.favorites) : [],
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export default app;
