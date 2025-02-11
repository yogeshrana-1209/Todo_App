import { ToastContainer } from "react-toastify";
import "./App.css";
import { Todos } from "./App/todos/todos";
// import Footer from "./App/sharedComponent/footer";

function App() {
  return (
    <>
      <ToastContainer />

      <h1 className="text-4xl font-extrabold text-blue-600 mb-5 border-2 border-blue-600 rounded-2xl bg-blue-100 p-4">
          Todo App
        </h1>

      <Todos />
      <hr />

      {/* <Footer
        name="Yogesh Rana"
        link="https://yogeshrana.netlify.app/"
        title="Full Stack Developer"
      /> */}
      {/* <div className="text-red-500 mt-3">
        <marquee direction="left">
          NOTE : This Todo App includes the React with Redux Toolkit, Axios Library without
          any Localstorage Concept...
        </marquee>
      </div> */}
    </>
  );
}

export default App;
