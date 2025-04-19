import { createContext, useContext, useState, useCallback } from "react";
import Notification from "../components/Notification";

type NotificationType = "success" | "error" | "info";

type NotificationData = {
  message: string;
  type?: NotificationType;
};

type NotificationContextType = {
  notify: (data: NotificationData) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  notify: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<NotificationData | null>(null);

  const notify = useCallback((data: NotificationData) => {
    setNotification(data);
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </NotificationContext.Provider>
  );
};
