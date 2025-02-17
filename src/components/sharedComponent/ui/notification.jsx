import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SuccessNotify = (text) =>
  toast.success(text, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
export const InfoNotify = (text) => toast.info(text, { autoClose: 1000 });
export const DangerNotify = (text) => toast.error(text, { autoClose: 1000 });
