import { NavLink } from "react-router-dom";

function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-3xl font-bold tracking-wide text-blue-900"
        >
          G-TECH
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-10">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `transition-all duration-300 font-medium ${
                  isActive
                    ? "text-orange-500"
                    : "text-slate-700 hover:text-blue-900"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

        </nav>

        {/* CTA Button */}
        <button className="bg-blue-900 text-white px-6 py-3 rounded-lg transition hover:bg-orange-500">
          Get a Quote
        </button>

      </div>
    </header>
  );
}

export default Navbar;
