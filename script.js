document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    createStars();
    initializeInteractions();
    createHeartExplosion();
    initMusicToggle();
    initPhotoGallery();
});

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts');
    const hearts = ['💕', '💖', '💗', '💝', '💓', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 2000);
}

function createStars() {
    const floatingHearts = document.querySelector('.floating-hearts');
    
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'floating-heart';
        star.textContent = '✨';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 4 + 4) + 's';
        star.style.fontSize = (Math.random() * 8 + 12) + 'px';
        
        floatingHearts.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 8000);
    }, 3000);
}

function initializeInteractions() {
    const loveButton = document.getElementById('loveBtn');
    const surprise = document.getElementById('surprise');
    let clickCount = 0;
    
    loveButton.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount === 1) {
            surprise.classList.add('show');
            createHeartExplosion();
            showMessage("Tu es incroyable! 💕");
        } else if (clickCount === 2) {
            showMessage("Oceanne, tu es mon soleil ☀️");
            createRainbowHearts();
        } else if (clickCount === 3) {
            showMessage("Je t'aime plus que tout au monde 🌍");
            createFireworks();
        } else if (clickCount === 4) {
            showMessage("Tu es la femme de ma vie 💑");
            loveButton.textContent = "Je t'aime!";
            loveButton.style.background = "linear-gradient(45deg, #ff1744, #f50057)";
        } else {
            showMessage("Pour toujours et à jamais ❤️");
            createMassiveHeartExplosion();
        }
    });
}

function createHeartExplosion() {
    const explosion = document.querySelector('.heart-explosion');
    explosion.innerHTML = '';
    
    const hearts = ['💕', '💖', '💗', '💝', '💓', '💞', '❤️', '💘'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.animation = `explodeHeart 1s ease-out forwards`;
        heart.style.animationDelay = (i * 0.05) + 's';
        
        explosion.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

function showMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        color: #ff1744;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 1000;
        animation: messagePop 0.5s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    messageDiv.textContent = text;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 500);
    }, 2000);
}

function createRainbowHearts() {
    const colors = ['#ff1744', '#f50057', '#d500f9', '#651fff', '#3d5afe', '#2979ff', '#00b0ff', '#00e5ff', '#1de9b6', '#00e676', '#76ff03', '#c6ff00', '#ffea00', '#ff3d00', '#ff1744'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💕';
            heart.style.cssText = `
                position: fixed;
                color: ${colors[i % colors.length]};
                font-size: ${Math.random() * 20 + 20}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                z-index: 999;
                animation: rainbowFloat 3s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

function createFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 500);
    }
}

function createFirework() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.5;
    const colors = ['#ff1744', '#f50057', '#ffea00', '#00e676', '#00b0ff', '#651fff'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            z-index: 998;
        `;
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = Math.random() * 100 + 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let opacity = 1;
        let currentX = x;
        let currentY = y;
        let velocityY = vy;
        
        const animate = () => {
            currentX += vx * 0.02;
            currentY += velocityY * 0.02;
            velocityY += 2; // gravity
            opacity -= 0.02;
            
            particle.style.left = currentX + 'px';
            particle.style.top = currentY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

function createMassiveHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 30 + 20}px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
                animation: massiveExplosion 2s ease-out forwards;
            `;
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 300 + 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            heart.style.setProperty('--x', x + 'px');
            heart.style.setProperty('--y', y + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 50);
    }
}

function initMusicToggle() {
    const musicNote = document.querySelector('.music-note');
    let isPlaying = false;
    
    musicNote.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            musicNote.textContent = '🎶';
            musicNote.style.animation = 'spin 2s linear infinite';
            showMessage("Musique d'amour activée 🎵");
        } else {
            musicNote.textContent = '🎵';
            musicNote.style.animation = 'bounce 2s infinite';
            showMessage("Musique en pause");
        }
    });
}

function initPhotoGallery() {
    const photos = document.querySelectorAll('.photo-placeholder');
    
    photos.forEach((photo, index) => {
        photo.addEventListener('click', function() {
            const messages = [
                "Ce souvenir me fait sourire 😊",
                "Notre bonheur est gravé ici 💕",
                "Chaque moment avec toi est magique ✨",
                "Tu rends tout plus beau 🌹"
            ];
            
            showMessage(messages[index]);
            
            photo.style.animation = 'photoZoom 0.5s ease';
            setTimeout(() => {
                photo.style.animation = '';
            }, 500);
        });
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes explodeHeart {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--x, 0)), calc(-50% + var(--y, 0))) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes messagePop {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    @keyframes rainbowFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-300px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes massiveExplosion {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1.5);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes photoZoom {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('mousemove', function(e) {
    if (Math.random() < 0.02) {
        const trail = document.createElement('div');
        trail.textContent = '✨';
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 12px;
            pointer-events: none;
            z-index: 997;
            animation: mouseTrail 1s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
    }
});

const mouseTrailStyle = document.createElement('style');
mouseTrailStyle.textContent = `
    @keyframes mouseTrail {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(mouseTrailStyle);
