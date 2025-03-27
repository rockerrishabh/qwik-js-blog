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
       (function() {
    function setTheme(theme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }

    // Check stored theme or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(theme);

    // Ensure toggle button reflects the current theme
    window.addEventListener("load", function() {
      const themeSwitch = document.getElementById("hide-checkbox");
      if (themeSwitch) {
        themeSwitch.checked = theme === "light";
      }
    });

    // Listen for theme changes from the toggle button
    window.addEventListener("click", function(event) {
      const toggleButton = event.target.closest("button");
      if (toggleButton && toggleButton.getAttribute("id") === "theme-toggle") {
        const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
        setTheme(currentTheme === "light" ? "dark" : "light");
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
