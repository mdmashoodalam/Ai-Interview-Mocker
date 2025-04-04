import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red">
      {/* Ensures the content is vertically and horizontally centered */}
      <section className="w-full max-w-screen-lg overflow-hidden pt-8 pb-8 lg:pt-16 lg:pb-16">
        <div className="lg:grid lg:h-full lg:grid-cols-12">
          {/* Left Section with Image */}
          <section className="relative flex flex-col items-center justify-center bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <picture>
              {/* Mobile-specific image */}
              <source
                media="(max-width: 640px)"
                srcSet="/log-in.jpg"
              />
              {/* Default image for larger screens */}
              <img
                alt="AI Interview Mockers"
                src="/log-in.jpg"
                className="h-64 w-full object-cover opacity-50 sm:h-full lg:absolute lg:inset-0"
              />
            </picture>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 lg:relative lg:p-12">
              <a className="block text-blak" href="#">
                <span className="sr-only">Home</span>
                <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-8 w-8 text-indigo-600"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M50 20 L65 50 L50 80 L35 50 Z" fill="currentColor" />
          </svg>
              </a>

              <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl md:text-3xl">
                Welcome to AI Interview Mockers
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
                "Crush your interviews with AI-powered mock sessions"
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
                "Sharpen your skills, ace your interviews! Get real-time feedback
                and personalized coaching to land your dream job."
              </p>
            </div>
          </section>

          {/* Right Section with Form */}
          <main className="flex items-center justify-center px-4 py-8 sm:px-8 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <SignIn />
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
