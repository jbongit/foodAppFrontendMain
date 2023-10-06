import Featured from "@/components/Featured/Featured";
import Offer from "@/components/Offer/Offer";
import Slider from "@/components/Slider/Slider";

export default function Home() {
  return (
    <main>
      <Slider />
      <Featured />
      <Offer />
    </main>
  );
}
