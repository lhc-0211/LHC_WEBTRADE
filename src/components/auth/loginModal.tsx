import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { MdPermPhoneMsg } from "react-icons/md";
import { PiWarningFill } from "react-icons/pi";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import * as yup from "yup";
import { loginApi } from "../../api/authApi";
import bgLogin from "../../assets/imgs/bg-login.jpg";
import logo from "../../assets/imgs/logo.png";
import { loginSuccess } from "../../store/slices/auth/slice";
import { closeLoginModal } from "../../store/slices/clientSlice";
import Button from "../button";
import InputField from "../inputs/inputField";

const schema = yup.object({
  username: yup.string().required("Vui lòng nhập tên đăng nhập"),
  password: yup
    .string()
    .min(6, "Ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

type FormValues = {
  username: string;
  password: string;
};

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
  // const isOpen = useAppSelector((state) => state.client.loginModalOpen);

  const isOpen = false;

  const [error, setError] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onClose = () => {
    dispatch(closeLoginModal());
    setError("");
    reset();
  };

  const onSubmit = async (data: FormValues) => {
    setError("");

    try {
      const token = await loginApi({
        accountCode: data.username,
        password: data.password,
        device: "device",
      });

      dispatch(loginSuccess(token)); // lưu token vào Redux
      onClose(); // đóng modal
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error logging in");
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
      <div
        className="flex flex-col gap-4 p-4 bg-cover bg-no-repeat bg-center rounded-2xl"
        style={{
          backgroundImage: `url(${bgLogin})`,
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-sm font-bold text-text-title">
            CHÀO MỪNG NHÀ ĐẦU TƯ
            <br /> ĐẾN VỚI NỀN TẢNG GIAO DỊCH DTND
          </h2>
          <IoClose
            className="size-6 text-text-title cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <img src={logo} alt="logo" className="w-36 h-13" />
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-black text-text-title">ĐĂNG NHẬP</h2>
              <h3 className="text-sm font-medium text-text-subtitle">
                Để bắt đầu đầu tư ngay!
              </h3>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-3">
              <InputField
                label="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                error={errors.username}
                registration={register("username")}
                className="!h-12"
              />

              <InputField
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
                error={errors.password}
                registration={register("password")}
                className="!h-12"
              />
            </div>

            <div className="flex flex-col gap-4">
              {error && (
                <div className="py-2 px-3 bg-error-darker rounded-xl flex items-center flex-row gap-1">
                  <PiWarningFill className="size-5 text-red-500" />
                  <span className="text-red-500 text-sm">{error}</span>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? <ScaleLoader height={25} /> : "Đăng nhập"}
            </Button>
          </form>
          <span className="text-sm font-medium text-text-title text-center">
            Chưa có tài khoản?{" "}
            <span className="font-semibold text-DTND-200">Mở tài khoản</span>
          </span>
        </div>

        <div className="flex flex-row gap-2 items-center justify-center w-full">
          <MdPermPhoneMsg className="size-4 text-DTND-200" />
          <span className="text-xs text-text-body font-semibold">
            Hotline: <span className="text-text-subtitle">+84 123 456 789</span>
          </span>
        </div>
      </div>
    </Modal>
  );
}
