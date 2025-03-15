import HeroCategories from "./HeroCategories";
import HomeSlider from "./HomeSlider";

export default function Hero() {
  return (
    <>
      <section className="flex justify-center w-full md:mt-7">
        <div className="max-w-primary w-full flex gap-5 md:px-5 justify-between">
          <HeroCategories />
          <HomeSlider />
        </div>
      </section>
    </>
  );
}
