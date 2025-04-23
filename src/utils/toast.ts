import toast from "react-hot-toast";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 4000,
    position: "top-right",
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
  });
};

export const showCustomToast = (message: string, options?: any) => {
  toast(message, {
    duration: 4000,
    position: "top-right",
    ...options,
  });
};
