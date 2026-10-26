
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        project_images (
          id,
          image_url
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
    } else {
      setProjects(data ?? []);
    }

    setLoading(false);
  }

  return (
    <>
      <section className="bg-slate-50">
        {/* Projects page introduction */}
        <div className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Our Work
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Our Projects
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Explore our engineering projects, showcasing our commitment
              to quality workmanship, reliable installation and practical
              engineering solutions.
            </p>

            <div className="mt-7 h-1 w-16 rounded-full bg-orange-500" />
          </div>
        </div>

        {/* Projects gallery */}
        <div className="mx-auto min-h-[350px] max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          {loading ? (
            <div className="py-16 text-center">
              <p className="text-slate-600">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <h2 className="text-xl font-semibold text-slate-900">
                Projects coming soon
              </h2>
              <p className="mt-2 text-slate-600">
                Our project gallery will be updated with our latest work.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const images = project.project_images ?? [];
                const coverImage = images[0];

                return (
                  <article
                    key={project.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Main project photo */}
                    {coverImage ? (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedImage({
                            src: coverImage.image_url,
                            alt: project.title,
                          })
                        }
                        aria-label={`Enlarge photo for ${project.title}`}
                        className="relative block w-full cursor-zoom-in overflow-hidden bg-slate-200 text-left"
                      >
                        <img
                          src={coverImage.image_url}
                          alt={project.title}
                          loading="lazy"
                          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                        />

                        <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-medium text-white">
                          View photo
                        </span>
                      </button>
                    ) : (
                      <div className="flex h-64 items-center justify-center bg-slate-100 sm:h-72">
                        <p className="text-sm text-slate-500">
                          No project photos available
                        </p>
                      </div>
                    )}

                    {/* Project information */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-900">
                        {project.title}
                      </h2>

                      {project.location && (
                        <p className="mt-3 flex items-start gap-2 text-sm font-medium text-slate-500">
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-orange-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                            />
                            <circle cx="12" cy="10" r="2.5" />
                          </svg>
                          <span>{project.location}</span>
                        </p>
                      )}

                      {project.description && (
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                          {project.description}
                        </p>
                      )}

                      {/* Additional photos */}
                      {images.length > 1 && (
                        <div className="mt-5 border-t border-slate-100 pt-4">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            More project photos
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {images.slice(1).map((image, index) => (
                              <button
                                key={image.id}
                                type="button"
                                onClick={() =>
                                  setSelectedImage({
                                    src: image.image_url,
                                    alt: `${project.title} - photo ${index + 2}`,
                                  })
                                }
                                aria-label={`Enlarge photo ${index + 2} for ${project.title}`}
                                className="h-16 w-16 overflow-hidden rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-800"
                              >
                                <img
                                  src={image.image_url}
                                  alt=""
                                  loading="lazy"
                                  className="h-full w-full object-cover transition duration-200 hover:scale-110"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Enlarged photo viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
          role="presentation"
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-black/60 px-4 py-2 text-3xl text-white hover:bg-black"
            aria-label="Close enlarged photo"
          >
            &times;
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-full object-contain"
          />
        </div>
      )}
    </>
  );
}

export default Projects;
