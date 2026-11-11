
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 md:grid-cols-2">
        {/* Left Side */}
        <div>
          <p className="mb-4 font-semibold uppercase tracking-widest text-orange-500">
            Welcome to G-TECH ENGINEERING SERVICES PTE. LTD.
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Engineering Solutions
            <br />
            Built on Quality,
            <br />
            Precision &amp; Trust.
          </h1>

          <p className="mb-10 text-lg leading-8 text-gray-300">
            Delivering professional engineering installation,
            maintenance and project management services across
            Singapore with reliability, safety and excellence.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="rounded-lg bg-orange-500 px-7 py-3 font-semibold transition hover:bg-orange-600"
            >
              Our Services
            </Link>

            <Link
              to="/contact"
              className="rounded-lg border border-white px-7 py-3 font-semibold transition hover:bg-white hover:text-slate-900"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
    src="/hcl-dosing-cabinet.jpg"
    alt="HCl dosing cabinet engineering project by G-TECH"
    className="h-[420px] w-full rounded-xl object-cover shadow-lg"
  />
        </div>
      </div>
    </section>
  );
}

export default Hero;
