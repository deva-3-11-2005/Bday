// --- Letter Animations ---
let envelopeOpen = false;

function initLetterAnimations() {
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const theLetter = document.getElementById('the-letter');

    // Reset envelope state if returning
    if (envelope) envelope.classList.remove('open');
    if (envelopeWrapper) gsap.set(envelopeWrapper, { scale: 1, y: 0 });
    envelopeOpen = false;
    gsap.set(["#letter-title", "#letter-subtitle"], {opacity: 1, y: 0});

    // Reset letter state
    if (theLetter) theLetter.classList.remove('flipped');

    gsap.from("#letter-title", { y: -30, opacity: 0, duration: 1 });
    gsap.from("#letter-subtitle", { y: -20, opacity: 0, duration: 1, delay: 0.3 });
    gsap.from(".envelope-wrapper", { y: 50, opacity: 0, duration: 1, delay: 0.6 });

    // One-time listener attachment check
    if (envelopeWrapper && !envelopeWrapper.dataset.listener) {
        envelopeWrapper.addEventListener('click', () => {
            if(!envelopeOpen) {
                gsap.to(envelopeWrapper, {
                    scale: 1.2,
                    y: -50,
                    duration: 1,
                    ease: "power2.inOut"
                });
                
                gsap.to(["#letter-title", "#letter-subtitle"], {opacity: 0, y: -20, duration: 0.5});
                
                setTimeout(() => {
                    envelope.classList.add('open');
                    envelopeOpen = true;
                }, 800);
            }
        });
        envelopeWrapper.dataset.listener = "true";
    }

    if(theLetter && !theLetter.dataset.listener) {
        theLetter.addEventListener('click', (e) => {
            e.stopPropagation(); 
            if(envelopeOpen) {
                theLetter.classList.toggle('flipped');
            }
        });
        theLetter.dataset.listener = "true";
    }
}
