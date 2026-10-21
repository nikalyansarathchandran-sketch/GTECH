import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

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
                    <img
                      key={image.id}
                      src={image.image_url}
                      alt={project.title}
                      style={{ width: "200px" }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;