import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastMessage = (type, msg, position, time) =>
  toast[type](msg, {
    position: position,
    autoClose: time === undefined ? 15000 : time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export default toastMessage;
