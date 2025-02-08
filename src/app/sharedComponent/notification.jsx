import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SuccessNotify = (text) => toast.success(text, { autoClose: 1000 });
export const InfoNotify = (text) => toast.info(text, { autoClose: 1000 });
export const DangerNotify = (text) => toast.error(text, { autoClose: 1000 });
