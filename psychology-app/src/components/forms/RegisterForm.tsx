import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "@/lib/types";

export default function RegisterForm() {
  /*
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  */

  return (
    <div>
      <h2>Registration</h2>
      <p>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <form></form>
    </div>
  );
}
