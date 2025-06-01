'use strict';
{
    function setTheme(mode) {
        if (mode !== "light" && mode !== "dark" && mode !== "auto") {
            console.error(`Got invalid theme mode: ${mode}. Resetting to auto.`);
            mode = "auto";
        }
        document.documentElement.dataset.theme = mode;
        localStorage.setItem("theme", mode);
    }

function cycleTheme() {
  const currentTheme = localStorage.getItem("theme") || "auto";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  let nextTheme;

  if (prefersDark) {
    // Auto (dark) -> Light -> Dark
    nextTheme = currentTheme === "auto" ? "light"
              : currentTheme === "light" ? "dark"
              : "auto";
  } else {
    // Auto (light) -> Dark -> Light
    nextTheme = currentTheme === "auto" ? "dark"
              : currentTheme === "dark" ? "light"
              : "auto";
  }

  setTheme(nextTheme);
}

    function initTheme() {
        // set theme defined in localStorage if there is one, or fallback to auto mode
        const currentTheme = localStorage.getItem("theme");
        currentTheme ? setTheme(currentTheme) : setTheme("auto");
    }

    window.addEventListener('load', function(_) {
        const buttons = document.getElementsByClassName("theme-toggle");
        Array.from(buttons).forEach((btn) => {
            btn.addEventListener("click", cycleTheme);
        });
    });

    initTheme();
}
