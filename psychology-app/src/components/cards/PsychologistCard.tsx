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
    <div className="bg-white rounded-3xl">
      <div>
        <Image width={100} height={100} />
        <div>
          <div>
            <p>Psychologist</p>
            <Star />
            <p>Rating: 4.75</p>
            <p>
              Price/1 hour: <span>120$</span>
            </p>
            <Heart />
          </div>
          <h3>Dr. Sarah Davis</h3>
          <div>
            <p>
              Experience: <span>12 years</span>
            </p>
            <p>
              Licence: <span>Licensed Psychologist (Licence #67890)</span>
            </p>
            <p>
              Specialization: <span>Cognitive Behavioral Therapy</span>
            </p>
            <p>
              Initial consultation:
              <span>Free 45-minute initial consultation</span>
            </p>
          </div>
          <p>
            Dr. Sarah Davis is a highly experienced and licensed psychologist
            specializing in Depression and Mood Disorders. With 12 years of
            practice, she has helped numerous individuals overcome their
            depression and regain control of their lives. Dr. Davis is known for
            her empathetic and understanding approach to therapy, making her
            clients feel comfortable and supported throughout their journey to
            better mental health.
          </p>
          <button type="button">Read more</button>
        </div>
      </div>
    </div>
  );
}
