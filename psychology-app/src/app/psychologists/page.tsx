"use client";

import { useState } from "react";
import PsychologistCard from "@/components/cards/PsychologistCard";
import psychologistsData from "@/data/psychologists.json";
import { Psychologist } from "@/lib/types";

type RawPsychologist = Omit<Psychologist, "id">;

// Add id to each psychologist based on their name
const psychologists: Psychologist[] = (
  psychologistsData as RawPsychologist[]
).map((psych) => ({
  ...psych,
  id: psych.name.toLowerCase().replace(/\s+/g, "-"),
}));

export default function PsychologistsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Our Psychologists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PsychologistCard />
      </div>
    </main>
  );
}
