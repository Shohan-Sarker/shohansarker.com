document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.getElementById("themeToggle");
  const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");

  function toggleButtonEmoji() {
    const isDarkMode = document.body.classList.contains("dark-mode");

    if (isDarkMode) {
      themeToggleBtn.textContent = "☀️"; // Light mode emoji
    } else {
      themeToggleBtn.textContent = "🌙"; // Dark mode emoji
    }
  }

  function setThemeBasedOnPreference() {
    if (prefersLightScheme.matches) {
      document.body.classList.remove("dark-mode");
    } else {
      document.body.classList.add("dark-mode");
    }
    toggleButtonEmoji(); // Update the emoji based on initial color scheme preference
  }

  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    setThemeBasedOnPreference(); // Update the theme based on button click
  }

  themeToggleBtn.addEventListener("click", toggleTheme);
  prefersLightScheme.addEventListener("change", setThemeBasedOnPreference);

  setThemeBasedOnPreference(); // Set theme on initial load
  toggleButtonEmoji(); // Update the emoji on initial load
});
