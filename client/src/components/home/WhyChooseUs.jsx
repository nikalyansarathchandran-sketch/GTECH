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
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <p className="uppercase tracking-widest text-orange-500 font-semibold mb-3">
            Why Choose Us
          </p>

          <h2 className="text-4xl font-bold text-slate-900">
            Trusted by Businesses Across Singapore
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {reasons.map((reason) => (

            <div
              key={reason.title}
              className="border rounded-xl p-8 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {reason.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {reason.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;