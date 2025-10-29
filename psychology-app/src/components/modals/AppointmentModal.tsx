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
  /*
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
  */

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
          <Image
            src="https://ftp.goit.study/img/avatars/23.jpg"
            alt="Sara Davis"
            width={44}
            height={44}
          />
          <div>
            <p>Your psychologist</p>
            <p>Sara Davis</p>
          </div>
          <form>
            <input type="text" placeholder="Name" />
            <div>
              <input type="text" placeholder="+380" />
              <div className="relative">
                <select
                  name="meetingTime"
                  id="meetingTime"
                  defaultValue="00:00"
                  className="appearance-none"
                >
                  <option value="00:00" disabled></option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
                <Clock size={20} className="absolute" />
              </div>
            </div>
            <input type="email" placeholder="Email" />
            <textarea placeholder="Comment" rows={5} className="resize-none" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
