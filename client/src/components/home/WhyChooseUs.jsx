
import { Link } from "react-router-dom";

function WhyChooseUs() {
  const reasons = [
    {
      title: "Experienced Team",
      description:
        "Skilled professionals delivering high-quality engineering solutions.",
    },
    {
      title: "Reliable Service",
      description:
        "Committed to completing every project safely, on time and within budget.",
    },
    {
      title: "Customer Focus",
      description:
        "Building long-term relationships through trust and excellent workmanship.",
    },
    {
      title: "Quality Assurance",
      description:
        "Every project is carried out with strict quality and safety standards.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-orange-500">
            Why Choose Us
          </p>

          <h2 className="text-4xl font-bold text-slate-900">
            Trusted by Businesses Across Singapore
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-xl border p-8 transition duration-300 hover:shadow-lg"
            >
              <h3 className="mb-4 text-2xl font-semibold">
                {reason.title}
              </h3>

              <p className="leading-7 text-gray-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-blue-900 px-7 py-3 font-semibold text-white transition hover:bg-orange-500"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
