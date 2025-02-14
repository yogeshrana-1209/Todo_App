import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom"; // Import useNavigate
// import PropTypes from "prop-types"; // Import PropTypes for validation
import * as Yup from "yup"; // Import Yup for validation
import { useDispatch } from "react-redux";
import {login} from "../todos/store/AuthSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(""); // Added state for login error

  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch();

  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(
        /^[A-Za-z]+$/,
        "Username cannot contain numbers or special characters"
      ) // Ensures only letters are allowed
      .matches(/^\S*$/, "Username cannot contain spaces") // Ensures no spaces in the username
      .required("Username is required"),
    password: Yup.string()
      .matches(/^\S*$/, "Password cannot contain spaces") // Ensures no spaces in the password
      .min(3, "Password must be at least 3 characters long") // Ensures password is at least 3 characters
      .required("Password is required"),
  });

  // Function to check if the user is logged in (using localStorage)
  const checkLoginStatus = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/todo-list"); // Redirect to todo-list if already logged in
    }
  };

  // Validate the input fields on change
  const validateField = async (fieldName, value) => {
    try {
      await validationSchema.validateAt(fieldName, { [fieldName]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } catch (err) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: err.message }));
    }
  };

  // Handle change of input field (username or password)
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") {
      setUsername(value);
      validateField("username", value);
    } else if (id === "password") {
      setPassword(value);
      validateField("password", value);
    }
  };

  // Handle login when the user clicks the login button
  const handleLogin = () => {
    // Clear any previous errors
    setErrors({});
    setLoginError(""); // Clear previous login errors

    // Create an object to validate
    const formData = { username, password };

    // Validate the form data using Yup
    validationSchema
      .validate(formData, { abortEarly: false }) // Validate all fields
      .then(() => {
        // If validation is successful, proceed with login
        const users = JSON.parse(localStorage.getItem("users")) || []; // Get the users array from localStorage

        // Check if a user with matching credentials exists in the users array
        const userData = users.find(
          (user) => user.username === username && user.password === password
        );

        if (userData) {
          // If user is found, set logged-in state and navigate to the todo list
          dispatch(login(userData)); // Dispatch login action
          localStorage.setItem("isLoggedIn", "true");
          navigate("/todo-list"); // Redirect to todo-list after successful login
        } else {
          // If user is not found, show an error message below the form
          setLoginError("Invalid username or password. Please try again.");
          setUsername(""); // Clear username input
          setPassword(""); // Clear password input
        }
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

  // Check login status when the component mounts
  useEffect(() => {
    checkLoginStatus();
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md m-[20px] bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Login
        </h2>

        <div className="space-y-6">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              value={username}
              onChange={handleChange}
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              value={password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          {/* Display login error message */}
          {loginError && <div className="text-red-500 text-left text-sm mt-2">{loginError}</div>}

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
// Login.propTypes = {
//   setIsLoggedIn: PropTypes.func.isRequired, // Validate that setIsLoggedIn is a required function
// };

export default Login;
