document.addEventListener("DOMContentLoaded", () => {
    
    // --- Falling Petals ---
    const petalsContainer = document.getElementById('petals-container');
    const petalColors = ['#ff3366', '#ffb3c6', '#d10047', '#ff6699'];

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        const size = Math.random() * 15 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.top = `-20px`;
        petal.style.backgroundColor = petalColors[Math.floor(Math.random() * petalColors.length)];
        
        petalsContainer.appendChild(petal);

        gsap.to(petal, {
            y: window.innerHeight + 50,
            x: `+=${Math.random() * 200 - 100}`,
            rotation: Math.random() * 360,
            duration: Math.random() * 5 + 5,
            ease: "none",
            onComplete: () => {
                petal.remove();
            }
        });
    }

    // Continuously generate petals
    setInterval(createPetal, 400);
    // Initial burst
    for(let i=0; i<15; i++) { setTimeout(createPetal, Math.random() * 2000); }

    // --- Loading Messages ---
    const loadingTexts = [
        "Sprinkling extra love on your special day...",
        "Loading a lifetime of happiness for you...",
        "Counting every heartbeat until your smile...",
        "Wrapping up your birthday surprises...",
        "Preparing a journey through 20 beautiful years...",
        "Fetching all the hugs and kisses...",
        "Mixing a potion of pure joy for Deepika...",
        "Painting the world in your favorite colors...",
        "Gathering stardust for your wishes...",
        "Filling the world with your favorite flowers...",
        "Synchronizing our hearts for the journey...",
        "Brewing a cup of pure happiness...",
        "Unlocking a treasure chest of memories..."
    ];

    function getRandomLoadingText() {
        return loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
    }

    // Set initial random text
    if (document.getElementById('transition-text')) {
        document.getElementById('transition-text').innerText = getRandomLoadingText();
    }

    // --- Initial Load ---
    setTimeout(() => {
        gsap.to("#page-transition", {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                document.getElementById('page-transition').style.display = 'none';
                if (typeof initHeroAnimations === 'function') initHeroAnimations();
            }
        });
    }, 2500);

    // --- Page Navigation Logic ---
    const buttons = document.querySelectorAll('.next-btn');
    
    function performNavigation(targetId, loadText) {
        const targetSection = document.getElementById(targetId);
        const currentSection = document.querySelector('.page-section.active');
        
        if (!targetSection || !currentSection) return;

        document.getElementById('transition-text').innerText = loadText || getRandomLoadingText();
        document.getElementById('page-transition').style.display = 'flex';
        
        gsap.to("#page-transition", {
            opacity: 1,
            duration: 0.6,
            onComplete: () => {
                currentSection.classList.remove('active');
                targetSection.classList.add('active');
                
                if(targetId === 'timeline' && typeof initTimelineAnimations === 'function') initTimelineAnimations();
                if(targetId === 'gallery' && typeof initGalleryAnimations === 'function') initGalleryAnimations();
                if(targetId === 'loveletter' && typeof initLetterAnimations === 'function') initLetterAnimations();
                if(targetId === 'surprise' && typeof initSurpriseAnimations === 'function') initSurpriseAnimations();
                if(targetId === 'hero' && typeof initHeroAnimations === 'function') initHeroAnimations();
                if(targetId === 'gift-puzzle' && typeof initPuzzleAnimations === 'function') initPuzzleAnimations();
                if(targetId === 'gift-typing' && typeof initTypingAnimations === 'function') initTypingAnimations();
                if(targetId === 'gift-quiz' && typeof initQuizAnimations === 'function') initQuizAnimations();
                if(targetId === 'final-surprise' && typeof initFinalAnimations === 'function') initFinalAnimations();
                
                setTimeout(() => {
                    gsap.to("#page-transition", {
                        opacity: 0,
                        duration: 0.8,
                        onComplete: () => {
                            document.getElementById('page-transition').style.display = 'none';
                        }
                    });
                }, 1200);
            }
        });
    }

    // Expose globally
    window.navigateToSection = performNavigation;

    // Attach to existing and future buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.next-btn, .back-corner-btn');
        if (btn) {
            const targetId = btn.getAttribute('data-target');
            if (targetId) performNavigation(targetId);
        }
    });

    // --- Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Open lightbox when any image in timeline or gallery is clicked
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG' && (e.target.closest('.lifetime-image') || e.target.closest('.polaroid'))) {
            lightboxImg.src = e.target.src;
            lightbox.classList.add('active');
        }
    });

    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});

// --- Hero Animations ---
function initHeroAnimations() {
    gsap.from(".hero-content", { y: 50, opacity: 0, duration: 1.5, ease: "power3.out" });
    gsap.from(".glass-heart", { scale: 0, opacity: 0, duration: 1, delay: 0.5, ease: "back.out(1.5)" });
}

// --- Secret Gift Logic ---
let heartClicks = 0;
const glassHeart = document.querySelector('.glass-heart');

if (glassHeart) {
    glassHeart.style.cursor = 'pointer';
    glassHeart.addEventListener('click', () => {
        heartClicks++;
        
        // Small feedback animation
        gsap.to(glassHeart, { scale: 1.3, duration: 0.1, yoyo: true, repeat: 1 });
        
        if (heartClicks === 3) {
            showSecretGift();
            heartClicks = 0; // Reset
        }
    });
}

function showSecretGift() {
    const overlay = document.getElementById('secret-gift-overlay');
    if (overlay) {
        overlay.classList.add('show');
        gsap.from(".secret-card", { scale: 0.5, rotation: -10, duration: 0.6, ease: "back.out(1.7)" });
    }
}

function hideSecretGift() {
    const overlay = document.getElementById('secret-gift-overlay');
    if (overlay) {
        gsap.to(".secret-card", { scale: 0.5, opacity: 0, duration: 0.3, onComplete: () => {
            overlay.classList.remove('show');
            gsap.set(".secret-card", { scale: 1, opacity: 1 });
        }});
    }
}
