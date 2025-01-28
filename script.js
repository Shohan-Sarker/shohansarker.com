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
  themeText.textContent = initialTheme === 'dark' ? 'LIGHT' : 'NIGHT';
  
  // Handle toggle click
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    themeText.textContent = newTheme === 'dark' ? 'LIGHT' : 'NIGHT';
    localStorage.setItem('theme', newTheme);
  });
}

function handleMobileLayout() {
    const topSection = document.querySelector('.top-section');
    const playerContainer = document.querySelector('.player-container');
    const headerContainer = document.querySelector('.header-container');
    const socialContainer = document.querySelector('.social-container');
    const mainContainer = document.querySelector('.main-container');
    const mobileBreakpoint = 830;
    let isInMobileLayout = false;

    function updateLayout() {
        const isMobile = window.innerWidth <= mobileBreakpoint;
        
        if (isMobile !== isInMobileLayout) {
            if (isMobile) {
                topSection.parentNode.insertBefore(headerContainer, topSection);
                topSection.parentNode.insertBefore(playerContainer, socialContainer.nextSibling);
                topSection.remove();
            } else {
                if (!document.querySelector('.top-section')) {
                    const newTopSection = document.createElement('div');
                    newTopSection.className = 'top-section';
                    headerContainer.parentNode.insertBefore(newTopSection, headerContainer);
                    newTopSection.appendChild(headerContainer);
                    newTopSection.appendChild(playerContainer);
                }
            }
            isInMobileLayout = isMobile;
        }
    }

    updateLayout();
    window.addEventListener('resize', updateLayout);
}

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    handleMobileLayout();
});