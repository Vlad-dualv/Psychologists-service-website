"use client";

import { useState, useEffect, Fragment } from "react";
import PsychologistCard from "@/components/cards/PsychologistCard";
import { Psychologist, SortOption } from "@/lib/types";
import { fetchAllPsychologists } from "@/lib/firebase";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { set } from "firebase/database";

export default function PsychologistsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allPsychologists, setAllPsychologists] = useState<Psychologist[]>([]);
  const [itemsToShow, setItemsToShow] = useState<number>(3);
  const [displayedPsychologists, setDisplayedPsychologists] = useState<
    Psychologist[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState("A to Z");
  const [sortBy, setSortBy] = useState<SortOption>("show-all");

  // Fetch psychologists on component mount

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

  // Sort and paginate psychologists

  useEffect(() => {
    if (allPsychologists.length === 0) return;
    const sorted = [...allPsychologists].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price_per_hour - b.price_per_hour;
        case "price-desc":
          return b.price_per_hour - a.price_per_hour;
        case "rating-asc":
          return a.rating - b.rating;
        case "rating-desc":
          return b.rating - a.rating;
        case "show-all":
          return 0;
        default:
          return 0;
      }
    });
    setDisplayedPsychologists(sorted.slice(0, itemsToShow));
  }, [sortBy, allPsychologists, itemsToShow]);

  function handleLoadMore() {
    setItemsToShow((prev) => prev + 3);
  }

  function handleFilterSelect(filterValue: string, filterLabel: string) {
    setSelectedFilter(filterLabel);
    if (filterValue === "show-all") {
      setItemsToShow(allPsychologists.length);
    } else {
      setSortBy(filterValue as SortOption);
      setItemsToShow(3);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 text-left">
      <div className="mt-2 md:mt-8 mb-8">
        <label
          htmlFor="sort"
          className="flex flex-col gap-2 text-sm font-medium tracking-normal text-brand-grey"
        >
          Filters
        </label>
        <Menu>
          {({ open }) => (
            <>
              <MenuButton className="flex justify-between items-center px-4 py-3  md:py-[14px] bg-brand-green hover:bg-brand-green-hover text-[rgba(251,251,251,1)] font-medium tracking-normal rounded-[14px] shadow border w-[226px] text-left transition duration-300 ease-in-out">
                {selectedFilter}
                {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </MenuButton>
              <MenuItems
                transition
                className="absolute z-10 mt-2 bg-white rounded-[14px] shadow w-[226px]"
              >
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        focus ? "text-black" : "text-brand-grey"
                      }`}
                      onClick={() => handleFilterSelect("name-asc", "A to Z")}
                    >
                      A to Z
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        focus ? "text-black" : "text-brand-grey"
                      }`}
                      onClick={() => handleFilterSelect("name-desc", "Z to A")}
                    >
                      Z to A
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        focus ? "text-black" : "text-brand-grey"
                      }`}
                      onClick={() =>
                        handleFilterSelect("price-asc", "Price (Low to High)")
                      }
                    >
                      Price (Low to High)
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        focus ? "text-black" : "text-brand-grey"
                      }`}
                      onClick={() =>
                        handleFilterSelect("price-desc", "Price (High to Low)")
                      }
                    >
                      Price (High to Low)
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        focus ? "text-black" : "text-brand-grey"
                      }`}
                      onClick={() =>
                        handleFilterSelect("rating-desc", "Popular")
                      }
                    >
                      Popular
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        focus ? "text-black" : "text-brand-grey"
                      }`}
                      onClick={() =>
                        handleFilterSelect("rating-asc", "Not popular")
                      }
                    >
                      Not popular
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        focus ? "text-black" : "text-brand-grey"
                      }`}
                      onClick={() => handleFilterSelect("show-all", "Show All")}
                    >
                      Show All
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </>
          )}
        </Menu>
      </div>
      <ul className="mb-16">
        {displayedPsychologists.map((psychologist) => (
          <li key={psychologist.about} className="mb-8">
            <PsychologistCard psychologist={psychologist} />
          </li>
        ))}
      </ul>
      {displayedPsychologists.length < allPsychologists.length && (
        <button
          type="button"
          onClick={handleLoadMore}
          className={`mx-auto block text-[rgba(243,243,243,1)] border bg-brand-green rounded-[30px] font-medium py-3 md:py-[14px] hover:bg-brand-green-hover transition duration-300 ease-in-out w-[176px] ${
            displayedPsychologists.length >= allPsychologists.length || loading
              ? "hidden"
              : ""
          }`}
        >
          Load More
        </button>
      )}
    </section>
  );
}
