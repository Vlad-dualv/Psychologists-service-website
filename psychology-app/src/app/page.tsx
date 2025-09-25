"use client"

import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";

//import Image from "next/image";

export default function Home() {

  function handleSuccess() {
    console.log("success")
  }
  return (
    <main>
      <h1>The road to the depths of the human soul</h1>
      <p>
        We help you to reveal your potential, overcome challenges and find a
        guide in your own life with the help of our experienced psychologists.
      </p>
      <RegisterForm onSuccess={handleSuccess}/>
      <LoginForm onSuccess={handleSuccess}/>
    </main>
  );
}
