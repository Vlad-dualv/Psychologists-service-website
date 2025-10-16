"use client";

import { useState, useEffect } from "react";
import PsychologistCard from "@/components/cards/PsychologistCard";
import { Psychologist } from "@/lib/types";
import { fetchAllPsychologists } from "@/lib/firebase";

export default function PsychologistsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allPsychologists, setAllPsychologists] = useState<Psychologist[]>([]);
  const [itemsToShow, setItemsToShow] = useState<number>(3);
  const [displayedPsychologists, setDisplayedPsychologists] = useState<
    Psychologist[]
  >([]);

  useEffect(() => {
    async function loadPsychologists() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllPsychologists();
        setAllPsychologists(data);
      } catch (error) {
        console.error("Failed to load psychologists:", error);
        setError("Failed to load psychologists. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadPsychologists();
  }, []);

  useEffect(() => {
    {
    }
    setDisplayedPsychologists(allPsychologists.slice(0, itemsToShow));
  }, [allPsychologists, itemsToShow]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 text-left">
      <div className="mt-2 md:mt-16 mb-8">
        <label
          htmlFor="sort"
          className="flex flex-col gap-2 text-sm font-medium tracking-normal text-brand-grey"
        >
          Filters
        </label>
        <select
          name="sort"
          id="sort"
          className="text-[rgba(251,251,251,1)] bg-[rgba(255,255,255,1)] font-medium tracking-normal;
"
        >
          <option value="name-asc" className="">
            A to Z
          </option>
          <option
            value="name-desc"
            className="text-[rgba(25,26,21,0.3);
]"
          >
            Z to A
          </option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="rating-asc">Popular</option>
          <option value="rating-desc">Not popular</option>
          <option value="">Show All</option>
        </select>
      </div>
      <ul className="mb-16">
        {displayedPsychologists.map((psychologist) => (
          <li key={psychologist.about} className="mb-8">
            <PsychologistCard psychologist={psychologist} />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mx-auto block text-[rgba(243,243,243,1)] border bg-brand-green rounded-[30px] font-medium py-3 md:py-[14px] hover:bg-brand-green-hover transition duration-300 ease-in-out w-[176px]"
      >
        Load More
      </button>
    </section>
  );
}
