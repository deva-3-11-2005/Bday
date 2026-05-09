const reasons = [
    "Your smile brightens my darkest days. ☀️",
    "The way you care for everyone around you. ❤️",
    "Your laugh is my favorite song. 🎵",
    "You always know how to make me feel special. 👑",
    "The way you look at me when you think I'm not looking. 😍",
    "Your kindness is limitless. ✨",
    "You are my best friend and my soulmate. 👫",
    "The way you always support my dreams. 🚀",
    "Because you are uniquely YOU. 💖",
    "Your intelligence and the way you handle things. 🧠",
    "The cute way you sneeze. 🤧",
    "The way you make every moment memorable. 📸",
    "Your patience even when I'm being difficult. 🌈",
    "The way your hand fits perfectly in mine. 🤝",
    "Your passion for the things you love. 🔥",
    "The way you make me want to be a better person. 🌟",
    "Your strength and resilience. 💪",
    "The way you remember the little details about us. 📝",
    "Because you make my house feel like a home. 🏠",
    "Your beautiful soul inside and out. 💎",
    "The way you can make me laugh without saying a word. 😂",
    "Because you're my favorite person to do nothing with. ☁️",
    "The way you inspire me every single day. 🎨",
    "Because you're the first person I want to talk to when I wake up. 🌅",
    "The way you love me unconditionally. ❤️🔥"
];

function pullReason() {
    const jar = document.querySelector('.jar');
    const lid = document.querySelector('.jar-lid-style');
    const display = document.getElementById('reason-display');
    const text = document.getElementById('reason-text');
    const scrollContent = document.querySelector('.scroll-content');
    
    // 1. Shaking the jar
    const tl = gsap.timeline();
    tl.to(jar, { x: -3, duration: 0.1, repeat: 5, yoyo: true })
      .to(lid, { y: -10, rotation: 15, duration: 0.6, ease: "power2.inOut" })
      .to(lid, { y: -25, rotation: -10, duration: 0.5, ease: "power2.inOut" })
      .add(() => createSealBreakEffect())
      .to(lid, { 
          y: -250, 
          x: 80, 
          rotation: 360, 
          opacity: 0, 
          duration: 1.2, 
          ease: "power2.out" 
      })
      .add(() => {
          // 2. Paper Emergence Animation
          const rolls = document.querySelectorAll('.paper-roll');
          const randomRoll = rolls[Math.floor(Math.random() * rolls.length)];
          
          // Create a clone for the emergence animation
          const emergingRoll = randomRoll.cloneNode(true);
          emergingRoll.style.position = 'fixed';
          emergingRoll.style.zIndex = '1000';
          
          // Get starting position
          const rect = randomRoll.getBoundingClientRect();
          emergingRoll.style.left = `${rect.left}px`;
          emergingRoll.style.top = `${rect.top}px`;
          emergingRoll.style.width = `${rect.width}px`;
          emergingRoll.style.height = `${rect.height}px`;
          
          document.body.appendChild(emergingRoll);
          
          // Fade out the original roll inside
          gsap.to(randomRoll, { opacity: 0, duration: 0.3 });

          // Animation timeline for the emerging paper
          const paperTl = gsap.timeline();
          
          paperTl.to(emergingRoll, {
              y: -100,
              rotation: "+=45",
              duration: 0.8,
              ease: "power2.out"
          })
          .to(emergingRoll, {
              left: "50%",
              top: "40%",
              xPercent: -50,
              yPercent: -50,
              scale: 5,
              rotation: 720,
              duration: 1.2,
              ease: "back.out(1.2)"
          })
          .add(() => {
              // 3. Transition to unrolling scroll
              const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
              text.innerText = randomReason;

              jar.classList.add('hidden-jar');
              display.classList.remove('hidden');
              
              // Hide the temporary roll as the scroll opens
              gsap.to(emergingRoll, { opacity: 0, scale: 8, duration: 0.4, onComplete: () => emergingRoll.remove() });

              // Unroll animation
              gsap.fromTo(display, 
                { scaleY: 0, opacity: 0, y: 50 }, 
                { scaleY: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" }
              );
              
              gsap.fromTo(scrollContent, 
                { height: 0, opacity: 0 }, 
                { height: "auto", opacity: 1, duration: 0.7, delay: 0.2, ease: "power2.out" }
              );

              createSparkles();
          });
      }, "-=0.6");
}

function createSealBreakEffect() {
    const jar = document.querySelector('.jar');
    for(let i=0; i<8; i++) {
        const heart = document.createElement('div');
        heart.className = 'jar-sparkle-fx';
        heart.innerHTML = '❤️';
        heart.style.left = '50%';
        heart.style.top = '10%';
        jar.appendChild(heart);
        
        gsap.to(heart, {
            y: -100 - Math.random() * 100,
            x: (Math.random() - 0.5) * 150,
            scale: 2,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => heart.remove()
        });
    }
}

function createSparkles() {
    const container = document.querySelector('.jar-container');
    for(let i=0; i<20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'jar-sparkle-fx';
        sparkle.innerHTML = ['✨', '⭐', '💖', '📜'][Math.floor(Math.random()*4)];
        sparkle.style.left = '50%';
        sparkle.style.top = '40%';
        container.appendChild(sparkle);
        
        gsap.to(sparkle, {
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400 - 150,
            scale: Math.random() * 2,
            opacity: 0,
            rotation: Math.random() * 360,
            duration: 1.5 + Math.random(),
            onComplete: () => sparkle.remove()
        });
    }
}

function closeReason() {
    const jar = document.querySelector('.jar');
    const lid = document.querySelector('.jar-lid-style');
    const display = document.getElementById('reason-display');
    const scrollContent = document.querySelector('.scroll-content');
    
    // Roll the scroll back up first
    const tl = gsap.timeline();
    
    tl.to(scrollContent, { height: 0, opacity: 0, duration: 0.5, ease: "power2.in" })
      .to(display, { scaleY: 0, opacity: 0, duration: 0.4, onComplete: () => {
          display.classList.add('hidden');
          jar.classList.remove('hidden-jar');
          
          // Animate lid flying BACK onto the jar
          gsap.fromTo(lid, 
            { y: -200, x: -50, rotation: -180, opacity: 0 },
            { y: 0, x: 0, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }
          );
          
          // Screw it back on (mini twist)
          gsap.to(lid, { rotation: 5, duration: 0.2, delay: 0.7 });
          gsap.to(lid, { rotation: 0, duration: 0.2, delay: 0.9 });
          
          gsap.from(jar, { scale: 0.9, duration: 0.6, ease: "elastic.out(1, 0.5)" });
          
          // Reset paper rolls inside
          gsap.to(".paper-roll", { y: 0, rotation: "random(-15, 15)", opacity: 1, duration: 0.5 });
      }});
}
