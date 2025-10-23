"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { localStorageUtils } from "@/lib/utils";
import { Psychologist } from "@/lib/types";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (PsychologistId: string) => void;
  removeFavorite: (PsychologistId: string) => void;
  isFavorite: (PsychologistId: string) => void;
  toggleFavorite: (PsychologistId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {}, []);

  return <div>ComponentName-component</div>;
}
