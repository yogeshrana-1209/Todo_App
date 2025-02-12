import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PropTypes from "prop-types"; // Import PropTypes for validation

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (
      userData &&
      userData.username === username &&
      userData.password === password
    ) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/todo-list"); // Redirect to todo-list after successful login
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Login to Your Account
        </h2>

        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <div className="mt-6">
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">{`Don't have an account? `}</span>
          <button
            onClick={() => navigate("/signup")} // Use navigate here
            className="text-sm text-blue-600 hover:underline"
          >
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation for Login component
Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired, // Validate that setIsLoggedIn is a required function
};

export default Login;
