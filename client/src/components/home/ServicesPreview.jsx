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
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <p className="uppercase tracking-widest text-orange-500 font-semibold mb-3">
            Our Services
          </p>

          <h2 className="text-4xl font-bold text-slate-900">
            Engineering Solutions You Can Trust
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service) => (

            <div
              key={service.title}
              className="bg-white rounded-xl shadow-md p-8 hover:-translate-y-2 transition duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {service.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default ServicesPreview;