import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import Login from "./App/login/Login";
import Signup from "./App/signup/Signup";
import TodoForm from "./app/todos/components/TodoForm";
import TodoList from "./app/todos/components/TodoList";
import { ToastContainer } from "react-toastify";
import NotFound from "./App/sharedComponent/notFound"; // Import NotFound
import { useDispatch, useSelector } from "react-redux";
import { getStatus, login } from "./App/todos/store/AuthSlice";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLogin = useSelector(getStatus);

  const dispatch = useDispatch();
  // Check login status from localStorage
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(login);
    }
  }, [dispatch]);

  const ProtectedRoute = ({ children }) => {
    return isLogin ? children : <Navigate to="/login" />;
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
          {/* <Route path="/" element={<Login setIsLoggedIn={isLogin} />} /> */}
          <Route path="/" element={<Navigate to={isLogin ? "/todo-list" : "/login"} />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />

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
          {/* <Route path="/" element={<Navigate to={isLoggedIn ? "/todo-list" : "/login"} />} /> */}

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} /> {/* Add this route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
