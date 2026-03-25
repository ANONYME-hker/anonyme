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
    const symbols = ['✨', '⭐', '🌟', '�', '🌸'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 8 + 12) + 'px';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 2500);
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
            showMessage("Ce moment était magique ✨");
        } else if (clickCount === 2) {
            showMessage("Oceanne, tu es vraiment spéciale 🌟");
            createRainbowHearts();
        } else if (clickCount === 3) {
            showMessage("J'ai hâte de te revoir �");
            createFireworks();
        } else if (clickCount === 4) {
            showMessage("Ce baiser m'a marqué 💋");
            loveButton.textContent = "Magique!";
            loveButton.style.background = "linear-gradient(45deg, #ff1744, #f50057)";
        } else {
            showMessage("Pour la suite de notre histoire 📖");
            createMassiveHeartExplosion();
        }
    });
}

function createHeartExplosion() {
    const explosion = document.querySelector('.heart-explosion');
    explosion.innerHTML = '';
    
    const symbols = ['✨', '⭐', '🌟', '�', '🌸'];
    
    for (let i = 0; i < 15; i++) {
        const symbol = document.createElement('div');
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.position = 'absolute';
        symbol.style.fontSize = (Math.random() * 15 + 12) + 'px';
        symbol.style.left = '50%';
        symbol.style.top = '50%';
        symbol.style.transform = 'translate(-50%, -50%)';
        symbol.style.animation = `explodeHeart 1s ease-out forwards`;
        symbol.style.animationDelay = (i * 0.05) + 's';
        
        explosion.appendChild(symbol);
        
        setTimeout(() => {
            symbol.remove();
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
        color: #74b9ff;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.3rem;
        font-weight: 600;
        z-index: 1000;
        animation: messagePop 0.5s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    messageDiv.textContent = text;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 500);
    }, 2500);
}

function createGentleHearts() {
    const colors = ['#74b9ff', '#a29bfe', '#fd79a8', '#fdcb6e', '#55a3ff'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '🌸';
            heart.style.cssText = `
                position: fixed;
                color: ${colors[i % colors.length]};
                font-size: ${Math.random() * 15 + 15}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                z-index: 999;
                animation: gentleFloat 4s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 150);
    }
}

function createSparkles() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createGentleSparkle();
        }, i * 800);
    }
}

function createGentleSparkle() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.6;
    const colors = ['#74b9ff', '#a29bfe', '#ffeaa7', '#55efc4'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            z-index: 998;
        `;
        
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = Math.random() * 60 + 30;
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
            velocityY += 1;
            opacity -= 0.015;
            
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

function createGentleExplosion() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '✨';
            heart.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 15}px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
                animation: massiveExplosion 2s ease-out forwards;
            `;
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 80;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            heart.style.setProperty('--x', x + 'px');
            heart.style.setProperty('--y', y + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 60);
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
            showMessage("Ambiance douce activée 🎵");
        } else {
            musicNote.textContent = '🎵';
            musicNote.style.animation = 'bounce 2s infinite';
            showMessage("Ambiance en pause");
        }
    });
}

function initPhotoGallery() {
    const photos = document.querySelectorAll('.photo-placeholder');
    
    photos.forEach((photo, index) => {
        photo.addEventListener('click', function() {
            const messages = [
                "Ta gentillesse me touche énormément 🥰",
                "Ta beauté intérieure rayonne ✨",
                "Ton intelligence m'impressionne 🧠",
                "Ta personnalité est unique 🌺"
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
    
    @keyframes gentleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-400px) rotate(180deg);
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
