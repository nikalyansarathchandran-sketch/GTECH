
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

    // Prevent the background page from scrolling while the viewer is open.
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
      setProjects(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <section className="p-10">
        <h1>Loading projects...</h1>
      </section>
    );
  }

  return (
    <section className="p-10">
      <h1>Our Projects</h1>

      {projects.length === 0 ? (
        <p>No projects available yet.</p>
      ) : (
        <div>
          {projects.map((project) => (
            <div key={project.id}>
              <h2>{project.title}</h2>

              <p>{project.description}</p>

              <p>
                <strong>Location:</strong> {project.location}
              </p>

              {project.project_images?.length > 0 && (
                <div>
                  {project.project_images.map((image) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() =>
                        setSelectedImage({
                          src: image.image_url,
                          alt: project.title,
                        })
                      }
                      aria-label={`Enlarge photo for ${project.title}`}
                      className="inline-block m-1 cursor-zoom-in border-0 bg-transparent p-0"
                    >
                      <img
                        src={image.image_url}
                        alt={project.title}
                        style={{
                          width: "200px",
                          display: "block",
                          maxWidth: "100%",
                          height: "auto",
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

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
    </section>
  );
}

export default Projects;
