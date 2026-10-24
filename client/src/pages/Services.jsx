
import { Link } from "react-router-dom";

function Services() {
  const services = [
    {
      number: "01",
      title: "Engineering Installation",
      description:
        "Support for engineering installation works, with attention to project requirements, coordination and careful execution.",
      points: [
        "Installation work coordination",
        "Attention to project specifications",
        "Work planning and execution support",
      ],
    },
    {
      number: "02",
      title: "Preventive & Corrective Maintenance",
      description:
        "Maintenance support focused on helping equipment and engineering systems remain in suitable working condition.",
      points: [
        "Preventive maintenance support",
        "Corrective maintenance coordination",
        "Attention to maintenance requirements",
      ],
    },
    {
      number: "03",
      title: "Project Management",
      description:
        "Project coordination support to help organise activities, communicate requirements and work towards agreed timelines.",
      points: [
        "Project activity coordination",
        "Timeline and task monitoring",
        "Communication with relevant parties",
      ],
    },
  ];

  return (
    <main className="w-full overflow-x-clip bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 sm:text-sm sm:tracking-[0.25em]">
            Our Services
          </p>

          <h1 className="max-w-4xl break-words text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Engineering support for your project needs.
          </h1>

          <p className="mt-6 w-full max-w-2xl break-words text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            G-TECH ENGINEERING SERVICES PTE. LTD. supports engineering
            installation, preventive and corrective maintenance, and project
            management requirements across Singapore.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500 sm:px-6 sm:py-3.5"
            >
              Discuss Your Project
            </Link>

            <a
              href="#our-services"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-6 sm:py-3.5"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Service introduction */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            How We Can Help
          </p>

          <h2 className="mt-4 break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Practical support from installation to project coordination.
          </h2>

          <p className="mt-5 break-words text-base leading-8 text-slate-600">
            Every project has its own requirements. Our service areas focus on
            understanding those requirements, coordinating the work involved
            and supporting clients throughout the process.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section id="our-services" className="scroll-mt-28 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid min-w-0 gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.number}
                className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-8"
              >
                <span className="text-sm font-bold tracking-widest text-blue-700">
                  {service.number}
                </span>

                <h3 className="mt-5 break-words text-xl font-bold leading-snug sm:text-2xl">
                  {service.title}
                </h3>

                <p className="mt-4 break-words leading-7 text-slate-600">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex min-w-0 items-start gap-3 text-sm leading-6 text-slate-700"
                    >
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600"
                        aria-hidden="true"
                      />
                      <span className="break-words">{point}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-blue-700 transition hover:text-blue-900"
                >
                  Enquire about this service
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Project enquiry CTA */}
      <section className="bg-blue-700">
        <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-12 sm:px-10 sm:py-14 md:flex-row md:items-center md:justify-between lg:px-12 lg:py-16">
          <div className="min-w-0 max-w-2xl">
            <h2 className="break-words text-2xl font-bold text-white sm:text-3xl">
              Looking for engineering support?
            </h2>

            <p className="mt-3 break-words leading-7 text-blue-100">
              Tell us about your project requirements and get in touch with
              G-TECH to discuss the next steps.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex w-full shrink-0 items-center justify-center rounded-lg bg-white px-6 py-3.5 text-center text-sm font-semibold text-blue-800 transition hover:bg-blue-50 sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Services;
