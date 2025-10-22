import dynamic from "next/dynamic";
import Loader from "@/components/ui/Loader";

const DynamicHero = dynamic(() => import("@/components/Hero"), {
  loading: () => <Loader />,
});

export default function Home() {
  return (
    <section>
      <DynamicHero />
    </section>
  );
}
