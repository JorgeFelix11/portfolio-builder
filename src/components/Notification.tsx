import { useEffect } from "react";

type Props = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
};

const Notification = ({ message, type = "info", onClose }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed top-6 right-6 text-white px-4 py-2 rounded shadow-lg z-50 ${
        colors[type] || colors.info
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
