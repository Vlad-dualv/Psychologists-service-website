import { MoveUpRight, Check, UsersRound } from "lucide-react";
import { MdOutlineQuestionMark } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import heroImg from "@/images/hero-image.png";

export default function Hero() {
  return (
    <section className="py-10 md:py-[78px]">
      <div className="max-w-[1280px] w-full px-4 md:px-6 mx-auto max-md:text-center">
        <div className="flex max-md:flex-col gap-6">
          <h1 className="text-4xl md:text-7xl font-semibold">
            The road to the{" "}
            <span className="text-brand-green italic">depths</span> of the human
            soul
          </h1>
          <p>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <button
            type="button"
            className="text-white border bg-brand-green rounded-[30px] text-lg font-medium px-6 py-3 mt-4 hover:bg-brand-green-hover transition duration-300 ease-in-out"
          >
            <Link
              href="/psychologists"
              className="flex justify-center items-center gap-4"
            >
              Get Started <MoveUpRight size={18} />
            </Link>
          </button>
        </div>
        <div>
          <MdOutlineQuestionMark
            size={10}
            className="bg-brand-purple rounded-[10px] text-brand-white w-10 h-10 p-3"
          />
          <UsersRound
            size={10}
            className="bg-brand-orange rounded-[10px] text-brand-white w-[48px] h-[48px] p-4"
          />
          <div className="bg-brand-green">
            <Check
              size={30}
              className="bg-brand-white text-brand-green rounded-[30px]"
            />
            <p>Experienced psychologists</p>
            <h2>15,000</h2>
          </div>
          <div>
            <Image
              src={heroImg}
              alt="Hero Image"
              width={464}
              height={526}
              className="rounded-[10px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
