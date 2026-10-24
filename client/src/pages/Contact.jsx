
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    project_details: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from("contact_enquiries")
        .insert({
          name: form.name.trim(),
          company: form.company.trim() || null,
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          project_details: form.project_details.trim(),
        });

      if (error) throw error;

      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        project_details: "",
      });

      setMessage({
        type: "success",
        text: "Thank you! Your enquiry has been submitted successfully.",
      });
    } catch (error) {
      console.error("Enquiry submission failed:", error);

      setMessage({
        type: "error",
        text: "We couldn't submit your enquiry. Please try again or contact us by email.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10";

  return (
    <section className="bg-slate-50 px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-orange-500">
            Get in touch
          </p>

          <h1 className="text-3xl font-bold text-blue-900 md:text-5xl">
            Let's Discuss Your Project
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Tell us about your engineering requirements, and our team can
            follow up with you.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          <div className="space-y-6 md:col-span-2">
            <div>
              <h2 className="text-xl font-bold text-blue-900">
                Contact Information
              </h2>

              <p className="mt-2 text-slate-600">
                Have a question or need a quotation? Get in touch with us.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-900">Email</h3>
              <a
                href="mailto:chandran@gtechengineering.com"
                className="mt-2 block break-words text-slate-600 hover:text-orange-500"
              >
                chandran@gtechengineering.com
              </a>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-900">Phone</h3>
              <a
                href="tel:+6598609641"
                className="mt-2 block text-slate-600 hover:text-orange-500"
              >
                +65 9860 9641
              </a>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-blue-900">Address</h3>
              <p className="mt-2 text-slate-600">
                #01-04, 180 Woodlands Industrial Park E5,
                Singapore 757512
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md md:col-span-3 md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-blue-900">
              Send an Enquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your name"
                    maxLength={100}
                    autoComplete="name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Company name"
                    maxLength={200}
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="you@example.com"
                    maxLength={254}
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+65 ..."
                    maxLength={50}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="project_details"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Project Requirements *
                </label>
                <textarea
                  id="project_details"
                  name="project_details"
                  value={form.project_details}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Tell us about your project or engineering requirements..."
                  rows={5}
                  maxLength={5000}
                  required
                />
              </div>

              {message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-lg p-4 text-sm ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? "Submitting..." : "Submit Enquiry"}
              </button>

              <p className="text-xs text-slate-500">
                Fields marked * are required.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
