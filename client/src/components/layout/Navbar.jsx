
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const linkClass = ({ isActive }) =>
    `block font-medium transition-colors duration-300 ${
      isActive
        ? "text-orange-500"
        : "text-slate-700 hover:text-blue-900"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-5">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex shrink-0 items-center"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/gtech-logo.png"
            alt="G-TECH ENGINEERING SERVICES PTE. LTD."
            className="h-20 w-auto object-contain md:h-32"
          />
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={linkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop quote button */}
        <Link
          to="/contact"
          className="hidden rounded-lg bg-blue-900 px-6 py-3 text-white transition hover:bg-orange-500 lg:inline-flex"
        >
          Get a Quote
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-800 lg:hidden"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="space-y-4 border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/contact"
            className="block rounded-lg bg-blue-900 px-5 py-3 text-center text-white transition hover:bg-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
