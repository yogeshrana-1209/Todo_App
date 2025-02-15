import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(
        /^[A-Za-z]+$/,
        "Username cannot contain numbers or special characters"
      )
      .matches(/^\S*$/, "Username cannot contain spaces")
      .required("Username is required"),
    password: Yup.string()
      .matches(/^\S*$/, "Password cannot contain spaces")
      .min(3, "Password must be at least 3 characters long")
      .required("Password is required"),
  });

  // Check if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/todo-list");
    }
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginError(""); // Clear login error when user types

    if (id === "username") {
      setUsername(value);
      validateField("username", value);
    } else if (id === "password") {
      setPassword(value);
      validateField("password", value);
    }
  };

  // Validate individual fields
  const validateField = async (fieldName, value) => {
    try {
      await validationSchema.validateAt(fieldName, { [fieldName]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } catch (err) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: err.message }));
    }
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setErrors({});
    setLoginError("");

    validationSchema
      .validate({ username, password }, { abortEarly: false })
      .then(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if user exists
        const userData = users.find(
          (user) => user.username === username && user.password === password
        );

        if (userData) {
          dispatch(login(userData));
          localStorage.setItem("isLoggedIn", "true");
          // localStorage.setItem("user",JSON.stringify({ username: userData.username}));
          navigate("/todo-list");
        } else {
          setLoginError("Invalid username or password. Please try again.");
          setUsername(""); // Reset username field
          setPassword(""); // Reset password field
        }
      })
      .catch((err) => {
        const formErrors = {};
        err.inner.forEach((e) => {
          formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md m-[20px] bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
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
                <div className="text-red-500 text-sm mt-1">
                  {errors.username}
                </div>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
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
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            {/* Display login error */}
            {loginError && (
              <div className="text-red-500 text-left text-sm mt-2">
                {loginError}
              </div>
            )}

            {/* Login Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </div>
          </div>

          {/* Signup Navigation */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">{`Don't have an account? `}</span>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-sm text-blue-600 hover:underline"
            >
              Sign up here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
