import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import * as Yup from "yup"; // Import Yup for validation

// Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^[A-Za-z]+$/, "Username cannot contain numbers or special characters") // Ensures only letters are allowed
    .matches(/^\S*$/, "Username cannot contain spaces") // Ensures no spaces in the username
    .required("Username is required"),
  password: Yup.string()
    .matches(/^\S*$/, "Password cannot contain spaces") // Ensures no spaces in the password
    .min(3, "Password must be at least 3 characters long") // Ensures password is at least 6 characters
    .required("Password is required"),
});


const Signup = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle form submission
  const handleSignup = () => {
    const formData = { username, password };

    // Validate the form data using Yup
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        // If validation passes, store the user data in an array in localStorage
        const newUser = { username, password };

        // Get the current list of users from localStorage (or initialize an empty array if none exist)
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Add the new user to the list of users
        users.push(newUser);

        // Store the updated list of users back in localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Set the user as logged in
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");

        // Navigate to the login page
        navigate("/login");
      })
      .catch((err) => {
        // If validation fails, set errors in state
        const formErrors = {};
        err.inner.forEach((e) => {
          formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      });
  };

  // Handle real-time validation for username input
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    const value = e.target.value;

    // Validate username field on change
    validationSchema
      .validateAt("username", { username: value, password })
      .then(() => {
        // Clear error if the username is valid
        setErrors((prevErrors) => ({ ...prevErrors, username: null }));
      })
      .catch((err) => {
        setErrors((prevErrors) => ({ ...prevErrors, username: err.message }));
      });
  };

  // Handle real-time validation for password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const value = e.target.value;

    // Validate password field on change
    validationSchema
      .validateAt("password", { username, password: value })
      .then(() => {
        // Clear error if the password is valid
        setErrors((prevErrors) => ({ ...prevErrors, password: null }));
      })
      .catch((err) => {
        setErrors((prevErrors) => ({ ...prevErrors, password: err.message }));
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Sign Up
        </h2>

        <div className="space-y-4">
          {/* Username Input */}
          <div>
            <label
              htmlFor="uname"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="uname"
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={username}
              onChange={handleUsernameChange} // onChange event added
            />
            {errors.username && (
              <div className="text-red-500 text-sm mt-1">{errors.username}</div>
            )}
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={handlePasswordChange} // onChange event added
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          {/* Signup Button */}
          <div className="mt-6">
            <button
              onClick={handleSignup}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
          </span>
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-600 hover:underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation for Signup component
Signup.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired, // Validate that setIsLoggedIn is a required function
};

export default Signup;
