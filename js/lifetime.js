// --- Lifetime Journey Animations ---
function renderLifetimeJourney() {
    const container = document.querySelector('.lifetime-container');
    if (!container) return;

    // Clear existing (keep the line)
    const line = container.querySelector('.timeline-line');
    container.innerHTML = '';
    if (line) container.appendChild(line);

    LIFETIME_DATA.forEach((item, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const card = document.createElement('div');
        card.className = `lifetime-item ${side}`;
        card.setAttribute('data-year', item.year);
        
        card.innerHTML = `
            <div class="lifetime-words">
                <h3>${item.year}</h3>
                <p>${item.text}</p>
                <span class="reveal-hint">✨ Tap to reveal...</span>
            </div>
            <div class="lifetime-image">
                <img src="${item.img}" alt="${item.year}">
            </div>
        `;
        
        container.appendChild(card);
    });
}

function initTimelineAnimations() {
    console.log("Initializing Lifetime Journey Animations...");
    
    // First render the data
    renderLifetimeJourney();

    gsap.from("#timeline .section-title", { y: -30, opacity: 0, duration: 1 });
    
    const items = document.querySelectorAll('.lifetime-item');
    const cursorContainer = document.getElementById('cursor-image-container');
    const cursorImg = document.getElementById('cursor-img');
    
    items.forEach((item, index) => {
        const xOffset = item.classList.contains('left') ? -50 : 50;
        
        gsap.fromTo(item, 
            { opacity: 0, x: xOffset },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: 0.5 + (index * 0.15),
                ease: "power2.out"
            }
        );

        // Cursor Follower Logic
        item.addEventListener('mouseenter', (e) => {
            const imgUrl = item.querySelector('.lifetime-image img').src;
            if (cursorImg) cursorImg.src = imgUrl;
            if (cursorContainer) gsap.to(cursorContainer, { opacity: 1, scale: 1, duration: 0.3 });
        });

        item.addEventListener('mousemove', (e) => {
            if (cursorContainer) {
                gsap.to(cursorContainer, {
                    x: e.clientX + 20,
                    y: e.clientY + 20,
                    duration: 0.1
                });
            }
        });

        item.addEventListener('mouseleave', () => {
            if (cursorContainer) gsap.to(cursorContainer, { opacity: 0, scale: 0.5, duration: 0.3 });
        });

        // Touch support for mobile cursor effect
        item.addEventListener('touchstart', (e) => {
            const imgUrl = item.querySelector('.lifetime-image img').src;
            if (cursorImg) cursorImg.src = imgUrl;
            const touch = e.touches[0];
            if (cursorContainer) {
                gsap.set(cursorContainer, { x: touch.clientX - 90, y: touch.clientY - 200 });
                gsap.to(cursorContainer, { opacity: 1, scale: 1, duration: 0.3 });
            }
        }, {passive: true});

        item.addEventListener('touchend', () => {
            if (cursorContainer) gsap.to(cursorContainer, { opacity: 0, scale: 0.5, duration: 0.3 });
        }, {passive: true});

        item.addEventListener('click', () => {
            item.classList.toggle('revealed');
            gsap.to(item, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });
        });
    });

    gsap.from("#timeline .next-btn", { opacity: 0, y: 20, duration: 1, delay: 2 });
}
