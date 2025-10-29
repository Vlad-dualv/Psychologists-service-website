import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  appointmentSchema,
  AppointmentFormData,
} from "@/lib/validationSchemas";
import Image from "next/image";
import Loader from "../ui/Loader";
import { Psychologist } from "@/lib/types";
import { Clock } from "lucide-react";
import { X } from "lucide-react";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  psychologist: Psychologist;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  psychologist,
}: AppointmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(appointmentSchema),
  });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  function handleClose() {
    if (isSubmitting) return;
    reset();
    setSubmitError(null);
    setSubmitSuccess(false);
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  async function onSubmit(data: AppointmentFormData) {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      console.log("Appointment data:", {
        ...data,
        psychologistId: psychologist.id,
        psychologistName: psychologist.name,
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setSubmitError("An error occurred while booking the appointment.");
    } finally {
      setIsSubmitting(false);
    }
  }
  if (!isOpen) return null;

  const timeSlots = [
    { value: "09:00", label: "09 : 00" },
    { value: "09:30", label: "09 : 30" },
    { value: "10:00", label: "10 : 00" },
    { value: "10:30", label: "10 : 30" },
    { value: "11:00", label: "11 : 00" },
    { value: "11:30", label: "11 : 30" },
    { value: "12:00", label: "12 : 00" },
    { value: "12:30", label: "12 : 30" },
    { value: "13:00", label: "13 : 00" },
    { value: "13:30", label: "13 : 30" },
    { value: "14:00", label: "14 : 00" },
    { value: "14:30", label: "14 : 30" },
    { value: "15:00", label: "15 : 00" },
    { value: "15:30", label: "15 : 30" },
    { value: "16:00", label: "16 : 00" },
    { value: "16:30", label: "16 : 30" },
    { value: "17:00", label: "17 : 00" },
    { value: "17:30", label: "17 : 30" },
    { value: "18:00", label: "18 : 00" },
    { value: "18:30", label: "18 : 30" },
    { value: "19:00", label: "19 : 00" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full mx-auto bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-brand-white py-10 md:py-16 px-6 md:px-16 rounded-[30px] w-[90%] max-w-[600px] text-left flex flex-col gap-5 md:gap-10">
        <button
          type="button"
          className="absolute top-2 right-3 md:top-5 md:right-5 cursor-pointer"
          onClick={handleClose}
        >
          <X size={32} />
        </button>
        <div className="flex flex-col gap-5">
          <h2 className="font-medium text-2xl md:text-4xl tracking-tight">
            Make an appointment with a psychologist
          </h2>
          <p className="text-brand-grey text-sm md:text-base tracking-normal leading-5">
            You are on the verge of changing your life for the better. Fill out
            the short form below to book your personal appointment with a
            professional psychologist. We guarantee confidentiality and respect
            for your privacy.
          </p>
        </div>
        <div className="flex gap-3">
          <Image
            src="https://ftp.goit.study/img/avatars/23.jpg"
            alt="Sara Davis"
            width={44}
            height={44}
          />
          <div>
            <p className="text-brand-grey font-medium text-[12px] tracking-normal">
              Your psychologist
            </p>
            <p className="font-medium text-base tracking-normal">Sara Davis</p>
          </div>
        </div>
        <form className="flex flex-col gap-2 md:gap-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full placeholder:text-black text-sm md:text-base placeholder:text-sm md:placeholder:text-base p-2 md:p-4 border border-brand-lightGrey rounded-lg"
          />
          <div>
            <input
              type="text"
              placeholder="+380"
              className="w-full placeholder:text-black text-sm md:text-base placeholder:text-sm md:placeholder:text-base p-2 md:p-4 border border-brand-lightGrey rounded-lg"
            />
            <div className="relative">
              <select
                name="meetingTime"
                id="meetingTime"
                defaultValue="00:00"
                className="appearance-none"
              >
                <option value="00:00" disabled>
                  00:00
                </option>
                <option value="title" disabled>
                  Meeting time
                </option>
                {timeSlots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
              <Clock size={20} className="absolute pointer-events-none" />
            </div>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full placeholder:text-black text-sm md:text-base placeholder:text-sm md:placeholder:text-base p-2 md:p-4 border border-brand-lightGrey rounded-lg"
          />
          <textarea
            placeholder="Comment"
            rows={3}
            className="resize-none w-full placeholder:text-black text-sm md:text-base placeholder:text-sm md:placeholder:text-base p-2 md:p-4 border border-brand-lightGrey rounded-lg"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
