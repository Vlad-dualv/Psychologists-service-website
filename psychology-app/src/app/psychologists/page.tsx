"use client";

import { useState } from "react";
import PsychologistCard from "@/components/cards/PsychologistCard";
import { Psychologist } from "@/lib/types";

export default function PsychologistsPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div>
        <PsychologistCard />
      </div>
    </section>
  );
}
