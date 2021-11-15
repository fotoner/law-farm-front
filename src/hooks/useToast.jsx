import { useCallback } from "react";
import { toast } from "react-toastify";

const ToastConfig = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const useToast = () => {
  const ToastSuccess = useCallback((text) => {
    toast.success(text, ToastConfig);
  }, []);

  const ToastFail = useCallback((text) => {
    toast.error(text, ToastConfig);
  }, []); 

  const ToastInfo = useCallback((text) => {
    toast.info(text, ToastConfig);
  }, []); 

  return { ToastSuccess, ToastFail, ToastInfo };
};

export default useToast;
