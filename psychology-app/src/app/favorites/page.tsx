"use client";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Psychologist } from "@/lib/types";
import PsychologistCard from "@/components/cards/PsychologistCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoritePsychologists, setFavoritePsychologists] = useState<
    Psychologist[]
  >([]);
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 text-left">
      <h1 className="text-2xl font-semibold mb-4">My Favorites</h1>
      {user ? (
        favorites.length > 0 ? (
          <ul>
            {favorites.map((psychologist) => (
              <li key={psychologist.about} className="mb-4">
                <PsychologistCard psychologist={psychologist} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No favorites found</p>
        )
      ) : (
        <p className="text-gray-500">Please log in to see your favorites</p>
      )}
    </section>
  );
}
