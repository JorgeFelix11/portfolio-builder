import { createContext, useContext, useState, useCallback } from "react";

type LoadingContextType = {
  showLoading: () => void;
  hideLoading: () => void;
  loading: boolean
};

const LoadingContext = createContext<LoadingContextType>({
  showLoading: () => {},
  hideLoading: () => {},
  loading: false
});

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = useCallback(() => setLoading(true), []);
  const hideLoading = useCallback(() => setLoading(false), []);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, loading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white" />
        </div>
      )}
    </LoadingContext.Provider>
  );
};
