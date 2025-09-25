"use client"

import { useState } from "react"
import {useForm} from "react-hook-form"
import { useAuth } from "@/context/AuthContext"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginFormData, loginSchema } from "@/lib/validationSchemas"

interface LoginFormProps {
    onSuccess: () => void;
}

export default function LoginForm({onSuccess}: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
  
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const {login} = useAuth()

    const {register, handleSubmit, formState: {errors}, reset} = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: "onSubmit"
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true)
        setSubmitError(null)
        try {
            await login(data)
            reset()
            onSuccess()
        } catch (error) {
            if (error instanceof Error) {
                setSubmitError(error.message)
            } else {
                setSubmitError("Unknown error occurred")
            }
            
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
    <div>
      <h2>Log In</h2>
      <p>Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input id="email" type="email" placeholder="Email" {...register("email")}/>
        {errors.email && (
          <p>{errors.email.message}</p>
        )}
        <div>
          <input id="password" type="password" placeholder="Password" {...register("password")}/>
          {errors.password && (
          <p>{errors.password.message}</p>
        )}
        {submitError && (
          <div>{submitError}</div>
        )}
          <button type="button" disabled={isSubmitting} onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Show" : "Hide"}</button>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}