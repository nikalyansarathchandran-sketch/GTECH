
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Admin() {
  const [user, setUser] = useState(null);

  // New project form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  // Photo upload form
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [photoMessage, setPhotoMessage] = useState("");

  useEffect(() => {
    async function initialise() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        await fetchProjects();
      }
    }

    initialise();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("id, title")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      setPhotoMessage(`Could not load projects: ${error.message}`);
      return;
    }

    setProjects(data || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/admin-login";
  }

  async function handleAddProject(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title: title.trim(),
          description: description.trim(),
          location: location.trim(),
        },
      ])
      .select("id, title")
      .single();

    if (error) {
      console.error("Error adding project:", error);
      setMessage(`Could not save project: ${error.message}`);
    } else {
      setMessage("Project added successfully!");
      setTitle("");
      setDescription("");
      setLocation("");

      await fetchProjects();
      setSelectedProject(data.id);
    }

    setSaving(false);
  }

  async function handleUploadPhotos(event) {
    event.preventDefault();

    if (!selectedProject) {
      setPhotoMessage("Please select a project.");
      return;
    }

    if (files.length === 0) {
      setPhotoMessage("Please select at least one photo.");
      return;
    }

    setUploading(true);
    setPhotoMessage("");

    const uploadedImages = [];
    const failedFiles = [];

    for (const file of files) {
      const safeFileName = file.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );

      const filePath =
        `${selectedProject}/${Date.now()}-${crypto.randomUUID()}-${safeFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Photo upload failed:", uploadError);
        failedFiles.push(file.name);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      uploadedImages.push({
        project_id: selectedProject,
        image_url: publicUrlData.publicUrl,
      });
    }

    let savedCount = 0;

    if (uploadedImages.length > 0) {
      const { data, error: databaseError } = await supabase
        .from("project_images")
        .insert(uploadedImages)
        .select("id");

      if (databaseError) {
        console.error("Could not save photo records:", databaseError);
        setPhotoMessage(
          `Photos uploaded, but their database records could not be saved: ${databaseError.message}. The uploaded files may need cleanup.`
        );
      } else {
        savedCount = data.length;
      }
    }

    if (savedCount > 0 && failedFiles.length === 0) {
      setPhotoMessage(
        `Successfully uploaded and linked ${savedCount} photo(s)!`
      );
      setFiles([]);
      event.target.reset();
    } else if (savedCount > 0) {
      setPhotoMessage(
        `${savedCount} photo(s) saved. Failed uploads: ${failedFiles.join(", ")}`
      );
      setFiles([]);
      event.target.reset();
    } else if (failedFiles.length > 0) {
      setPhotoMessage(
        `Could not upload: ${failedFiles.join(", ")}`
      );
    }

    setUploading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              G-TECH Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your projects and project photos.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">Welcome 👋</h2>
          <p className="text-gray-600">Logged in as:</p>
          <p className="font-medium mt-1">
            {user?.email || "Loading..."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
              Add New Project
            </h2>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  className="w-full border rounded-lg p-3"
                  placeholder="e.g. Industrial Piping Installation"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  required
                  rows={4}
                  className="w-full border rounded-lg p-3"
                  placeholder="Describe the project..."
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  required
                  className="w-full border rounded-lg p-3"
                  placeholder="e.g. Singapore"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-700 text-white px-5 py-3 rounded-lg disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Project"}
              </button>

              {message && (
                <p className="text-sm mt-3" role="status">
                  {message}
                </p>
              )}
            </form>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
              Upload Project Photos
            </h2>

            <form
              onSubmit={handleUploadPhotos}
              className="space-y-4"
            >
              <div>
                <label className="block font-medium mb-1">
                  Select Project
                </label>

                <select
                  value={selectedProject}
                  onChange={(event) =>
                    setSelectedProject(event.target.value)
                  }
                  required
                  className="w-full border rounded-lg p-3"
                >
                  <option value="">Choose a project</option>

                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Choose Photos
                </label>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  required
                  onChange={(event) =>
                    setFiles(Array.from(event.target.files || []))
                  }
                  className="w-full border rounded-lg p-3"
                />

                <p className="text-sm text-gray-500 mt-2">
                  You can select multiple images at once.
                </p>

                {files.length > 0 && (
                  <p className="text-sm mt-2">
                    {files.length} photo(s) selected
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={uploading || projects.length === 0}
                className="bg-blue-700 text-white px-5 py-3 rounded-lg disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload Photos"}
              </button>

              {photoMessage && (
                <p className="text-sm mt-3" role="status">
                  {photoMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
