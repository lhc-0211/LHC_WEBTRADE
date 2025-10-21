import { toast as notify, Slide, type ToastOptions } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning";

export function useToast() {
  return (
    message: string,
    type: ToastType = "info",
    options?: ToastOptions
  ) => {
    notify[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Slide,
      theme: "dark",
      ...options,
    });
  };
}
