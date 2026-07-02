function ProjectsPreview() {
  const projects = [
    {
      title: "Industrial Installation",
      description:
        "Professional installation for industrial engineering systems.",
    },
    {
      title: "Maintenance Services",
      description:
        "Scheduled maintenance ensuring operational reliability.",
    },
    {
      title: "Engineering Project",
      description:
        "Complete project planning and execution from start to finish.",
    },
  ];

  return (
    <section className="bg-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <p className="uppercase tracking-widest text-orange-500 font-semibold mb-3">
            Featured Projects
          </p>

          <h2 className="text-4xl font-bold text-slate-900">
            Delivering Results Through Experience
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {projects.map((project) => (

            <div
              key={project.title}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >

              <div className="h-56 bg-slate-300 flex items-center justify-center text-slate-600">
                Project Image
              </div>

              <div className="p-6">

                <h3 className="text-2xl font-semibold mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {project.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default ProjectsPreview;