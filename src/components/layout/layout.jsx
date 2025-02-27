import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="">
        <Outlet />
      </div>
      <Footer
      // name="Yogesh Rana"
      // link="https://yogeshrana.netlify.app"
      // title="Full Stack Developer"
      />
    </>
  );
}
