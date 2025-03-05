import HeroCategories from "./HeroCategories";

export default function Hero() {
  return (
    <>
      <section className="flex justify-center w-full mt-5">
        <div className="max-w-primary w-full flex gap-10 px-5 justify-between">
          <HeroCategories />
          <div></div>
        </div>
      </section>
    </>
  );
}
