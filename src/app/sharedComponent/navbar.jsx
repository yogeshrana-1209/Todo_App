import { useSelector, useDispatch } from "react-redux";
import { getStatus, logout } from "../auth/store/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = useSelector(getStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  const username = userData?.username || "Guest"; // Fetch username

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        {/* App Title */}
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          My Todo App
        </h1>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-lg font-medium">Welcome, {username}</span>
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
    </nav>
  );
}
