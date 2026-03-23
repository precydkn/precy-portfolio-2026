// --- Horizontal scroll function & other functions for wrks ---
const sections = document.querySelectorAll(".horizontal-section-wrapper");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        const container = section.querySelector(".sticky-wrapper");
        
        // Skip if no container found
        if (!container) return;

        const scrollY = window.scrollY;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Calculate total scrollable width
        const containerWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        // Get last item to calculate centered max scroll
        const lastItem = container.querySelector(".sticky-content:last-child");
        let maxScroll = containerWidth - viewportWidth;
        
        // If last item exists, adjust maxScroll to center it at the end
        if (lastItem && lastItem !== container.querySelector(".sticky-content:first-child")) {
            let lastItemWidth;
            
            // Different centering logic based on section type
            if (section.classList.contains('websites') || section.classList.contains('visuals')) {
                // For sections with image + text, center based on the image
                const lastImage = lastItem.querySelector('.work-img');
                if (lastImage) {
                    lastItemWidth = lastImage.offsetWidth;
                } else {
                    lastItemWidth = lastItem.offsetWidth;
                }
            } else if (section.classList.contains('posters')) {
                // For posters, center based on the image
                const lastImage = lastItem.querySelector('.work-img img');
                if (lastImage) {
                    lastItemWidth = lastImage.offsetWidth;
                } else {
                    lastItemWidth = lastItem.offsetWidth;
                }
            } else {
                lastItemWidth = lastItem.offsetWidth;
            }
            
            maxScroll = containerWidth - viewportWidth + (viewportWidth/2 - lastItemWidth/2);
        }
        
        if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Calculate progress based on scroll position within section
            let progress = (scrollY - sectionTop) / (sectionHeight - window.innerHeight);
            
            // Clamp progress between 0 and 1
            progress = Math.min(Math.max(progress, 0), 1);
            
            // Calculate translation
            let translateX = progress * maxScroll;
            
            // Ensure we don't overscroll
            translateX = Math.min(Math.max(translateX, 0), maxScroll);
            
            container.style.transform = `translateX(-${translateX}px)`;
        }

        // --- Smooth bg color transition #websites ---
        if (section.classList.contains('websites')) {
            const websiteItems = section.querySelectorAll('.sticky-content:not(:empty)');
            const validItems = Array.from(websiteItems).filter(item => item.children.length > 0);
            
            if (validItems.length > 0 && container) {
                const transform = container.style.transform;
                const match = transform.match(/translateX\(-([\d.]+)px\)/);
                
                if (match) {
                    const translateX = parseFloat(match[1]);
                    const totalScrollable = container.scrollWidth - viewportWidth;
                    const scrollProgress = totalScrollable > 0 ? translateX / totalScrollable : 0;
                    
                    const position = scrollProgress * (validItems.length - 1);
                    const currentIndex = Math.floor(position);
                    const blendFactor = position - currentIndex;
                    
                    const colors = ['#94E29C', '#764BA2', '#FF94BA'];
                    
                    if (currentIndex < validItems.length - 1 && blendFactor > 0) {
                        const currentColor = colors[currentIndex];
                        const nextColor = colors[currentIndex + 1];
                        
                        const blendColor = (color1, color2, factor) => {
                            const hexToRgb = (hex) => {
                                const r = parseInt(hex.slice(1, 3), 16);
                                const g = parseInt(hex.slice(3, 5), 16);
                                const b = parseInt(hex.slice(5, 7), 16);
                                return [r, g, b];
                            };
                            
                            const rgb1 = hexToRgb(color1);
                            const rgb2 = hexToRgb(color2);
                            
                            const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * factor);
                            const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * factor);
                            const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * factor);
                            
                            return `rgb(${r}, ${g}, ${b})`;
                        };
                        
                        const blendedColor = blendColor(currentColor, nextColor, blendFactor);
                        section.style.background = blendedColor;
                        section.style.transition = 'background 0.1s linear';
                    } else {
                        const activeIndex = Math.min(currentIndex, validItems.length - 1);
                        const color = colors[activeIndex];
                        section.style.background = color;
                        section.style.transition = 'background 0.3s ease';
                    }
                }
            }
        }
        
        // --- Smooth bg color transition #visuals ---
        if (section.classList.contains('visuals')) {
            const visualItems = section.querySelectorAll('.sticky-content:not(:empty)');
            const validItems = Array.from(visualItems).filter(item => item.children.length > 0);
            
            if (validItems.length > 0 && container) {
                const transform = container.style.transform;
                const match = transform.match(/translateX\(-([\d.]+)px\)/);
                
                if (match) {
                    const translateX = parseFloat(match[1]);
                    const totalScrollable = container.scrollWidth - viewportWidth;
                    const scrollProgress = totalScrollable > 0 ? translateX / totalScrollable : 0;
                    
                    const position = scrollProgress * (validItems.length - 1);
                    const currentIndex = Math.floor(position);
                    const blendFactor = position - currentIndex;
                    
                    // Define your colors for visual designs
                    const colors = ['#616161', '#FFF98A', '#84D0FF'];
                    
                    if (currentIndex < validItems.length - 1 && blendFactor > 0) {
                        const currentColor = colors[currentIndex];
                        const nextColor = colors[currentIndex + 1];
                        
                        const blendColor = (color1, color2, factor) => {
                            const hexToRgb = (hex) => {
                                const r = parseInt(hex.slice(1, 3), 16);
                                const g = parseInt(hex.slice(3, 5), 16);
                                const b = parseInt(hex.slice(5, 7), 16);
                                return [r, g, b];
                            };
                            
                            const rgb1 = hexToRgb(color1);
                            const rgb2 = hexToRgb(color2);
                            
                            const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * factor);
                            const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * factor);
                            const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * factor);
                            
                            return `rgb(${r}, ${g}, ${b})`;
                        };
                        
                        const blendedColor = blendColor(currentColor, nextColor, blendFactor);
                        section.style.background = blendedColor;
                        section.style.transition = 'background 0.1s linear';
                    } else {
                        const activeIndex = Math.min(currentIndex, validItems.length - 1);
                        const color = colors[activeIndex];
                        section.style.background = color;
                        section.style.transition = 'background 0.3s ease';
                    }
                }
            }
        }
    });
});
// ---

// --- Scroll Progress Bar ---
const mainWrapper = document.getElementById('mainWrapper');
const progressBar = document.getElementById('progressBar');

function updateProgressBar() {
    const scrollTop = mainWrapper.scrollTop;
    const scrollHeight = mainWrapper.scrollHeight - mainWrapper.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercentage + '%';
}

mainWrapper.addEventListener('scroll', updateProgressBar);

// Initialize progress bar on page load
window.addEventListener('load', updateProgressBar);
// ---