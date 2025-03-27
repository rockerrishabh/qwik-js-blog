import { component$, useSignal, useTask$ } from "@builder.io/qwik";

export const ToggleTheme = component$(() => {
  const isDark = useSignal(false); // Reactive state for theme

  useTask$(() => {
    function setTheme(theme: string) {
      document.documentElement.className = theme;
      localStorage.setItem("theme", theme);
      isDark.value = theme === "dark"; // Update reactive signal
    }

    const savedTheme = localStorage.getItem("theme");
    const theme =
      savedTheme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(theme);
  });

  return (
    <label class="flex transform cursor-pointer items-center transition duration-300 ease-in-out hover:scale-105 active:rotate-45">
      <input
        type="checkbox"
        id="theme-toggle"
        class="hidden"
        onChange$={() => {
          const newTheme = document.documentElement.classList.contains("dark")
            ? "light"
            : "dark";
          document.documentElement.className = newTheme;
          localStorage.setItem("theme", newTheme);
        }}
      />
      <span class="relative flex h-6 w-12 items-center rounded-full bg-gray-400 p-1 transition-colors dark:bg-gray-700">
        {/* Sun Icon (Light Mode) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="absolute left-1 h-4 w-4 text-yellow-500 dark:hidden"
        >
          <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
        </svg>

        {/* Moon Icon (Dark Mode) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="absolute right-1 hidden h-4 w-4 text-white dark:block"
        >
          <path
            fill-rule="evenodd"
            d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
            clip-rule="evenodd"
          />
        </svg>

        {/* Toggle Knob */}
        <span class="absolute left-1 h-4 w-4 transform rounded-full bg-white transition-transform dark:translate-x-6 dark:bg-yellow-500"></span>
      </span>
    </label>
  );
});
