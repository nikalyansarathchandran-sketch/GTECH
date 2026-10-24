
import { Link } from "react-router-dom";

function AboutPreview() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-8 md:grid-cols-2">
        {/* Left Side */}
        <div>
          <p className="mb-4 font-semibold uppercase tracking-widest text-orange-500">
            Who We Are
          </p>

          <h2 className="mb-6 text-4xl font-bold text-slate-900">
            Trusted Engineering
            <br />
            Solutions in Singapore
          </h2>

          <p className="mb-8 leading-8 text-gray-600">
            G-TECH ENGINEERING SERVICES PTE. LTD. delivers professional
            engineering installation, maintenance and project management
            services for industrial and commercial projects. Our commitment
            to quality, safety and reliability allows us to work towards
            meeting our clients' expectations.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl text-orange-500">✓</span>
              <p>Engineering Installation</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl text-orange-500">✓</span>
              <p>Preventive &amp; Corrective Maintenance</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl text-orange-500">✓</span>
              <p>Professional Project Management</p>
            </div>
          </div>

          <Link
            to="/about"
            className="mt-8 inline-block rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-500"
          >
            Learn More About Us
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <div className="flex h-[450px] w-full items-center justify-center rounded-xl bg-slate-200 text-xl text-slate-500">
            Company Image Placeholder
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
