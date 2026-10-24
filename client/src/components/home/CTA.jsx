
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-slate-900 py-24 text-center text-white">
      <div className="mx-auto max-w-4xl px-8">
        <p className="mb-4 font-semibold uppercase tracking-widest text-orange-500">
          Let's Work Together
        </p>

        <h2 className="mb-6 text-5xl font-bold">
          Ready to Start Your Next Engineering Project?
        </h2>

        <p className="mb-10 text-lg leading-8 text-gray-300">
          Whether you require engineering installation,
          maintenance or complete project management,
          G-TECH ENGINEERING SERVICES PTE. LTD. is ready to
          discuss your requirements and provide professional
          engineering solutions.
        </p>

        <Link
          to="/contact"
          className="inline-block rounded-lg bg-orange-500 px-8 py-4 text-lg font-semibold transition hover:bg-orange-600"
        >
          Contact Us Today
        </Link>
      </div>
    </section>
  );
}

export default CTA;
