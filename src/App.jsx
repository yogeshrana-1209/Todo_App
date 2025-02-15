import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import Login from "./App/auth/login/Login";
import Signup from "./App/auth/signup/Signup";
import TodoForm from "./app/todos/components/TodoForm";
import TodoList from "./app/todos/components/TodoList";
import { ToastContainer } from "react-toastify";
import NotFound from "./App/sharedComponent/notFound";
import { useDispatch, useSelector } from "react-redux";
import { getStatus, login } from "./App/auth/store/AuthSlice";

function App() {
  const isLogin = useSelector(getStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true" && !isLogin) {
      dispatch(login());
    }
  }, [dispatch, isLogin]);

  const ProtectedRoute = ({ children }) => {
    return isLogin ? children : <Navigate to="/login" />;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={isLogin ? "/todo-list" : "/login"} />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

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

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
