import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdPermPhoneMsg } from "react-icons/md";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { loginApi } from "../../api/authApi";
import { useAppSelector } from "../../store/hook";
import { loginSuccess } from "../../store/slices/authSlice";
import { closeLoginModal } from "../../store/slices/clientSlice";
import Button from "../button";

const customStyles = {
  content: {
    top: "50%",
    transform: "translateY(-50%)",
    bottom: "auto",
    left: "calc( 50% - 250px )",
    height: "auto",
    width: "500px",
    padding: "0",
    borderWidth: "1px",
    borderColor: "var(--color-border)",
    overflow: "inherit",
    borderRadius: "16px",
    background: "transparent",
  },
};

export default function LoginModal() {
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.client.loginModalOpen);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onClose = () => {
    dispatch(closeLoginModal());
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = await loginApi(username, password);
      dispatch(loginSuccess(token)); // lưu token vào Redux
      onClose(); // đóng modal
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Đăng nhập"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="flex flex-col justify-between p-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-sm font-bold text-text-title">
            CHÀO MỪNG NHÀ ĐẦU TƯ
            <br /> ĐẾN VỚI NỀN TẢNG GIAO DỊCH XTINVEST
          </h2>
          <IoClose className="size-6 text-text-title" onClick={onClose} />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <img
              src="../../assets/imgs/logo-short.png"
              alt="logo"
              className="w-16 h-16"
            />
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-black text-text-title">ĐĂNG NHẬP</h2>
              <h3 className="text-sm font-medium text-text-subtitle">
                Để bắt đầu đầu tư ngay!
              </h3>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {error && (
                <div className="py-2 px-3 bg-error-darker rounded-2xl">
                  <p className="text-red-500 text-sm mb-2">{error}</p>
                </div>
              )}
              <span className="text-sm font-semibold text-DTND-200 text-right">
                Quên mật khẩu?
              </span>
            </div>

            <Button
              variant="primary"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
          <span className="text-sm font-medium text-text-title text-center">
            Chưa có tài khoản{" "}
            <span className="font-semibold text-DTND-200">Mở tài khoản</span>
          </span>
        </div>

        <div className="flex flex-row gap-2">
          <MdPermPhoneMsg className="size-4 text-DTND-200" />
          <span className="text-xs text-text-body font-semibold">
            Hotline: <span className="text-text-subtitle">+84 123 456 789</span>
          </span>
        </div>
      </div>
    </Modal>
  );
}
