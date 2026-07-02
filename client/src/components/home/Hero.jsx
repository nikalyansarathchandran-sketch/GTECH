function Hero() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>
          <p className="uppercase tracking-widest text-orange-500 font-semibold mb-4">
            Welcome to G-TECH Engineering
          </p>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Engineering Solutions
            <br />
            Built on Quality,
            <br />
            Precision & Trust.
          </h1>

          <p className="text-gray-300 text-lg leading-8 mb-10">
            Delivering professional engineering installation,
            maintenance and project management services across
            Singapore with reliability, safety and excellence.
          </p>

          <div className="flex gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 transition px-7 py-3 rounded-lg font-semibold">
              Our Services
            </button>

            <button className="border border-white hover:bg-white hover:text-slate-900 transition px-7 py-3 rounded-lg font-semibold">
              Contact Us
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <div className="w-full h-[420px] rounded-xl bg-slate-700 flex items-center justify-center text-gray-300 text-xl">
            Hero Image Placeholder
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;