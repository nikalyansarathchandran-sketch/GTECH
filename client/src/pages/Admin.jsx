
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Admin() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [selectedProject, setSelectedProject] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editingProject, setEditingProject] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLocation, setEditLocation] = useState("");

  const [message, setMessage] = useState("");
  const [photoMessage, setPhotoMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  
useEffect(() => {
  let active = true;

  async function initialise() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      if (active) {
        window.location.href = "/admin-login";
      }
      return;
    }

    if (user.id !== "ebf9fab3-6e53-42e5-be7b-cf95e0fcfc4b") {
      await supabase.auth.signOut();

      if (active) {
        window.location.href = "/admin-login";
      }
      return;
    }

    if (active) {
      setUser(user);
      await fetchProjects();
    }
  }

  initialise();

  return () => {
    active = false;
  };
}, []);


  async function fetchProjects() {
    setLoadingProjects(true);

    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        title,
        description,
        location,
        created_at,
        project_images (
          id,
          image_url
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      setMessage(`Could not load projects: ${error.message}`);
    } else {
      setProjects(data || []);
    }

    setLoadingProjects(false);
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
      .select("id")
      .single();

    if (error) {
      console.error("Error adding project:", error);
      setMessage(`Could not save project: ${error.message}`);
    } else {
      setMessage("Project added successfully!");
      setTitle("");
      setDescription("");
      setLocation("");
      setSelectedProject(data.id);
      await fetchProjects();
    }

    setSaving(false);
  }

  function startEditing(project) {
    setEditingProject(project);
    setEditTitle(project.title || "");
    setEditDescription(project.description || "");
    setEditLocation(project.location || "");
    setEditMessage("");
  }

  async function handleUpdateProject(event) {
    event.preventDefault();

    if (!editingProject) return;

    setSaving(true);
    setEditMessage("");

    const { error } = await supabase
      .from("projects")
      .update({
        title: editTitle.trim(),
        description: editDescription.trim(),
        location: editLocation.trim(),
      })
      .eq("id", editingProject.id);

    if (error) {
      console.error("Error updating project:", error);
      setEditMessage(`Could not update project: ${error.message}`);
    } else {
      setEditMessage("Project updated successfully!");

      const updatedProjectId = editingProject.id;
      await fetchProjects();
      setEditingProject(null);

      // Keep the project selected for photo uploads if appropriate.
      setSelectedProject((current) => current || updatedProjectId);
    }

    setSaving(false);
  }

  async function handleUploadPhotos(event) {
    event.preventDefault();

    if (!selectedProject || files.length === 0) {
      setPhotoMessage("Select a project and at least one photo.");
      return;
    }

    setUploading(true);
    setPhotoMessage("");

    const uploadedImages = [];
    const failedFiles = [];

    for (const file of files) {
      const safeName = file.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );

      const filePath =
        `${selectedProject}/${crypto.randomUUID()}-${safeName}`;

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

      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      uploadedImages.push({
        project_id: selectedProject,
        image_url: data.publicUrl,
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
          `Photos uploaded, but database saving failed: ${databaseError.message}. Uploaded files may need cleanup.`
        );
      } else {
        savedCount = data.length;
      }
    }

    if (savedCount > 0) {
      setPhotoMessage(
        `${savedCount} photo(s) uploaded and linked successfully.` +
          (failedFiles.length
            ? ` Failed uploads: ${failedFiles.join(", ")}`
            : "")
      );

      setFiles([]);
      event.target.reset();
      await fetchProjects();
    } else if (failedFiles.length > 0) {
      setPhotoMessage(
        `Could not upload: ${failedFiles.join(", ")}`
      );
    }

    setUploading(false);
  }

  async function handleDeleteProject(project) {
    const confirmed = window.confirm(
      `Delete "${project.title}" and its associated photos? This cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(project.id);
    setMessage("");

    // List the files inside this project's Storage folder.
    const { data: storageFiles, error: listError } =
      await supabase.storage
        .from("project-images")
        .list(project.id, { limit: 1000 });

    if (listError) {
      setMessage(
        `Could not inspect project photos: ${listError.message}. Nothing was deleted.`
      );
      setDeletingId(null);
      return;
    }

    const filePaths = (storageFiles || [])
      .filter((file) => file.name)
      .map((file) => `${project.id}/${file.name}`);

    if (filePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("project-images")
        .remove(filePaths);

      if (storageError) {
        setMessage(
          `Could not delete stored photos: ${storageError.message}. The project was kept.`
        );
        setDeletingId(null);
        return;
      }
    }

    const { error: imageRecordsError } = await supabase
      .from("project_images")
      .delete()
      .eq("project_id", project.id);

    if (imageRecordsError) {
      setMessage(
        `Photo files were removed, but photo records could not be deleted: ${imageRecordsError.message}. The project was kept.`
      );
      setDeletingId(null);
      return;
    }

    const { error: projectError } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);

    if (projectError) {
      setMessage(
        `Photos were removed, but the project could not be deleted: ${projectError.message}`
      );
    } else {
      setMessage(`"${project.title}" and its photos were deleted.`);

      if (selectedProject === project.id) {
        setSelectedProject("");
      }

      if (editingProject?.id === project.id) {
        setEditingProject(null);
      }

      await fetchProjects();
    }

    setDeletingId(null);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
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

        {/* Welcome */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">Welcome 👋</h2>
          <p className="text-gray-600">Logged in as:</p>
          <p className="font-medium mt-1">
            {user?.email || "Loading..."}
          </p>
        </div>

        {message && (
          <div
            className="bg-white rounded-lg shadow p-4 mb-6"
            role="status"
          >
            {message}
          </div>
        )}

        {/* Add project and upload photos */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
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
            </form>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
              Upload Project Photos
            </h2>

            <form onSubmit={handleUploadPhotos} className="space-y-4">
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

        {/* Existing projects */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Manage Existing Projects
          </h2>

          {loadingProjects ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-600">No projects found yet.</p>
          ) : (
            <div className="space-y-5">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-xl p-4"
                >
                  {editingProject?.id === project.id ? (
                    /* Edit form appears inside the selected project card */
                    <form
                      onSubmit={handleUpdateProject}
                      className="space-y-4"
                    >
                      <h3 className="font-bold text-lg">
                        Edit Project
                      </h3>

                      <div>
                        <label className="block font-medium mb-1">
                          Project Title
                        </label>
                        <input
                          value={editTitle}
                          onChange={(event) =>
                            setEditTitle(event.target.value)
                          }
                          required
                          className="w-full border rounded-lg p-3"
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-1">
                          Description
                        </label>
                        <textarea
                          value={editDescription}
                          onChange={(event) =>
                            setEditDescription(event.target.value)
                          }
                          required
                          rows={4}
                          className="w-full border rounded-lg p-3"
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-1">
                          Location
                        </label>
                        <input
                          value={editLocation}
                          onChange={(event) =>
                            setEditLocation(event.target.value)
                          }
                          required
                          className="w-full border rounded-lg p-3"
                        />
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="submit"
                          disabled={saving}
                          className="bg-blue-700 text-white px-5 py-3 rounded-lg disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save Changes"}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject(null);
                            setEditMessage("");
                          }}
                          className="border px-5 py-3 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>

                      {editMessage && (
                        <p role="status" className="text-sm">
                          {editMessage}
                        </p>
                      )}
                    </form>
                  ) : (
                    /* Normal project card */
                    <>
                      <div className="flex flex-wrap justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {project.description}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Location: {project.location || "Not specified"}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {project.project_images?.length || 0} photo(s)
                          </p>
                        </div>

                        <div className="flex items-start gap-2">
                          <button
                            onClick={() => startEditing(project)}
                            className="bg-blue-700 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteProject(project)}
                            disabled={deletingId === project.id}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                          >
                            {deletingId === project.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>

                      {project.project_images?.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          {project.project_images.map((image) => (
                            <img
                              key={image.id}
                              src={image.image_url}
                              alt={project.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
