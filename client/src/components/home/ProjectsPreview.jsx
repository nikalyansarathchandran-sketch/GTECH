
import { Link } from "react-router-dom";

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
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-orange-500">
            Featured Projects
          </p>

          <h2 className="text-4xl font-bold text-slate-900">
            Delivering Results Through Experience
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:shadow-xl"
            >
              <div className="flex h-56 items-center justify-center bg-slate-300 text-slate-600">
                Project Image
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-2xl font-semibold">
                  {project.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-block rounded-lg bg-blue-900 px-7 py-3 font-semibold text-white transition hover:bg-orange-500"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectsPreview;
