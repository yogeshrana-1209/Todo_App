import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import Login from "./features/auth/components/Login";
import Signup from "./features/auth/components/Signup";
import TodoForm from "./features/Todos/components/TodoForm";
import TodoList from "./features/todos/components/TodoList";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/notFound";
import { useDispatch, useSelector } from "react-redux";
import { getStatus, login } from "./features/auth/store/AuthSlice";
// import AlbumCard from "./features/albums/components/albumCard";
import Albums from "./features/albums/components/albums";
import Layout from "./components/layout/layout";
import FileUploadPage from "./features/files/components/fileUploadPage";

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
          <Route
            path="/"
            element={<Navigate to={isLogin ? "/todo-list" : "/login"} />}
          />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes with Layout */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/todo-list" element={<TodoList />} />
            <Route path="/todo-form" element={<TodoForm />} />
            <Route path="/album" element={<Albums />} />
            <Route path="/uploadfile" element={<FileUploadPage />} />
          </Route>

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
