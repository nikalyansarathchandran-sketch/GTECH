
import { Link } from "react-router-dom";

function ServicesPreview() {
  const services = [
    {
      title: "Engineering Installation",
      description:
        "Professional installation services delivered with precision and safety.",
    },
    {
      title: "Maintenance",
      description:
        "Preventive and corrective maintenance to keep your systems operating efficiently.",
    },
    {
      title: "Project Management",
      description:
        "End-to-end planning, coordination and execution of engineering projects.",
    },
  ];

  return (
    <section className="bg-slate-100 py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-orange-500">
            Our Services
          </p>

          <h2 className="text-4xl font-bold text-slate-900">
            Engineering Solutions You Can Trust
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2"
            >
              <h3 className="mb-4 text-2xl font-semibold">
                {service.title}
              </h3>

              <p className="leading-7 text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-block rounded-lg bg-blue-900 px-7 py-3 font-semibold text-white transition hover:bg-orange-500"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
