/* --- ФОНОВА АНІМАЦІЯ (CANVAS) --- */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 242, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 150) {
                ctx.strokeStyle = `rgba(188, 19, 254, ${1 - dist/150})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
initParticles();
animate();

/* --- ЛОГІКА КЛІКЕРА (Тільки якщо елемент існує) --- */
const coreBtn = document.getElementById('neural-core');
const scoreDisplay = document.getElementById('score-val');

if (coreBtn && scoreDisplay) {
    let score = 0;

    coreBtn.addEventListener('click', (e) => {
        // 1. Збільшити рахунок
        score++;
        scoreDisplay.textContent = score;

        // 2. Створити ефект вилітаючих бітів (0 або 1)
        const floater = document.createElement('div');
        floater.classList.add('floating-number');
        floater.textContent = Math.random() > 0.5 ? '1' : '0'; // Рандом 0 або 1
        
        // Позиціонування біля курсора
        const rect = coreBtn.getBoundingClientRect();
        // Випадкове зміщення
        const randomX = (Math.random() - 0.5) * 40;
        
        floater.style.left = (e.clientX - rect.left + randomX) + 'px';
        floater.style.top = (e.clientY - rect.top) + 'px';
        
        coreBtn.appendChild(floater);

        // 3. Видалити елемент після анімації
        setTimeout(() => {
            floater.remove();
        }, 1000);
    });
}
