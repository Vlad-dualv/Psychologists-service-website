"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./ui/Loader";

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
      alert("Please log in to access this page.");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
  }

  return <div>{children}</div>;
}
