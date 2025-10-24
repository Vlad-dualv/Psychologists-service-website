"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { localStorageUtils } from "@/lib/utils";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (psychologistId: string) => void;
  removeFavorite: (psychologistId: string) => void;
  isFavorite: (psychologistId: string) => void;
  toggleFavorite: (psychologistId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const savedFavorites = localStorageUtils.getFavorites();
    setFavorites(savedFavorites);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorageUtils.saveFavorites(favorites);
    }
  }, [favorites, isLoaded]);

  const addFavorite = (psychologistId: string) => {
    setFavorites((prev) => {
      if (prev.includes(psychologistId)) return prev;
      return [...prev, psychologistId];
    });
  };

  const removeFavorite = (psychologistId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== psychologistId));
  };

  const isFavorite = (psychologistId: string) => {
    return favorites.includes(psychologistId);
  };

  const toggleFavorite = (psychologistId: string) => {
    if (isFavorite(psychologistId)) {
      removeFavorite(psychologistId);
    } else {
      addFavorite(psychologistId);
    }
  };

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
