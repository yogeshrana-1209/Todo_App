import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { login } from "../store/AuthSlice";

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

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // Handle form submission
  const handleSignup = (e) => {
    e.preventDefault();
    const formData = { username, password };

    // Validate the form data using Yup
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        const newUser = { username, password };
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Dispatch login action
        // dispatch(login());
        // localStorage.setItem("isLoggedIn", "true");

        // Navigate to the login page
        navigate("/login");
      })
      .catch((err) => {
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

    validationSchema
      .validateAt("username", { username: value, password })
      .then(() => {
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

    validationSchema
      .validateAt("password", { username, password: value })
      .then(() => {
        setErrors((prevErrors) => ({ ...prevErrors, password: null }));
      })
      .catch((err) => {
        setErrors((prevErrors) => ({ ...prevErrors, password: err.message }));
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md m-[20px] bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-sm"
                value={username}
                onChange={handleUsernameChange}
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
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-sm"
                value={password}
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            {/* Signup Button */}
            <div className="mt-6">
              <button
                type="submit"
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
              type="button" // FIXED: Changed to "button" to prevent form submission
              onClick={() => navigate("/login")}
              className="text-sm text-blue-600 hover:underline"
            >
              Login here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
