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
    <div className="bg-white rounded-[30px] p-6 flex flex-col md:flex-row gap-4 md:gap-6 tracking-normal max-md:text-sm relative">
      <div className="flex-shrink-0">
        <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
          <Image
            src={imageUrl}
            alt="Psychologist Avatar"
            fill
            sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
            className="border-2 border-[rgba(84,190,150,0.2)] rounded-[15px] p-2 object-cover"
          />
          <div className="bg-[rgba(56,205,62,1)] w-[10px] h-[10px] md:w-[12px] md:h-[12px] lg:w-[14px] lg:h-[14px] rounded-full absolute top-2 right-2 border-2 border-white"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:gap-6 items-start">
        <div className="font-medium md:flex items-start gap-32">
          <p className="text-gray-500 mb-2">Psychologist</p>
          <div className="flex">
            <div className="flex items-center gap-1 border-r-2 border-gray-200 pr-2">
              <Star size={16} className="fill-brand-yellow text-transparent" />
              <p>Rating: 4.75</p>
            </div>
            <div className="pl-2">
              <p>
                Price / 1 hour:{" "}
                <span className="text-[rgba(56,205,62,1)]">120$</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            className={`absolute top-4 right-4 ${
              isFavorite ? "fill-inherit" : "fill-brand-green"
            }`}
            onClick={handleFavoriteClick}
          >
            <Heart size={23} />
          </button>
        </div>
        <h3 className="text-lg font-medium">Dr. Sarah Davis</h3>
        <div className="font-medium flex flex-wrap gap-1">
          <p className="inline-block text-gray-500 bg-[rgba(243,243,243,1)] py-2 px-4 rounded-[24px]">
            Experience: <span className="text-black">12 years</span>
          </p>
          <p className="inline-block text-gray-500 bg-[rgba(243,243,243,1)] py-2 px-4 rounded-[24px]">
            Licence:{" "}
            <span className="text-black">
              Licensed Psychologist (Licence #67890)
            </span>
          </p>
          <p className="inline-block text-gray-500 bg-[rgba(243,243,243,1)] py-2 px-4 rounded-[24px]">
            Specialization:{" "}
            <span className="text-black">Cognitive Behavioral Therapy</span>
          </p>
          <p className="inline-block text-gray-500 bg-[rgba(243,243,243,1)] py-2 px-4 rounded-[24px]">
            Initial consultation:{" "}
            <span className="text-black">
              Free 45-minute initial consultation
            </span>
          </p>
        </div>
        <p className="max-md:hidden text-gray-400 text-sm">
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
