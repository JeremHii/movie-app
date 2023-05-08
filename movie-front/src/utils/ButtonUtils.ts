export type ButtonTheme = "normal" | "error" | "gray";
export const getButtonClasses = (theme: ButtonTheme) => {
  return {
    "focus:ring-4 focus:outline-none": true,
    "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800":
      theme === "normal",
    "bg-red-700 dark:bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:hover:bg-red-700 dark:focus:ring-red-800":
      theme === "error",
    "bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 focus:ring-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-700":
      theme === "gray",
  };
};
