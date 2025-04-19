import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="text-sm px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle