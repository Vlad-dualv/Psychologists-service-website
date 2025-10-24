"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Psychologist } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";

interface PsychologistCardProps {
  psychologist: Psychologist;
  onMakeAppointment?: (psychologist: Psychologist) => void;
}

export default function PsychologistCard({
  psychologist,
  onMakeAppointment,
}: PsychologistCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      alert("Please log in to add psychologists to favorites.");
      return;
    } else {
      toggleFavorite(psychologist.id);
    }
  };

  const favorite = isFavorite(psychologist.id);

  return (
    <div className="bg-white rounded-[30px] p-6 flex flex-col md:flex-row gap-4 md:gap-6 tracking-normal max-md:text-sm relative">
      <div className="flex-shrink-0">
        <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
          <Image
            src={psychologist.avatar_url}
            alt="Psychologist Avatar"
            fill
            sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
            className="border-2 border-[rgba(84,190,150,0.2)] rounded-[15px] p-2 object-cover"
          />
          <div className="bg-[rgba(56,205,62,1)] w-[10px] h-[10px] md:w-[12px] md:h-[12px] lg:w-[14px] lg:h-[14px] rounded-full absolute top-2 right-2 border-2 border-white"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:gap-6 items-start">
        <div className="font-medium md:flex items-start gap-32 xl:gap-[600px]">
          <p className="text-gray-500 mb-2">Psychologist</p>
          <div className="flex">
            <div className="flex items-center gap-1 border-r-2 border-gray-200 pr-2">
              <Star size={16} className="fill-brand-yellow text-transparent" />
              <p>Rating: {psychologist.rating.toFixed(2)}</p>
            </div>
            <div className="pl-2">
              <p>
                Price / 1 hour:{" "}
                <span className="text-[rgba(56,205,62,1)]">
                  {formatPrice(psychologist.price_per_hour)}
                </span>
              </p>
            </div>
          </div>
          <button
            type="button"
            className={`absolute top-4 right-4 ${
              favorite ? "fill-inherit" : "fill-brand-green"
            }`}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            onClick={handleFavoriteClick}
          >
            <Heart
              size={23}
              className={`transition-colors ${
                favorite ? "fill-brand-green text-brand-green" : "text-black"
              }`}
            />
          </button>
        </div>
        <h3 className="text-lg font-medium">{psychologist.name}</h3>
        <div className="font-medium flex flex-wrap gap-1">
          <p className="inline-block text-gray-500 bg-[rgba(243,243,243,1)] py-2 px-4 rounded-[24px]">
            Experience:{" "}
            <span className="text-black">{psychologist.experience}</span>
          </p>
          <p className="inline-block text-gray-500 bg-[rgba(243,243,243,1)] py-2 px-4 rounded-[24px]">
            Licence:{" "}
            <span className="text-black">
              Licensed Psychologist (Licence #67890)
            </span>
          </p>
          <p className="inline-block text-gray-500 bg-[rgba(243,243,243,1)] py-2 px-4 rounded-[24px]">
            Specialization:{" "}
            <span className="text-black">{psychologist.specialization}</span>
          </p>
          <p className="inline-block text-gray-500 bg-[rgba(243,243,243,1)] py-2 px-4 rounded-[24px]">
            Initial consultation:{" "}
            <span className="text-black">
              {psychologist.initial_consultation}
            </span>
          </p>
        </div>
        <button
          type="button"
          className="underline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
        {isExpanded && (
          <div className="flex flex-col gap-10">
            <p className="text-gray-400 text-sm md:text-base mb-[8px]">
              {psychologist.about}
            </p>
            <ul className="flex flex-col gap-6">
              {psychologist.reviews.map((review, index) => (
                <li key={index}>
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="text-brand-green bg-[rgba(84,190,150,0.2)] border rounded-full font-medium text-xl w-[44px] h-[44px] flex items-center justify-center">
                        {review.reviewer ? review.reviewer.charAt(0) : "?"}
                      </div>
                      <div>
                        <p className="font-medium">{review.reviewer}</p>
                        <div className="flex items-center gap-2 mb-[18px]">
                          <Star
                            size={16}
                            className="fill-brand-yellow text-transparent"
                          />
                          <p className="font-medium text-sm">{review.rating}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">
                      {review.comment}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="text-white border bg-brand-green rounded-[30px] font-medium px-6 md:px-8 py-3 md:py-[14px] hover:bg-brand-green-hover transition duration-300 ease-in-out max-w-[270px]"
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
