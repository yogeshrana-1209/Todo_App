import { useSelector, useDispatch } from "react-redux";
import { getStatus, logout } from "../auth/store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu

export default function Navbar() {
  const isLoggedIn = useSelector(getStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        {/* Logo / App Name */}
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          My Todo App
        </h1>

        {/* Menu Icon for Mobile */}
        <div className="md:hidden">
          {menuOpen ? (
            <FiX
              size={28}
              className="cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <FiMenu
              size={28}
              className="cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        {/* Navigation Links - Desktop View */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/todo-form")}
                className="bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Go to TodoForm
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 mt-2 py-4">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              className="bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Home
            </button>

            {isLoggedIn ? (
              <>
                {/* <button
                  onClick={() => {
                    navigate("/todo-form");
                    setMenuOpen(false);
                  }}
                  className="bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Go to TodoForm
                </button> */}

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Login / Signup
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
