// --- Gallery Animations ---
function renderGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    container.innerHTML = '';

    GALLERY_DATA.forEach((item, index) => {
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        
        // Random positioning within container
        const x = Math.random() * 60 + 10; // 10% to 70%
        const y = Math.random() * 50 + 5;  // 5% to 55%
        const rot = Math.random() * 30 - 15; // -15deg to 15deg

        polaroid.style.left = `${x}%`;
        polaroid.style.top = `${y}%`;
        polaroid.style.transform = `rotate(${rot}deg)`;
        polaroid.style.zIndex = index + 1;

        polaroid.innerHTML = `
            <img src="${item.img}" alt="Memory">
            <p class="handwriting">${item.caption}</p>
        `;
        
        container.appendChild(polaroid);
    });
}

function initGalleryAnimations() {
    console.log("Initializing Gallery Animations...");
    
    // Render first
    renderGallery();

    const polaroids = document.querySelectorAll('.polaroid');
    gsap.from("#gallery .section-title", { y: -30, opacity: 0, duration: 1 });
    
    gsap.from(polaroids, {
        y: -100,
        opacity: 0,
        rotation: () => Math.random() * 40 - 20,
        duration: 1.5,
        stagger: 0.2,
        delay: 0.5,
        ease: "bounce.out"
    });
    
    gsap.from("#gallery .next-btn", { opacity: 0, y: 20, duration: 1, delay: 2 });
}
