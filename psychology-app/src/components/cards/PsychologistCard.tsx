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

  const imageUrl = "https://ftp.goit.study/img/avatars/23.jpg";

  return (
    <div className="bg-white rounded-[30px] p-6 flex flex-col md:flex-row gap-4 md:gap-6 tracking-normal">
      <div>
        <div className="relative">
          <Image
            src={imageUrl}
            alt="Psychologist Avatar"
            width={96}
            height={96}
            className="border-2 border-[rgba(84,190,150,0.2)] rounded-[15px] p-2"
          />
          <div className="bg-[rgba(56,205,62,1)] w-[10px] h-[10px] rounded-full absolute top-2 left-20 border-2 border-white"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-gray-500 font-medium">Psychologist</p>
          <div className="flex items-center gap-1">
            <Star size={16} />
            <p>Rating: 4.75</p>
          </div>
          <div>
            <p>
              Price / 1 hour:{" "}
              <span className="text-[rgba(56,205,62,1)]">120$</span>
            </p>
          </div>
          <Heart size={23} />
        </div>
        <h3>Dr. Sarah Davis</h3>
        <div>
          <p className="text-gray-500">
            Experience: <span className="text-black">12 years</span>
          </p>
          <p className="text-gray-500">
            Licence:{" "}
            <span className="text-black">
              Licensed Psychologist (Licence #67890)
            </span>
          </p>
          <p className="text-gray-500">
            Specialization:{" "}
            <span className="text-black">Cognitive Behavioral Therapy</span>
          </p>
          <p className="text-gray-500">
            Initial consultation:{" "}
            <span className="text-black">
              Free 45-minute initial consultation
            </span>
          </p>
        </div>
        <p className="text-gray-400">
          Dr. Sarah Davis is a highly experienced and licensed psychologist
          specializing in Depression and Mood Disorders. With 12 years of
          practice, she has helped numerous individuals overcome their
          depression and regain control of their lives. Dr. Davis is known for
          her empathetic and understanding approach to therapy, making her
          clients feel comfortable and supported throughout their journey to
          better mental health.
        </p>
        <button type="button" className="underline">
          Read more
        </button>
      </div>
    </div>
  );
}
