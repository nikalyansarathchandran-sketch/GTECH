
import { Link } from "react-router-dom";

function About() {
  const serviceAreas = [
    {
      number: "01",
      title: "Engineering Installation",
      description:
        "Supporting engineering installation works with an emphasis on careful execution, coordination and attention to detail.",
    },
    {
      number: "02",
      title: "Preventive & Corrective Maintenance",
      description:
        "Supporting maintenance requirements to help keep equipment and engineering systems operating reliably.",
    },
    {
      number: "03",
      title: "Project Management",
      description:
        "Coordinating project activities, timelines and requirements to support organised and efficient project delivery.",
    },
  ];

  const values = [
    {
      number: "01",
      title: "Quality in Every Detail",
      description:
        "We value careful workmanship, attention to detail and a consistent approach to engineering tasks.",
    },
    {
      number: "02",
      title: "Reliable Service",
      description:
        "Clear communication and proper coordination help us work towards our clients' project requirements.",
    },
    {
      number: "03",
      title: "Customer Focus",
      description:
        "We aim to understand each client's needs and work towards practical solutions suited to their requirements.",
    },
  ];

  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-12">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            About G-TECH
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Engineering solutions built on quality, precision and trust.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            G-TECH Engineering Solutions Pte Ltd supports engineering
            installation, maintenance and project management requirements
            across Singapore, with a focus on quality workmanship and
            dependable service.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/services"
              className="rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Explore Our Services
            </Link>

            <Link
              to="/contact"
              className="rounded-lg border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Who We Are
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Practical engineering support for your project needs.
          </h2>

          <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
            <p>
              G-TECH Engineering Solutions Pte Ltd provides engineering
              services focused on installation, maintenance and project
              management. We understand the importance of careful planning,
              clear communication and attention to detail throughout
              engineering work.
            </p>

            <p>
              Our approach is centred on understanding project requirements,
              coordinating work effectively and supporting clients with
              practical engineering solutions.
            </p>

            <p>
              Whether the requirement involves installation works, ongoing
              maintenance or project coordination, our aim is to provide
              professional service aligned with the needs of each project.
            </p>
          </div>
        </div>

        {/* Visual panel — replace with a real company photo later */}
        <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 p-8 sm:min-h-[400px]">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-20 -left-12 h-64 w-64 rounded-full border border-white/10" />

          <div className="relative max-w-sm text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-8 w-8 text-blue-300"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M8 9h1m-1 4h1m-1 4h1m5-6h1m-1 4h1"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-white">
              G-TECH Engineering Solutions
            </h3>

            <p className="mt-3 leading-7 text-slate-300">
              Engineering installation, maintenance and project management
              support in Singapore.
            </p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
              Company image to be added
            </p>
          </div>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              What We Do
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Our core areas of work
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Our services cover key aspects of engineering work, from
              installation and maintenance to project coordination.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {serviceAreas.map((service) => (
              <article
                key={service.number}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <span className="text-sm font-bold tracking-widest text-blue-700">
                  {service.number}
                </span>

                <h3 className="mt-6 text-xl font-bold leading-snug">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {service.description}
                </p>

                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Company values */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Our Approach
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The principles behind our work
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            We believe that good engineering service starts with understanding
            requirements, paying attention to details and communicating
            clearly throughout a project.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.number}
              className="border-t-2 border-blue-600 pt-6"
            >
              <span className="text-sm font-semibold text-blue-700">
                {value.number}
              </span>

              <h3 className="mt-4 text-xl font-bold">{value.title}</h3>

              <p className="mt-3 leading-7 text-slate-600">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-blue-700">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-14 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-12 lg:py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Have an engineering project in mind?
            </h2>

            <p className="mt-3 leading-7 text-blue-100">
              Get in touch with G-TECH to discuss your project requirements
              and explore how we can support your needs.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-blue-800 transition hover:bg-blue-50"
          >
            Discuss Your Project
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
