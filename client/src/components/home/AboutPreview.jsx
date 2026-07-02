function AboutPreview() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>

          <p className="text-orange-500 uppercase tracking-widest font-semibold mb-4">
            Who We Are
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Trusted Engineering
            <br />
            Solutions in Singapore
          </h2>

          <p className="text-gray-600 leading-8 mb-8">
            G-TECH Engineering delivers professional engineering
            installation, maintenance and project management
            services for industrial and commercial projects.
            Our commitment to quality, safety and reliability
            allows us to deliver solutions that meet our clients'
            expectations every time.
          </p>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <span className="text-orange-500 text-xl">✓</span>
              <p>Engineering Installation</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-orange-500 text-xl">✓</span>
              <p>Preventive & Corrective Maintenance</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-orange-500 text-xl">✓</span>
              <p>Professional Project Management</p>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex justify-center">

          <div className="w-full h-[450px] rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 text-xl">
            Company Image Placeholder
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutPreview;