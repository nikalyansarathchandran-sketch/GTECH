
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Admin() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin-login";
  };

  const handleAddProject = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const { error } = await supabase.from("projects").insert([
      {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
      },
    ]);

    if (error) {
      console.error("Error adding project:", error);
      setMessage(`Could not save project: ${error.message}`);
    } else {
      setMessage("Project added successfully!");
      setTitle("");
      setDescription("");
      setLocation("");
    }

    setSaving(false);
  };

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
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>

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
                  placeholder="e.g. Industrial System Installation"
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
            <h2 className="text-xl font-bold mb-2">Project Photos</h2>
            <p className="text-gray-600">
              Photo uploading will be added in the next phase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
