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

  return (
    <div>
      <div>
        <div>
          <h2>Make an appointment with a psychologist</h2>
          <p>
            You are on the verge of changing your life for the better. Fill out
            the short form below to book your personal appointment with a
            professional psychologist. We guarantee confidentiality and respect
            for your privacy.
          </p>
        </div>
        <div>
          <Image src={psychologist.avatar_url} alt={psychologist.name} />
          <div>
            <p>Your psychologist</p>
            <p>{psychologist.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
