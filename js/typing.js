function initTypingAnimations() {
    gsap.from(".typing-container", { y: 30, opacity: 0, duration: 1 });
}

document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById('send-msg-btn');
    const typingBox = document.getElementById('typing-box');

    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const message = typingBox.value.trim();
            if (message) {
                // Visual feedback: Sending state
                sendBtn.disabled = true;
                sendBtn.innerHTML = "Sending... ✨";

                // Use Formspree to send the message in the background
                // USER: Replace 'YOUR_FORMSPREE_ID' with your actual Formspree ID (e.g., xoqpkgnw)
                const formspreeId = "YOUR_FORMSPREE_ID"; 
                
                fetch(`https://formspree.io/f/${formspreeId}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        message: message,
                        _subject: "New Birthday Message from Deepika! ❤️"
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        sendBtn.innerHTML = "Sent! ❤️";
                        typingBox.value = ""; // Clear the box after sending
                    } else {
                        sendBtn.innerHTML = "Failed to send 😕";
                    }
                    
                    setTimeout(() => {
                        sendBtn.disabled = false;
                        sendBtn.innerHTML = "Send Message 💌";
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    sendBtn.innerHTML = "Error! Try again.";
                    sendBtn.disabled = false;
                });
            } else {
                gsap.to(typingBox, { x: [-10, 10, -10, 10, 0], duration: 0.4 });
                typingBox.placeholder = "Please type something first!";
            }
        });
    }
});
