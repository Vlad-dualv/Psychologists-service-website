"use client";

import { useState, useEffect, Fragment } from "react";
import PsychologistCard from "@/components/cards/PsychologistCard";
import { Psychologist } from "@/lib/types";
import { fetchAllPsychologists } from "@/lib/firebase";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      <button
        type="button"
        className="mx-auto block text-[rgba(243,243,243,1)] border bg-brand-green rounded-[30px] font-medium py-3 md:py-[14px] hover:bg-brand-green-hover transition duration-300 ease-in-out w-[176px]"
      >
        Load More
      </button>
    </section>
  );
}
