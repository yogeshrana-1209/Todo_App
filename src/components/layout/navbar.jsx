import { useSelector, useDispatch } from "react-redux";
import { getStatus, logout } from "../../features/auth/store/AuthSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu
import todo_logo from "/assets/images/todo-app-icon.png"; // Import your logo image

export default function Navbar() {
  const isLoggedIn = useSelector(getStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

  //Change the button text and link based on the current page
  const isAlbumPage = location.pathname === "/album";
  const isUploadFilePage = location.pathname === "/uploadfile";
  const buttonText = isAlbumPage ? "Go to Todos" : "Go to Albums";
  const buttonLink = isAlbumPage ? "/todo-list" : "album";

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
    setMenuOpen(false);
  };

  //Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 text-white py-4 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          {/* Logo & App Name */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={todo_logo} alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold">Todo App</h1>
          </div>

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
                  onClick={() => navigate(buttonLink)}
                  className="bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  {buttonText}
                </button>

                {!isUploadFilePage ? (
                  <button
                    onClick={() => navigate("/uploadfile")}
                    className="bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    Upload File
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/todo-list")}
                    className="bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    Go to TodoList
                  </button>
                )}

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
                  navigate(buttonLink);
                  setMenuOpen(false);
                }}
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
              >
                {buttonText}
              </button>

              <button
                onClick={() => {
                  navigate("/todo-form");
                  setMenuOpen(false);
                }}
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Go to Form
              </button>

              {!isUploadFilePage ? (
                <button
                  onClick={() => {
                    navigate("/uploadfile");
                    setMenuOpen(false);
                  }}
                  className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Upload File
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/todo-list");
                    setMenuOpen(false);
                  }}
                  className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Go to TodoList
                </button>
              )}


              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
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

      {/* Fix overlapping by adding padding */}
      {/* <div className="pt-16"></div> */}
    </>
  );
}
