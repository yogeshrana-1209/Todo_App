import { useNavigate } from "react-router-dom"; // Import useNavigate
import PropTypes from "prop-types"; // Import PropTypes for validation

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate(); // Initialize navigate

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    navigate("/"); // Redirect to the login page after logout
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </div>
  );
};

// PropTypes validation for LogoutButton component
LogoutButton.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired, // Validate that setIsLoggedIn is a required function
};

export default LogoutButton;
