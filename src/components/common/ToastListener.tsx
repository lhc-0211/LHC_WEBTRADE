import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { RootState } from "../../store";
import { clearToast } from "../../store/slices/global/slice";

export default function ToastListener() {
  const dispatch = useDispatch();
  const toastState = useSelector((state: RootState) => state.global.toast);

  useEffect(() => {
    if (toastState) {
      const { msg, title, type = "info" } = toastState;
      toast[type](`${title ? `${title}: ` : ""}${msg}`);
      dispatch(clearToast());
    }
  }, [toastState, dispatch]);

  return null;
}
