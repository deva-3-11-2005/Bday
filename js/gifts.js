// --- Surprise Animations ---
function initSurpriseAnimations() {
    gsap.fromTo("#surprise .section-title", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo("#surprise p", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo(".gift-box-realistic", { scale: 0, opacity: 0, rotation: -45 }, { scale: 1, opacity: 1, rotation: 0, duration: 1, stagger: 0.2, delay: 0.4, ease: "back.out(1.7)" });
    gsap.fromTo("#surprise .next-btn", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1.5 });
}

// Global function for gift clicks
function openGift(element, type) {
    if (element.classList.contains('opened')) return;
    
    // Add opened class to trigger CSS lid transition
    element.classList.add('opened');
    
    // Cute jump animation when opening
    gsap.to(element, { 
        y: -20, 
        duration: 0.3, 
        yoyo: true, 
        repeat: 1, 
        ease: "power2.out" 
    });

    // Small burst of confetti/petals
    for(let i=0; i<20; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff3366', '#ffb3c6', '#d10047', '#fff', '#ffd700'][Math.floor(Math.random()*5)];
        confetti.style.top = '20%'; // Burst from the top where the lid opens
        confetti.style.left = '50%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10';
        element.appendChild(confetti);
        
        gsap.to(confetti, {
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 1) * 300, // Burst upwards
            rotation: Math.random() * 720,
            opacity: 0,
            duration: 1.5 + Math.random(),
            ease: 'power2.out',
            onComplete: () => confetti.remove()
        });
    }

    // Navigate to the specific gift section after a short delay
    setTimeout(() => {
        if (type === 'puzzle') {
            navigateToSection('gift-puzzle', 'Shuffling the pieces...');
            initPuzzle();
        } else if (type === 'jar') {
            navigateToSection('gift-jar', 'Opening the jar of love...');
        } else if (type === 'quiz') {
            window.location.href = 'quiz.html';
        }
    }, 1200);
}
