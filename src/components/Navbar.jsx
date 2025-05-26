import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center gap-16 w-full py-4 px-6 mb-6 bg-[#1e1e2f]/80 backdrop-blur-md border border-[#2e2e3e] rounded-xl shadow text-white">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-lg font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
            isActive
              ? "bg-gradient-to-r from-indigo-500 to-violet-600 shadow text-white"
              : "text-cyan-400 hover:text-white hover:bg-[#2e2e3e]"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `text-lg font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
            isActive
              ? "bg-gradient-to-r from-indigo-500 to-violet-600 shadow text-white"
              : "text-cyan-400 hover:text-white hover:bg-[#2e2e3e]"
          }`
        }
      >
        Pastes
      </NavLink>
    </nav>
  );
};

export default Navbar;
