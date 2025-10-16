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
          <MenuButton className="flex justify-between bg-brand-green hover:bg-brand-green-hover text-[rgba(251,251,251,1)] font-medium tracking-normal rounded-[14px] shadow border w-[226px] text-left p-2 xl:p-4 transition duration-300 ease-in-out">
            A to Z
            <ChevronDown size={20} />
          </MenuButton>
          <MenuItems
            transition
            className="fixed z-10 mt-2 bg-white rounded-[14px] shadow w-[226px]"
          >
            <MenuItem>
              <button
                className="w-full px-4 py-2 text-left text-brand-grey hover:text-black"
                value="name-asc"
              >
                A to Z
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="w-full px-4 py-2 text-left text-brand-grey hover:text-black"
                value="name-desc"
              >
                Z to A
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="w-full px-4 py-2 text-left text-brand-grey hover:text-black"
                value="price-asc"
              >
                Price (Low to High)
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="w-full px-4 py-2 text-left text-brand-grey hover:text-black"
                value="name-desc"
              >
                Price (High to Low)
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="w-full px-4 py-2 text-left text-brand-grey hover:text-black"
                value="rating-asc"
              >
                Popular
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="w-full px-4 py-2 text-left text-brand-grey hover:text-black"
                value="rating-desc"
              >
                Not popular
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="w-full px-4 py-2 text-left text-brand-grey hover:text-black"
                value="show-all"
              >
                Show All
              </button>
            </MenuItem>
          </MenuItems>
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
