"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/context/AuthContext";
import { registerSchema, loginSchema, RegisterFormData } from "@/lib/validationSchemas";

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterForm({onSuccess, onSwitchToLogin}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const  [submitError, setSubmitError] = useState<string | null>(null) 
  const {register: registerUser} = useAuth()

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onChange"
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await registerUser(data)
      reset()
      onSuccess()
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message)
      } else {
        setSubmitError("An unknown error occurred")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2>Registration</h2>
      <p>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input id="name" type="text" placeholder="Name"/>
        <input id="email" type="email" placeholder="Email"/>
        <div>
          <input id="password" type="password" placeholder="Password"/>
          <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Show" : "Hide"}</button>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
