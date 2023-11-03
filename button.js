document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.getElementById("themeToggle");

  function toggleTheme() {
    const isDarkMode = document.body.classList.contains("dark-mode");

    if (isDarkMode) {
      document.body.classList.remove("dark-mode");
    } else {
      document.body.classList.add("dark-mode");
    }

    toggleButtonEmoji(); // Update the emoji based on current mode
  }

  function toggleButtonEmoji() {
    const isDarkMode = document.body.classList.contains("dark-mode");

    if (isDarkMode) {
      themeToggleBtn.textContent = "☀️"; // Light mode emoji
    } else {
      themeToggleBtn.textContent = "🌙"; // Dark mode emoji
    }
  }

  themeToggleBtn.addEventListener("click", toggleTheme);
});
