// Initialize canvas for particles
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.01;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
}

function initParticles() {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    if (Math.random() < 0.3) {
        particles.push(new Particle());
    }
    
    particles = particles.filter(p => p.opacity > 0);
    requestAnimationFrame(animateParticles);
}

// Create stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Floating sparkles
function createFloatingSparkles() {
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'particle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
        document.querySelector('.particles').appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 4000);
    }, 300);
}

// Slideshow
let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].classList.add("active");
    dots[slideIndex-1].className += " active";
}

// Surprise
function showSurprise() {
    const surprise = document.getElementById('surprise');
    surprise.classList.toggle('hidden');
    
    if (!surprise.classList.contains('hidden')) {
        createConfetti();
        
        // Show all hidden sections with staggered animations
        const sections = document.querySelectorAll('section.hidden');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.remove('hidden');
                section.style.animation = `fadeInUp 0.8s ease forwards`;
            }, index * 300);
        });
    }
}

// Confetti explosion
function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff6b9d', '#667eea', '#f093fb', '#00f2fe'][Math.floor(Math.random() * 4)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);

        let vx = (Math.random() - 0.5) * 8;
        let vy = (Math.random() - 0.5) * 8;
        let life = 2;

        const interval = setInterval(() => {
            let rect = confetti.getBoundingClientRect();
            confetti.style.left = rect.left + vx + 'px';
            confetti.style.top = rect.top + vy + 'px';
            vy += 0.2;
            life -= 0.02;
            confetti.style.opacity = life;

            if (life <= 0) {
                clearInterval(interval);
                confetti.remove();
            }
        }, 16);
    }
}

// Reasons
const reasons = [
    "Your smile lights up my world.",
    "The way you laugh at my jokes.",
    "How you understand me like no one else.",
    "Your kindness and compassion.",
    "The adventures we plan together.",
    "Your intelligence and wit.",
    "How you make ordinary days extraordinary.",
    "Your beautiful eyes.",
    "The sound of your voice.",
    "The way you care about me."
];

let reasonIndex = 0;

function addReason() {
    const reasonsList = document.getElementById('reasonsList');
    if (reasonIndex < reasons.length) {
        const li = document.createElement('li');
        li.textContent = reasons[reasonIndex];
        li.style.animationDelay = reasonIndex * 0.1 + 's';
        reasonsList.appendChild(li);
        reasonIndex++;
    } else {
        alert("That's all for now, but I have infinite reasons! I love you! 💕");
    }
}

// Hug Counter
let hugCount = 0;
function sendHug() {
    hugCount++;
    document.getElementById('hugCount').textContent = hugCount;
    createHeartBurst();
}

function createHeartBurst() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = Math.random() * window.innerHeight + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = `float ${Math.random() * 2 + 2}s ease-out forwards`;
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 2500);
    }
}

// User Messages
function addMessage() {
    const input = document.getElementById('newMessage');
    const message = input.value.trim();
    if (message) {
        const div = document.createElement('div');
        div.textContent = message;
        document.getElementById('userMessages').appendChild(div);
        input.value = '';
    }
}

// Type Letter
function typeLetter() {
    const letter = document.getElementById('loveLetter');
    if (!letter.classList.contains('shown')) {
        letter.classList.add('shown');
        letter.textContent = '';
        const text = "My dearest Sidra, It’s strange how someone can become so important to you in such a quiet, effortless way. You slipped into my days without warning… and now even the simplest moments feel different because of you. Sometimes I catch myself thinking about you out of nowhere, the way you talk, the softness in your energy, even the little things like how much you love lilies and those gentle shades of pink… and it all just makes me smile without trying. Distance is there, I know. But it doesn’t feel like something that keeps us apart, it just makes what we have feel more meaningful, more intentional. Like every word, every moment we share actually matters.I don’t know what the future holds, and maybe that’s scary. But I do know that right now, in this moment, I’m grateful for you. For your kindness, your laughter, your presence in my life. You’ve become a part of my world in a way that feels so natural, so right. And the truth is… I’m not just enjoying this for what it is now. I find myself wondering where this could go, how much more there is to discover about you, how many more memories we haven’t even created yet. You’ve become something rare to me, Sidra. Something I don’t want to rush, but definitely don’t want to lose.";
        let i = 0;
        const timer = setInterval(() => {
            letter.textContent += text[i];
            i++;
            if (i >= text.length) clearInterval(timer);
        }, 30);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initParticles();
    animateParticles();
    createFloatingSparkles();
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});