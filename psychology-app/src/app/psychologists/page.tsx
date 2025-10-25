"use client";

import { useState, useEffect, Fragment } from "react";
import PsychologistCard from "@/components/cards/PsychologistCard";
import { Psychologist, SortOption } from "@/lib/types";
import { fetchAllPsychologists } from "@/lib/firebase";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Loader from "@/components/ui/Loader";

export default function PsychologistsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      {/* ===== Filters ===== */}
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
              <MenuButton className="flex justify-between items-center px-3 py-2 xl:py-[14px] bg-brand-green hover:bg-brand-green-hover text-white font-medium tracking-normal rounded-[14px] shadow border w-[226px] text-left transition duration-300 ease-in-out">
                {selectedFilter}
                {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </MenuButton>
              <MenuItems
                transition
                className="absolute z-10 mt-2 bg-white rounded-[14px] shadow w-[226px]"
              >
                {[
                  { value: "name-asc", label: "A to Z" },
                  { value: "name-desc", label: "Z to A" },
                  { value: "price-asc", label: "Price (Low to High)" },
                  { value: "price-desc", label: "Price (High to Low)" },
                  { value: "rating-desc", label: "Popular" },
                  { value: "rating-asc", label: "Not popular" },
                  { value: "show-all", label: "Show All" },
                ].map((filter) => (
                  <MenuItem key={filter.value}>
                    {({ focus }) => (
                      <button
                        className={`w-full px-4 py-2 text-left transition-colors ${
                          focus ? "text-black" : "text-brand-grey"
                        }`}
                        onClick={() =>
                          handleFilterSelect(filter.value, filter.label)
                        }
                      >
                        {filter.label}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </>
          )}
        </Menu>
      </div>

      {/* ===== Main Content ===== */}
      {loading ? (
        // Loader while fetching
        <div className="flex justify-center items-center py-20">
          <Loader />
          {/* Alternatively:
        <RingLoader color="#36d7b7" size={80} />
        */}
        </div>
      ) : error ? (
        // Error state
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : displayedPsychologists.length > 0 ? (
        // Psychologist list
        <>
          <ul className="mb-16">
            {displayedPsychologists.map((psychologist) => (
              <li key={psychologist.about} className="mb-8">
                <PsychologistCard psychologist={psychologist} />
              </li>
            ))}
          </ul>

          {/* Load More Button */}
          {displayedPsychologists.length < allPsychologists.length && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="mx-auto block text-white bg-brand-green rounded-[30px] font-medium py-3 md:py-[14px] hover:bg-brand-green-hover transition duration-300 ease-in-out w-[176px] shadow-md hover:shadow-lg"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        // Empty state (only if not loading and no data)
        <div className="text-center py-12">
          <p className="text-gray-500">No psychologists found</p>
        </div>
      )}
    </section>
  );
}
