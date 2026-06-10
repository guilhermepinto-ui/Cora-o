const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let start = null;

function heart(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t)
    );

    return { x, y };
}

function createParticles() {
    particles = [];

    for (let t = 0; t < Math.PI * 2; t += 0.006) {
        const pos = heart(t);

        for (let i = 0; i < 7; i++) {
            const scale = 0.35 + Math.random() * 0.65;

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,

                tx: canvas.width / 2 + pos.x * 20 * scale,
                ty: canvas.height / 2 + pos.y * 20 * scale,

                size: Math.random() * 1.6 + 0.6
            });
        }
    }
}

function animate(timestamp) {
    if (!start) start = timestamp;

    const progress = Math.min((timestamp - start) / 3000, 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        const x = p.x + (p.tx - p.x) * progress;
        const y = p.y + (p.ty - p.y) * progress;

        ctx.beginPath();
        ctx.shadowColor = "#ff69b4";
        ctx.shadowBlur = 6;
        ctx.fillStyle = "#ff69b4";
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // TEXTO NO CENTRO
    ctx.save();

    ctx.shadowColor = "#ff69b4";
    ctx.shadowBlur = 15;

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        "TE AMO ❤️",
        canvas.width / 2,
        canvas.height / 2 - 5
    );

    ctx.restore();

    requestAnimationFrame(animate);
}

createParticles();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    start = null;
    createParticles();
});