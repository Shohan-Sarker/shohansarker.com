// Theme preference cascade: localStorage > system preference > default
function initTheme() {
  const html = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const themeText = themeToggle.querySelector('.theme-text');
  
  // Get initial theme
  const storedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initialTheme = storedTheme || systemTheme;
  
  // Set initial theme
  html.setAttribute('data-theme', initialTheme);
  themeText.textContent = initialTheme === 'dark' ? 'LIGHT' : 'DARK';
  
  // Handle toggle click
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    themeText.textContent = newTheme === 'dark' ? 'LIGHT' : 'DARK';
    localStorage.setItem('theme', newTheme);
  });
}

// Initialize theme system
initTheme();