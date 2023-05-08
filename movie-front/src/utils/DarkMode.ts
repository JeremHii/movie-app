import { ref } from "vue";

export class DarkMode {
  static event = new CustomEvent("darkModeChanged");

  static switch() {
    if (DarkMode.getStatus()) DarkMode.deactivate();
    else DarkMode.activate();
  }

  static init() {
    if (DarkMode.getStatus()) DarkMode.activate();
  }

  static activate() {
    localStorage.setItem("darkmode", "on");
    document.body.classList.add("dark");
    document.dispatchEvent(DarkMode.event);
  }

  static deactivate() {
    localStorage.removeItem("darkmode");
    document.body.classList.remove("dark");
    document.dispatchEvent(DarkMode.event);
  }

  static getStatus() {
    return localStorage.getItem("darkmode") === "on";
  }
}

export const useDarkMode = () => {
  const isDarkMode = ref<boolean>(DarkMode.getStatus());

  document.addEventListener("darkModeChanged", () => {
    isDarkMode.value = DarkMode.getStatus();
  });

  return {
    isDarkMode,
  };
};
