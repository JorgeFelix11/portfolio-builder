import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
    await login();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-white to-blue-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to Portfolio Builder</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl">
        Create and publish your personal portfolio. Log in to get started.
      </p>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Login with Google
      </button>
    </div>
  );
};

export default LandingPage;
