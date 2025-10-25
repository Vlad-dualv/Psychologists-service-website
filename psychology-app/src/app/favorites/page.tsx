"use client";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Psychologist } from "@/lib/types";
import PsychologistCard from "@/components/cards/PsychologistCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "firebase/database";
import { fetchFavoritePsychologists } from "@/lib/firebase";
import Loader from "@/components/ui/Loader";

function FavoritesPageContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoritePsychologists, setFavoritePsychologists] = useState<
    Psychologist[]
  >([]);
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    async function loadFavorites() {
      try {
        setLoading(true);
        setError(null);
        if (favorites.length === 0) {
          setFavoritePsychologists([]);
          return;
        }
        const data = await fetchFavoritePsychologists(favorites);
        setFavoritePsychologists(data);
        console.log("Loaded favorite psychologists:", data);
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
      <h1 className="text-2xl font-semibold mb-4">My Favorites</h1>
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
