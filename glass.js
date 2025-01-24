// Enhanced glass container effects
document.addEventListener('DOMContentLoaded', () => {
    const glassContainers = document.querySelectorAll('.glass-container');
    
    // Mouse move parallax and lighting effect
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768 || 'ontouchstart' in window) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        glassContainers.forEach(container => {
            // Get container position relative to viewport
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Reduce movement for more subtle iOS-like effect
            const moveX = (clientX - centerX) / 100;
            const moveY = (clientY - centerY) / 100;
            
            // Apply different intensity for footer
            const isFooter = container.classList.contains('footer-container');
            const intensity = isFooter ? 0.3 : 0.6;
            
            // Apply transforms with reduced intensity for footer
            container.style.transform = `
                translate3d(${moveX * intensity}px, ${moveY * intensity}px, 0)
                rotateX(${moveY / 30 * intensity}deg)
                rotateY(${-moveX / 30 * intensity}deg)
            `;
            
            // Update lighting effects
            const xPercentage = ((clientX - rect.left) / rect.width) * 100;
            const yPercentage = ((clientY - rect.top) / rect.height) * 100;
            
            container.style.setProperty('--x', `${xPercentage}%`);
            container.style.setProperty('--y', `${yPercentage}%`);
        });
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 768) return;
        
        glassContainers.forEach(container => {
            container.style.transition = 'all 0.5s ease-out';
            container.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
        });
        
        setTimeout(() => {
            glassContainers.forEach(container => {
                container.style.transition = 'none';
            });
        }, 500);
    });
});
