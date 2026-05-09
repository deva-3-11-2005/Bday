/**
 * College Polaroid Collage Logic
 * Photos appear at random positions and stack up
 */

let slideshowInterval;
let currentSlideIndex = 0;
const MAX_VISIBLE_SLIDES = 8; // How many slides to keep in the collage stack

function initFinalAnimations() {
    const slideshowContainer = document.getElementById('final-slideshow');
    const ghostYear = document.getElementById('slideshow-year');
    
    if (!slideshowContainer || !LIFETIME_DATA) return;

    // Reset
    slideshowContainer.innerHTML = '';
    currentSlideIndex = 0;
    if (slideshowInterval) clearInterval(slideshowInterval);

    function createPolaroid(data, index) {
        const container = document.createElement('div');
        container.classList.add('slide-container');
        
        // Random position within safe bounds (avoid edges where text is)
        const x = Math.random() * 40 + 30; // 30% to 70%
        const y = Math.random() * 40 + 20; // 20% to 60%
        const rotation = (Math.random() - 0.5) * 40; // -20 to +20 deg
        
        container.style.left = `${x}%`;
        container.style.top = `${y}%`;
        // Start slightly off-screen for entrance animation
        container.style.transform = `translate(-50%, -50%) scale(1.5) rotate(${rotation + 20}deg)`;

        const img = document.createElement('img');
        img.src = data.img;
        img.alt = `Year ${data.year}`;

        const caption = document.createElement('div');
        caption.classList.add('polaroid-caption');
        caption.innerText = data.year;

        container.appendChild(img);
        container.appendChild(caption);
        slideshowContainer.appendChild(container);

        // Animate entrance
        setTimeout(() => {
            container.classList.add('active');
            container.style.transform = `translate(-50%, -50%) scale(1) rotate(${rotation}deg)`;
        }, 100);

        // Manage stack: tag older slides
        const allSlides = slideshowContainer.querySelectorAll('.slide-container');
        if (allSlides.length > 1) {
            allSlides[allSlides.length - 2].classList.add('old');
        }

        // Remove very old slides to keep DOM clean but keep the collage look
        if (allSlides.length > MAX_VISIBLE_SLIDES) {
            const oldest = allSlides[0];
            oldest.style.opacity = '0';
            setTimeout(() => oldest.remove(), 1200);
        }

        // Update ghost year
        if (ghostYear) {
            ghostYear.innerText = data.year.split(' ').pop();
        }
    }

    // Initial first slide
    createPolaroid(LIFETIME_DATA[0], 0);

    // Start stacking
    slideshowInterval = setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % LIFETIME_DATA.length;
        createPolaroid(LIFETIME_DATA[currentSlideIndex], currentSlideIndex);
    }, 4000);

    // Fade in letter
    gsap.fromTo(".final-letter", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power3.out" }
    );
}

window.addEventListener('beforeunload', () => {
    if (slideshowInterval) clearInterval(slideshowInterval);
});
