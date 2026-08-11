const HERO_VIDEO_SRC =
  "/sites/vn-loccitane-com-1c965340/root-8a5edab2/videos/hero.mp4";
const HERO_POSTER_SRC =
  "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/hero-poster.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_POSTER_SRC}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="absolute inset-x-0 bottom-0 z-[1] h-[300px] bg-gradient-to-t from-black/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-8 z-10 px-4 md:bottom-10 md:px-6 lg:bottom-16 lg:left-10 lg:right-auto lg:px-0">
        <h1 className="text-3xl font-medium leading-tight text-white lg:text-[40px] lg:leading-[56px]">
          Same Iconic Formula
        </h1>
        <a
          href="#"
          className="mt-4 inline-flex items-center gap-1 text-sm text-white hover:underline"
        >
          Khám phá ngay
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M6 3.5L10.5 8L6 12.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
