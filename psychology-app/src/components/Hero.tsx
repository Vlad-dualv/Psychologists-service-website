import { MoveUpRight, Check, UsersRound } from "lucide-react";
import { MdOutlineQuestionMark } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import heroImg from "@/images/hero-image.png";

export default function Hero() {
  return (
    <section className="py-10 md:py-[78px] h-full">
      <div className="max-w-[1280px] w-full px-4 md:px-6 mx-auto max-md:text-center">
        <div className="flex max-md:flex-col gap-6 mb-10">
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
        <div className="relative">
          <MdOutlineQuestionMark
            size={10}
            className="bg-brand-purple rounded-[10px] text-brand-white w-10 h-10 p-3 rotate-[-15deg] absolute top-28 left-0"
          />
          <UsersRound
            size={10}
            className="bg-brand-orange rounded-[10px] text-brand-white w-11 h-11 p-3 rotate-[15deg] absolute top-8 right-0"
          />
          <div className="bg-brand-green flex rounded-[20px] p-4 text-left gap-4 absolute -bottom-10 left-1">
            <Check
              size={30}
              className="bg-brand-white text-brand-green rounded-[13px] w-[48px] h-[48px] p-3"
            />
            <div className="text-brand-white">
              <p className="text-sm text-slate-200">
                Experienced psychologists
              </p>
              <h2 className="text-xl font-semibold">15,000</h2>
            </div>
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
