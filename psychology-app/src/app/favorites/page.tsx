"use client";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Psychologist } from "@/lib/types";
import PsychologistCard from "@/components/cards/PsychologistCard";
import { useEffect, useState } from "react";
import { fetchPsychologist } from "@/lib/firebase";
import Loader from "@/components/ui/Loader";

function FavoritesPageContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoritePsychologists, setFavoritePsychologists] = useState<
    Psychologist[]
  >([]);
  const { user } = useAuth();
  const { favorites } = useFavorites();

  useEffect(() => {
    async function loadFavorites() {
      try {
        setLoading(true);
        setError(null);
        if (favorites.length === 0) {
          setFavoritePsychologists([]);
          return;
        }
        const psychologistsPromises = favorites.map((id) =>
          fetchPsychologist(id)
        );
        const data = await Promise.all(psychologistsPromises);
        const flattenedData = data.flat();
        const validPsychologists = flattenedData.filter(
          (p) => p !== null
        ) as Psychologist[];
        setFavoritePsychologists(validPsychologists);
      } catch (error) {
        console.error("Error loading favorite psychologists:", error);
        setError("Failed to load your favorite psychologists");
      } finally {
        setLoading(false);
      }
    }
    loadFavorites();
  }, [favorites]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 text-left">
      <h1 className="text-2xl font-semibold mb-4">Favorites</h1>
      {user ? (
        favorites.length > 0 ? (
          <ul>
            {favoritePsychologists.map((psychologist, index) => (
              <li key={psychologist.id || index} className="mb-4">
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
export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <FavoritesPageContent />
    </ProtectedRoute>
  );
}
