import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifySuccess = (message: string) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {textAlign: "center"}
  });
};
const notifyError = (message: string) =>
  toast.error(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { textAlign: "center" },
  });
export { notifySuccess, notifyError };
