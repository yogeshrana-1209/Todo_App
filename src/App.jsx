import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import Login from "./app/todos/components/Login";
import Signup from "./app/todos/components/Signup";
import TodoForm from "./app/todos/components/TodoForm";
import TodoList from "./app/todos/components/TodoList";
import { ToastContainer } from "react-toastify";
import NotFound from "./app/todos/components/NotFound"; // Import NotFound

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  // Add PropType validation for the children prop
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />

          {/* Protected Routes */}
          <Route
            path="/todo-list"
            element={
              <ProtectedRoute>
                <TodoList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo-form"
            element={
              <ProtectedRoute>
                <TodoForm />
              </ProtectedRoute>
            }
          />

          {/* Redirect to login if accessing root without logging in */}
          <Route path="/" element={<Navigate to={isLoggedIn ? "/todo-list" : "/login"} />} />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} /> {/* Add this route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
