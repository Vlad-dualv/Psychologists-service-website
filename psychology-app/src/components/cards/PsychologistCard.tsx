"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Psychologist } from "@/lib/types";

interface PsychologistCardProps {
  psychologist: Psychologist;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onMakeAppointment: (psychologist: Psychologist) => void;
  isAuthenticated: boolean;
}

export default function PsychologistCard({
  psychologist,
  isFavorite,
  onToggleFavorite,
  onMakeAppointment,
  isAuthenticated,
}: PsychologistCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      alert("Please log in to add psychologists to favorites.");
      return;
    } else {
      onToggleFavorite(psychologist.id);
    }
  };
  return (
    <div>
      <div>
        <Image width={100} height={100} />
      </div>
    </div>
  );
}
