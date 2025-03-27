import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@builder.io/qwik";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
        <script
          dangerouslySetInnerHTML={`
       (function () {
    function setTheme(theme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }

    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(theme);

    // Ensure toggle button reflects the current theme
    window.addEventListener("DOMContentLoaded", function () {
      const themeSwitch = document.getElementById("hide-checkbox");
      if (themeSwitch) {
        themeSwitch.checked = theme === "light";
      }

      // Attach event listener to the toggle button
      const toggleButton = document.getElementById("theme-toggle");
      if (toggleButton) {
        toggleButton.addEventListener("click", function () {
          const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
          const newTheme = currentTheme === "light" ? "dark" : "light";
          setTheme(newTheme);
        });
      }
    });
  })();
      `}
        ></script>
      </head>
      <body
        lang="en"
        class="bg-slate-50 font-sans text-slate-950 antialiased dark:bg-slate-950 dark:text-slate-50"
      >
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
