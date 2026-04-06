/* ============================================
   PARA REBECA ❤️  —  script.js  (PSICOLOGÍA)
   ============================================ */

// ─── Frases flotantes ──────────────────────────
const FRASES = [
    "mi futura psicóloga ❤️",
    "mi mujer preciosa",
    "mi tesorito",
    "eres increíble mi niña",
    "mi enojonaa",
    "brillante y hermosa",
    "tan orgulloso de ti",
    "te admiro mucho mi reina",
    "eres capaz de todo",
    "te quiero muchote",
    "mi guerrera",
    "eres brillante",
    "siempre contigo",
    "mi vida entera",
    "❤️",
    "✦",
    "mi amor",
    "lo mejor que me pasó",
    "🧠❤️",
];

function spawnPhrase() {
    const container = document.getElementById("floatingPhrases");
    if (!container) return;
    const el = document.createElement("span");
    el.classList.add("float-phrase");
    el.textContent = FRASES[Math.floor(Math.random() * FRASES.length)];
    const x    = Math.random() * 95;
    const dur  = 10 + Math.random() * 14;
    const rot  = (Math.random() - 0.5) * 20;
    const size = 0.55 + Math.random() * 0.6;
    el.style.left              = x + "%";
    el.style.bottom            = "-5%";
    el.style.animationDuration = dur + "s";
    el.style.setProperty("--rot", rot + "deg");
    el.style.fontSize          = size + "rem";
    el.style.animationDelay    = "0s";
    container.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 500);
}

(function initPhrases() {
    for (let i = 0; i < 6; i++) setTimeout(spawnPhrase, i * 700);
    setInterval(spawnPhrase, 1800);
})();

// ─── Partículas neuronales de fondo ───────────────
function spawnParticle() {
    const container = document.getElementById("bgParticles");
    if (!container) return;
    // mix de emojis + mini-sinapsis SVG
    const emojis = ["❤️", "🧠", "✨", "💜", "🌸", "🔮"];
    const el = document.createElement("div");
    el.style.cssText = `
        position: absolute;
        font-size: ${9 + Math.random() * 13}px;
        left: ${Math.random() * 100}%;
        bottom: -60px;
        opacity: 0;
        animation: particleFloat ${7 + Math.random() * 8}s linear forwards;
        pointer-events: none;
        user-select: none;
    `;
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    if (!document.getElementById("particleStyle")) {
        const style = document.createElement("style");
        style.id = "particleStyle";
        style.textContent = `
            @keyframes particleFloat {
                0%   { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; }
                15%  { opacity: 0.6; }
                80%  { opacity: 0.28; }
                100% { transform: translateY(-110vh) scale(1) rotate(360deg); opacity: 0; }
            }`;
        document.head.appendChild(style);
    }
    container.appendChild(el);
    setTimeout(() => el.remove(), 15000);
}
setInterval(spawnParticle, 2200);

// ─── Pulso neuronal SVG en el fondo ────────────────
(function initNeuralBg() {
    const container = document.getElementById("bgParticles");
    if (!container) return;

    function spawnNeuralPulse() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const size = 60 + Math.random() * 80;
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.style.cssText = `
            position: absolute;
            left: ${Math.random() * 95}%;
            bottom: -${size}px;
            opacity: 0;
            pointer-events: none;
            animation: particleFloat ${12 + Math.random() * 10}s linear forwards;
        `;

        // Neurona simple: nodo central + dendritas
        const cx = 50, cy = 50;
        const arms = 4 + Math.floor(Math.random() * 3);
        let svgContent = `<circle cx="${cx}" cy="${cy}" r="5" fill="rgba(155,107,185,0.5)"/>`;
        for (let i = 0; i < arms; i++) {
            const angle = (i / arms) * Math.PI * 2;
            const len = 18 + Math.random() * 14;
            const ex = cx + Math.cos(angle) * len;
            const ey = cy + Math.sin(angle) * len;
            svgContent += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}"
                stroke="rgba(155,107,185,0.35)" stroke-width="1.2"/>
                <circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="2.5"
                fill="rgba(201,168,232,0.45)"/>`;
        }
        svg.innerHTML = svgContent;
        container.appendChild(svg);
        setTimeout(() => svg.remove(), 22000);
    }

    setInterval(spawnNeuralPulse, 4500);
})();

// ─── Carrusel ──────────────────────────────────
(function initCarousel() {
    const track   = document.getElementById("carouselTrack");
    const dotsEl  = document.getElementById("carouselDots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (!track) return;

    const slides = Array.from(track.querySelectorAll(".slide"));
    const total  = slides.length;
    let current  = 0;
    let autoplayTimer = null;

    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        dot.setAttribute("aria-label", `Slide ${i + 1}`);
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goTo(i));
        dotsEl.appendChild(dot);
    });

    function updateDots() {
        dotsEl.querySelectorAll(".dot").forEach((d, i) =>
            d.classList.toggle("active", i === current));
    }

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        updateDots();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    prevBtn?.addEventListener("click", () => { resetAutoplay(); prev(); });
    nextBtn?.addEventListener("click", () => { resetAutoplay(); next(); });

    let touchStartX = 0;
    track.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    track.addEventListener("touchend",   e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) { resetAutoplay(); dx < 0 ? next() : prev(); }
    });

    function startAutoplay() { autoplayTimer = setInterval(next, 5000); }
    function resetAutoplay() { clearInterval(autoplayTimer); startAutoplay(); }
    startAutoplay();
})();

// ─── Contador de relación ──────────────────────
(function initCounter() {
    const START = new Date(2026, 1, 9, 0, 0, 0); // 9 de febrero de 2026

    const elDays  = document.getElementById("cntDays");
    const elHours = document.getElementById("cntHours");
    const elMins  = document.getElementById("cntMins");
    const elSecs  = document.getElementById("cntSecs");
    if (!elDays) return;

    let prevSecs = -1;
    function pad(n, len = 2) { return String(n).padStart(len, "0"); }

    function tick() {
        const now      = new Date();
        const diff     = Math.max(0, now - START);
        const totalSec = Math.floor(diff / 1000);
        const secs     = totalSec % 60;
        const mins     = Math.floor(totalSec / 60) % 60;
        const hours    = Math.floor(totalSec / 3600) % 24;
        const days     = Math.floor(totalSec / 86400);

        elDays.textContent  = pad(days, 3);
        elHours.textContent = pad(hours);
        elMins.textContent  = pad(mins);
        elSecs.textContent  = pad(secs);

        if (secs !== prevSecs) {
            elSecs.classList.remove("tick");
            void elSecs.offsetWidth;
            elSecs.classList.add("tick");
            prevSecs = secs;
        }
    }
    tick();
    setInterval(tick, 1000);
})();

// ─── Jardín de momentos ────────────────────────
(function initGarden() {

    const MOMENTS = [
        {
            chapter: "Capítulo I",
            title: "La primera vez que nos vimos",
            badge: "El inicio de todo",
            text: "No hubo foto pero si momentos de diversion verdad mi amorcitoooo",
            phrase: "\"El día que cambió mi historia para siempre al conocerte.\"",
            photo: "gato.jpeg",
        },
        {
            chapter: "Capítulo II",
            title: "Nuestra primera foto juntos y besito incluido",
            badge: "El inicio de nosotros",
            text: "Me acuerdo ese dia mi amorcito, me dejaste mudo WOW en todo el camino hacia la casa no hable nada y va solo pensando en ti mi amoooor",
            phrase: "\"Ni el tiempo senti a tu lado.\"",
            photo: "beso.jpeg",
        },
        {
            chapter: "Capítulo III",
            title: "El dia el paisajeeeee ufff",
            badge: "Precioso recuerdo como tu mi amorrrr",
            text: "Ese dia ese vestido mi amor te quedaba divino y el paisaje ufff",
            phrase: "\"Solo vino a mi mente: QUE MUJER.\"",
            photo: "paisaje.jpeg",
        },
        {
            chapter: "Capítulo IV",
            title: "Un momento que solo nosotros recordamos — más que todo yoooo",
            badge: "Solo tú y yo",
            text: "Hay mi amorcito agarrarte de la cintura uff y sentir esas curvaaaaas",
            phrase: "\"Contigo todo es muy bonitoooo.\"",
            photo: "mano.jpg",
        },
        {
            chapter: "Capítulo V",
            title: "El día que me enamoré aún más de ti",
            badge: "Mi favorito de todos los momentos",
            text: "Hubo un instante en que te miré y pensé: quién nos iba a imaginar a nosotros juntos.",
            phrase: "\"Te elegiría mil veces más, con los ojos cerrados.\"",
            photo: "comida.jpg",
        },
    ];

    // Paleta violeta/lavanda para flores
    const FLOWER_COLORS = [
        { petals: "#9b6bb9", center: "#f5d87a", size: 90  },
        { petals: "#c9a8e8", center: "#ffd580", size: 80  },
        { petals: "#5b2d8e", center: "#f5d87a", size: 100 },
        { petals: "#e0c6f5", center: "#ffc87a", size: 78  },
        { petals: "#7a4aaa", center: "#f5d87a", size: 88  },
    ];

    const STEM_COLOR = "#3d7a56";
    const LABELS = [
        "primera vez",
        "primer besito",
        "el paisaje",
        "esa mano",
        "nuestra cita",
    ];

    function buildFlowerSVG(fc, idx) {
        const { petals, center, size } = fc;
        const petalCount = 8;
        const pr = size * 0.28;
        const cr = size * 0.14;
        const cx = size / 2;
        const stemH = 60 + idx * 8;
        const totalH = size + stemH;

        let petalPaths = "";
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            const px = cx + Math.cos(angle) * pr * 1.1;
            const py = (size * 0.45) + Math.sin(angle) * pr * 1.1;
            petalPaths += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}"
                rx="${(pr * 0.55).toFixed(1)}" ry="${(pr * 0.82).toFixed(1)}"
                fill="${petals}" opacity="0.92"
                transform="rotate(${(angle * 180 / Math.PI).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
        }

        return `<svg class="flower-svg" width="${size}" height="${totalH}"
            viewBox="0 0 ${size} ${totalH}" xmlns="http://www.w3.org/2000/svg">
            <line x1="${cx}" y1="${size * 0.55}" x2="${cx}" y2="${totalH}"
                stroke="${STEM_COLOR}" stroke-width="3" stroke-linecap="round"/>
            <path d="M${cx},${size * 0.7} Q${cx + 15},${size * 0.8} ${cx + 20},${size * 0.95}"
                stroke="${STEM_COLOR}" stroke-width="2" fill="none" stroke-linecap="round"/>
            <ellipse cx="${cx + 15}" cy="${size * 0.93}" rx="10" ry="6"
                fill="${STEM_COLOR}" opacity="0.7"/>
            ${petalPaths}
            <circle cx="${cx}" cy="${size * 0.45}" r="${(cr * 1.1).toFixed(1)}"
                fill="${center}" opacity="0.97"/>
            <circle cx="${cx}" cy="${size * 0.45}" r="${(cr * 0.55).toFixed(1)}"
                fill="#fff" opacity="0.35"/>
        </svg>`;
    }

    const section = document.getElementById("gardenSection");
    if (!section) return;

    let starsHTML = "";
    for (let i = 0; i < 55; i++) {
        const s = (Math.random() * 2 + 1).toFixed(1);
        const l = (Math.random() * 100).toFixed(1);
        const t = (Math.random() * 85).toFixed(1);
        const o = (0.15 + Math.random() * 0.45).toFixed(2);
        starsHTML += `<div style="position:absolute;width:${s}px;height:${s}px;border-radius:50%;
            background:rgba(220,190,255,${o});left:${l}%;top:${t}%;pointer-events:none;"></div>`;
    }

    // Mini neuronas decorativas en el fondo del jardín
    let neuronBg = "";
    for (let i = 0; i < 8; i++) {
        const x = 5 + Math.random() * 90;
        const y = 5 + Math.random() * 75;
        neuronBg += `<div style="position:absolute;left:${x}%;top:${y}%;pointer-events:none;opacity:0.18;">
            <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="3" fill="#c9a8e8"/>
                <line x1="20" y1="20" x2="8" y2="12" stroke="#c9a8e8" stroke-width="1"/>
                <line x1="20" y1="20" x2="32" y2="12" stroke="#c9a8e8" stroke-width="1"/>
                <line x1="20" y1="20" x2="20" y2="5" stroke="#c9a8e8" stroke-width="1"/>
                <line x1="20" y1="20" x2="8" y2="30" stroke="#c9a8e8" stroke-width="1"/>
                <line x1="20" y1="20" x2="32" y2="30" stroke="#c9a8e8" stroke-width="1"/>
                <circle cx="8" cy="12" r="2" fill="#c9a8e8"/>
                <circle cx="32" cy="12" r="2" fill="#c9a8e8"/>
                <circle cx="20" cy="5" r="2" fill="#c9a8e8"/>
                <circle cx="8" cy="30" r="2" fill="#c9a8e8"/>
                <circle cx="32" cy="30" r="2" fill="#c9a8e8"/>
            </svg>
        </div>`;
    }

    let flowersHTML = "";
    MOMENTS.forEach((m, i) => {
        const fc = FLOWER_COLORS[i];
        flowersHTML += `
            <button class="garden-flower-btn" data-idx="${i}" aria-label="${m.title}">
                ${buildFlowerSVG(fc, i)}
                <div class="garden-flower-label">${LABELS[i]}</div>
            </button>`;
    });

    section.innerHTML = `
        <div class="garden-label">Nuestros momentos especiales</div>
        <p class="garden-intro">Toca cada flor para revivir el momento ❤️</p>
        <div class="garden-sky" id="gardenSky">
            ${starsHTML}
            ${neuronBg}
            <div class="garden-flowers-row">${flowersHTML}</div>
            <div class="garden-ground"></div>
        </div>

        <div class="garden-modal-overlay" id="gardenOverlay">
            <div class="garden-modal-card" id="gardenCard">
                <div class="garden-modal-photo" id="gardenPhoto">
                    <div class="garden-photo-placeholder">🌸</div>
                    <img id="gardenImg" src="" alt=""
                        style="display:none;width:100%;height:100%;object-fit:cover;position:absolute;inset:0;z-index:1;">
                    <div class="garden-modal-badge" id="gardenBadge"></div>
                </div>
                <div class="garden-modal-body">
                    <div class="garden-modal-chapter" id="gardenChapter"></div>
                    <div class="garden-modal-title"   id="gardenTitle"></div>
                    <div class="garden-modal-divider"></div>
                    <div class="garden-modal-text"    id="gardenText"></div>
                    <div class="garden-modal-phrase"  id="gardenPhrase"></div>
                    <button class="garden-modal-close" id="gardenClose">cerrar ❤️</button>
                </div>
            </div>
        </div>`;

    const overlay  = document.getElementById("gardenOverlay");
    const img      = document.getElementById("gardenImg");
    const chapter  = document.getElementById("gardenChapter");
    const title    = document.getElementById("gardenTitle");
    const text     = document.getElementById("gardenText");
    const phrase   = document.getElementById("gardenPhrase");
    const badge    = document.getElementById("gardenBadge");
    const closeBtn = document.getElementById("gardenClose");
    let activeBtn  = null;

    section.querySelectorAll(".garden-flower-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.idx);
            const m   = MOMENTS[idx];

            if (activeBtn) activeBtn.classList.remove("lit");
            btn.classList.add("lit");
            activeBtn = btn;

            chapter.textContent = m.chapter;
            title.textContent   = m.title;
            badge.textContent   = m.badge;
            text.textContent    = m.text;
            phrase.textContent  = m.phrase;

            if (m.photo) {
                img.src = m.photo;
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }

            overlay.classList.add("open");
        });
    });

    function closeGardenModal() {
        overlay.classList.remove("open");
        if (activeBtn) { activeBtn.classList.remove("lit"); activeBtn = null; }
    }

    closeBtn.addEventListener("click", closeGardenModal);
    overlay.addEventListener("click", e => { if (e.target === overlay) closeGardenModal(); });
})();

// ─── Ruleta del amor ───────────────────────────
(function initRuleta() {

    const ITEMS = [
        { emoji: "💜", text: "Te quiero tanto que aveces las palabras se me quedan cortas mi princesa" },
        { emoji: "🌍", text: "Prometo en un futuro conocer el mundooo o bueno nuestro pais juntos" },
        { emoji: "😂", text: "Me haces reir mucho siempre me sacas una sonrisotaaaa" },
        { emoji: "🎓", text: "Prometo estar ahí el día que te pongas el uniforme de psicóloga y verte con ojos de orgullo" },
        { emoji: "🔒", text: "Mi corazón tiene tu nombre y ojos solo par ti" },
        { emoji: "👀", text: "Tus ojos me destruyen cada vez que me miran, no puedo explicarlo pero me cambian en un instante" },
        { emoji: "💍", text: "Prometo elegirte hoy, mañana y todos los días que me queden" },
    ];

    const section = document.getElementById("ruletaSection");
    if (!section) return;

    // Paleta violeta para la ruleta
    const COLORS = [
        "#5b2d8e","#7a4aaa","#9b6bb9","#3a1560",
        "#5b2d8e","#7a4aaa","#9b6bb9","#3a1560",
        "#5b2d8e","#7a4aaa","#9b6bb9","#3a1560",
    ];

    const N     = ITEMS.length;
    const R     = 160;
    const CX    = 170;
    const CY    = 170;
    const slice = (2 * Math.PI) / N;

    section.innerHTML = `
        <div class="ruleta-label">ruleta del amor</div>
        <p class="ruleta-intro">Gira la ruleta mi amor y descubriras cosas huyyyy</p>
        <div class="ruleta-wrapper">
            <div class="ruleta-pin">▼</div>
            <canvas id="ruletaCanvas" width="340" height="340"></canvas>
            <button class="ruleta-spin-btn" id="ruletaSpinBtn">
                <span class="ruleta-btn-inner">Gire mi amorcito</span>
            </button>
        </div>
        <div class="ruleta-result" id="ruletaResult">
            <div class="ruleta-result-emoji" id="ruletaEmoji"></div>
            <p class="ruleta-result-text" id="ruletaText"></p>
        </div>
    `;

    const canvas   = document.getElementById("ruletaCanvas");
    const ctx      = canvas.getContext("2d");
    const btn      = document.getElementById("ruletaSpinBtn");
    const result   = document.getElementById("ruletaResult");
    const resEmoji = document.getElementById("ruletaEmoji");
    const resText  = document.getElementById("ruletaText");

    let currentAngle = 0;
    let spinning     = false;

    function drawWheel(angle) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.shadowColor = "rgba(91,45,142,0.3)";
        ctx.shadowBlur  = 28;
        ctx.beginPath();
        ctx.arc(CX, CY, R + 4, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.restore();

        for (let i = 0; i < N; i++) {
            const start = angle + i * slice;
            const end   = start + slice;

            ctx.beginPath();
            ctx.moveTo(CX, CY);
            ctx.arc(CX, CY, R, start, end);
            ctx.closePath();
            ctx.fillStyle = COLORS[i];
            ctx.fill();
            ctx.strokeStyle = "rgba(255,255,255,0.3)";
            ctx.lineWidth   = 1.5;
            ctx.stroke();

            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(start + slice / 2);
            ctx.translate(R * 0.68, 0);
            ctx.rotate(Math.PI / 2);
            ctx.font        = "18px serif";
            ctx.textAlign   = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(ITEMS[i].emoji, 0, 0);
            ctx.restore();
        }

        ctx.save();
        ctx.shadowColor = "rgba(91,45,142,0.4)";
        ctx.shadowBlur  = 12;
        ctx.beginPath();
        ctx.arc(CX, CY, 28, 0, 2 * Math.PI);
        const grad = ctx.createRadialGradient(CX-6, CY-6, 2, CX, CY, 28);
        grad.addColorStop(0, "#c9a8e8");
        grad.addColorStop(1, "#3a1560");
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        ctx.font         = "20px serif";
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("💜", CX, CY);
    }

    drawWheel(currentAngle);

    function spin() {
        if (spinning) return;
        spinning     = true;
        btn.disabled = true;
        result.classList.remove("visible");

        const extraSpins  = 5 + Math.floor(Math.random() * 5);
        const targetExtra = Math.random() * 2 * Math.PI;
        const totalRad    = extraSpins * 2 * Math.PI + targetExtra;
        const duration    = 4000 + Math.random() * 1500;
        const startAngle  = currentAngle;
        const startTime   = performance.now();

        function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

        function frame(now) {
            const elapsed  = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            currentAngle   = startAngle + totalRad * easeOut(progress);
            drawWheel(currentAngle);

            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                spinning     = false;
                btn.disabled = false;
                showRuletaResult();
            }
        }

        requestAnimationFrame(frame);
    }

    function showRuletaResult() {
        const normalized = (((-currentAngle - Math.PI / 2) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const idx  = Math.floor(normalized / slice) % N;
        const item = ITEMS[idx];

        resEmoji.textContent = item.emoji;
        resText.textContent  = item.text;

        result.classList.remove("visible");
        void result.offsetWidth;
        result.classList.add("visible");
        result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    btn.addEventListener("click", spin);
})();

// ─── Galería Polaroid ──────────────────────────
(function initPolaroid() {

    const POLAROIDS = [
        {
            photo: "gato.jpeg",
            emoji: "🌅",
            caption: "la primera vez que nos encontramos mujer 😂",
            note: "Ese día lo cambió todo para mí ❤️",
            color: "#e8d8f8",
            rot: "-4deg"
        },
        {
            photo: "beso.jpeg",
            emoji: "💋",
            caption: "nuestro primer besitooo 🥹",
            note: "Me dejaste sin palabras, mujer",
            color: "#f0eafc",
            rot: "3deg"
        },
        {
            photo: "paisaje.jpeg",
            emoji: "🌄",
            caption: "Huyy amor ese dia ese vestidoooo huuuuuy",
            note: "No la mire mucho a los ojos ese dia huuuy",
            color: "#e4d0f5",
            rot: "-2deg"
        },
        {
            photo: "mano.jpg",
            emoji: "🤝",
            caption: "Amoooooor esa cinturitaaaa 😤",
            note: "Siempre quiero agarrarte y abrazarte asi mi amooor",
            color: "#f0eafc",
            rot: "5deg"
        },
        {
            photo: "comida.jpg",
            emoji: "🍽️",
            caption: "nuestra cita juntitos comiendo felices 🥺",
            note: "Verte toda feliz ese dia no tiene precio ❤️",
            color: "#ede0fa",
            rot: "-3deg"
        },
        {
            photo: "rebe4.jpeg",
            emoji: "⭐",
            caption: "Hay mi niña preciosa solo mirateeee, esos ojitos 🥺",
            note: "Me encanta ❤️",
            color: "#e8d8f8",
            rot: "2deg"
        },
        {
            photo: "c3.jpeg",
            emoji: "⭐",
            caption: "Solo mirate lo preciosa que estas 🥺 Estoy tan feliz contigo mi amor❤️",
            note: "WOW",
            color: "#e8d8f8",
            rot: "2deg"
        },
        {
            photo: "c1.jpeg",
            emoji: "⭐",
            caption: "Esos besitos, sentir esos labios en mi ufff",
            note: "Más fotitos asi por favor 😅",
            color: "#e8d8f8",
            rot: "2deg"
        },
        {
            photo: "c2.jpeg",
            emoji: "⭐",
            caption: "Nosotros juntitos como debe ser",
            note: "Esa foto me encantó",
            color: "#e8d8f8",
            rot: "2deg"
        },
        {
            photo: "c4.jpeg",
            emoji: "⭐",
            caption: "Qué me veas de esa manera me deja uff ❤️",
            note: "Me enamora esa miradaaaa ❤️",
            color: "#e8d8f8",
            rot: "2deg"
        },
    ];

    const section = document.getElementById("polaroidSection");
    if (!section) return;

    section.innerHTML = `
        <div class="polaroid-section-label">Galería de recuerdos</div>
        <div class="polaroid-section-title">Nuestros Polaroids ❤️</div>
        <div class="polaroid-shelf" id="polaroidShelf"></div>
    `;

    const shelf = document.getElementById("polaroidShelf");

    POLAROIDS.forEach((p) => {
        const wrap = document.createElement("div");
        wrap.className = "polaroid-wrap";
        wrap.style.transform = `rotate(${p.rot})`;
        wrap.innerHTML = `
            <div class="polaroid">
                <div class="polaroid-tape"></div>
                <div class="polaroid-heart">❤</div>
                <div class="polaroid-img-box" style="background:linear-gradient(135deg,${p.color},#f8f4ff);">
                    <img src="${p.photo}" alt="${p.caption}"
                        onerror="this.style.display='none'"
                        onload="this.nextElementSibling.style.display='none'">
                    <span class="polaroid-emoji-fallback">${p.emoji}</span>
                </div>
                <div class="polaroid-caption">${p.caption}</div>
            </div>`;
        wrap.addEventListener("click", () => openLightbox(p));
        shelf.appendChild(wrap);
    });

    const overlay  = document.getElementById("lbOverlay");
    const lbImgWrap= document.getElementById("lbImgWrap");
    const lbEmoji  = document.getElementById("lbEmoji");
    const lbPhoto  = document.getElementById("lbPhotoImg");
    const lbCap    = document.getElementById("lbCaption");
    const lbNote   = document.getElementById("lbNote");
    const lbClose  = document.getElementById("lbClose");

    function openLightbox(p) {
        lbImgWrap.style.background = `linear-gradient(135deg,${p.color},#f8f4ff)`;
        lbEmoji.textContent = p.emoji;
        lbEmoji.style.display = "inline";
        lbPhoto.style.display = "none";
        lbPhoto.src = p.photo;
        lbPhoto.onload  = () => { lbPhoto.style.display = "block"; lbEmoji.style.display = "none"; };
        lbPhoto.onerror = () => { lbPhoto.style.display = "none";  lbEmoji.style.display = "inline"; };
        lbCap.textContent  = p.caption;
        lbNote.textContent = p.note;
        overlay.classList.add("open");
    }

    lbClose.addEventListener("click", () => overlay.classList.remove("open"));
    overlay.addEventListener("click", e => { if (e.target === overlay) overlay.classList.remove("open"); });
})();

// ─── Mini Quiz ─────────────────────────────────
(function initQuiz() {

    const QUESTIONS = [
        {
            q: "¿Cuál es mi carrera universitaria?",
            opts: ["Medicina", "Ingeniería en Sistemas", "Administración de Empresas", "Contaduría Pública"],
            correct: 1,
            ok:   "Obviamente si Soy tu ingenierito ❤️",
            fail: "COMOOOOOOOOOOOO"
        },
        {
            q: "¿Cómo me llaman mis amigos de cariño?",
            opts: ["Fer", "Angel", "Sánchez", "Einyel"],
            correct: 3,
            ok:   "Estaba yuca  no lo negare 😂😂😂😂 ",
            fail: "Era einyel amoooor😂"
        },
        {
            q: "¿Qué fue lo primero que pensé cuando te vi por primera vez?",
            opts: ["Qué simpática", "QUÉ MUJER 😵", "Parece seria", "Me da miedo nervio hablarleeee"],
            correct: 1,
            ok:   "Exacto, me dejaste sin palabras mujer ❤️",
            fail: "Dije huuuy que guapa , ni supe como reaccionar ni queria sentarme 😅"
        },
        {
            q: "¿Qué no queria hacer cuando hablamos por primera vez?",
            opts: ["Hablar", "Sentarme", "Mirarte a los ojos", "nadita"],
            correct: 1,
            ok:   "Esta tiene su trampaaa 😂",
            fail: "HUUUUY 😂"
        },
        {
            q: "¿Qué es lo que más me gusta de ti (aparte de todo 😍)?",
            opts: ["Tu cabello", "Tus ojos", "Tu forma de enojarte con esa carita", "Todas las anteriores "],
            correct: 3,
            ok:   "Todo mi niña lindaaa 💜",
            fail: "Todita tu es mas completitaaa ❤️"
        },
        {
            q: "¿En qué fecha empezamos nuestra historia?",
            opts: ["9 de enero de 2026", "14 de febrero de 2026", "9 de febrero de 2026", "25 de diciembre de 2025"],
            correct: 2,
            ok:   "Esa fecha lo cambio todo mi amooor ❤️",
            fail: "COMOOOOOOO"
        },
    ];

    const section = document.getElementById("quizSection");
    if (!section) return;

    section.innerHTML = `
        <div class="quiz-section-label">Ya que le gustan los cuestionarioooos 😂😂😂😂 </div>
        <div class="quiz-section-title">¿Cuánto me conoces AMORCIITOOOOO?</div>
        <div class="quiz-section-sub">Demuéstrame que me pones atención están facilitas y tendrá su premio 😏</div>
        <div class="quiz-card">
            <div class="quiz-progress-bar">
                <div class="quiz-progress-fill" id="qBar" style="width:0%"></div>
            </div>
            <div id="quizBody">
                <div class="quiz-q-num"    id="qNum"></div>
                <div class="quiz-question" id="qText"></div>
                <div class="quiz-options"  id="qOpts"></div>
                <div class="quiz-feedback" id="qFeedback"></div>
                <button class="quiz-next-btn" id="qNext">Siguiente →</button>
            </div>
            <div class="quiz-result-panel" id="quizResult">
                <div class="quiz-result-emoji" id="resultEmoji"></div>
                <div class="quiz-result-score" id="resultScore"></div>
                <div class="quiz-result-msg"   id="resultMsg"></div>
                <button class="quiz-restart-btn" id="qRestart">Intentaa de nuevoooo</button>
            </div>
        </div>
    `;

    let qIdx = 0, score = 0, answered = false;

    const qBar      = document.getElementById("qBar");
    const qNum      = document.getElementById("qNum");
    const qText     = document.getElementById("qText");
    const qOpts     = document.getElementById("qOpts");
    const qFeedback = document.getElementById("qFeedback");
    const qNext     = document.getElementById("qNext");
    const quizBody  = document.getElementById("quizBody");
    const quizResult= document.getElementById("quizResult");

    function loadQuestion() {
        const q  = QUESTIONS[qIdx];
        answered = false;
        qFeedback.textContent = "";
        qNext.classList.remove("show");
        qNum.textContent  = `Pregunta ${qIdx + 1} de ${QUESTIONS.length}`;
        qText.textContent = q.q;
        qBar.style.width  = (qIdx / QUESTIONS.length * 100) + "%";
        qOpts.innerHTML   = "";

        q.opts.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.className   = "quiz-opt";
            btn.textContent = opt;
            btn.addEventListener("click", () => answerQuestion(i));
            qOpts.appendChild(btn);
        });
    }

    function answerQuestion(chosen) {
        if (answered) return;
        answered = true;
        const q    = QUESTIONS[qIdx];
        const btns = qOpts.querySelectorAll(".quiz-opt");
        btns.forEach(b => b.disabled = true);

        if (chosen === q.correct) {
            btns[chosen].classList.add("correct");
            qFeedback.textContent = q.ok;
            score++;
        } else {
            btns[chosen].classList.add("wrong");
            btns[q.correct].classList.add("correct");
            qFeedback.textContent = q.fail;
        }

        qNext.textContent = qIdx < QUESTIONS.length - 1 ? "Siguiente →" : "Ver resultado ❤️";
        qNext.classList.add("show");
    }

    qNext.addEventListener("click", () => {
        qIdx++;
        if (qIdx < QUESTIONS.length) {
            loadQuestion();
        } else {
            showFinalResult();
        }
    });

    function showFinalResult() {
        quizBody.style.display   = "none";
        quizResult.classList.add("show");
        qBar.style.width = "100%";

        const pct = score / QUESTIONS.length;
        let emoji, msg;

        if (pct === 1) {
            emoji = "🏆";
            msg   = "EXCELENTEEEEE 6 de 6 — Eres la que más me conoce en este mundo AMOOOR. Eso solo me dice que me pone muchaaaa atención. Te quiero muchísimo mi psicóloga hermosa ❤️";
            launchHeartsRain();
            mostrarReproductor();
        } else if (pct >= 0.7) {
            emoji = "💜";
            msg   = `${score} de 6 — Siga intentando amorcito ❤️`;
        } else if (pct >= 0.4) {
            emoji = "🌸";
            msg   = `${score} de 6 — Vamos vamos usted puedeeee ❤️`;
        } else {
            emoji = "😤";
            msg   = `${score} de 6 — COMOOOOOOOOO A ESTUDIAR ❤️`;
        }

        document.getElementById("resultEmoji").textContent = emoji;
        document.getElementById("resultScore").textContent = `${score} / ${QUESTIONS.length}`;
        document.getElementById("resultMsg").textContent   = msg;
    }

    document.getElementById("qRestart").addEventListener("click", () => {
        const oldPlayer = document.getElementById("playerPremio");
        if (oldPlayer) oldPlayer.remove();

        qIdx = 0; score = 0; answered = false;
        quizResult.classList.remove("show");
        quizBody.style.display = "block";
        loadQuestion();
    });

    loadQuestion();
})();

// ─── Lluvia de estrellas/corazones (quiz perfecto) ──
function launchHeartsRain() {
    const rain = document.getElementById("heartsRain");
    if (!rain) return;
    const emojis = ["❤️","💜","🌸","✨","💗","🧠","💖","⭐"];
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const h = document.createElement("div");
            h.className = "h-drop";
            h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            h.style.left = Math.random() * 100 + "vw";
            h.style.animationDuration = (1.4 + Math.random() * 2) + "s";
            h.style.fontSize = (0.8 + Math.random() * 1.4) + "rem";
            rain.appendChild(h);
            setTimeout(() => h.remove(), 3600);
        }, i * 75);
    }
}

// ─── Reproductor premio quiz ───
function mostrarReproductor() {
    if (document.getElementById("playerPremio")) return;

    const wrap = document.createElement("div");
    wrap.id = "playerPremio";
    wrap.style.cssText = `
        margin-top: 24px;
        background: linear-gradient(135deg, #3a1560, #5b2d8e);
        border-radius: 18px;
        padding: 18px 22px;
        color: #fff;
        font-family: 'Playfair Display', serif;
        max-width: 360px;
        margin-left: auto;
        margin-right: auto;
        animation: fadeSlideUp 0.5s cubic-bezier(.22,1,.36,1) both;
        box-shadow: 0 8px 30px rgba(58,21,96,0.35);
    `;

    wrap.innerHTML = `
        <div style="font-size:0.85rem;opacity:0.85;margin-bottom:12px;text-align:center;letter-spacing:0.05em;">
            Con mucho amor de tu ingenierooo ❤️
        </div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <button id="ppPlayBtn" title="Play / Pausa" style="
                width:46px;height:46px;border-radius:50%;
                background:rgba(255,255,255,0.18);
                border:2px solid rgba(255,255,255,0.5);
                color:#fff;font-size:20px;cursor:pointer;
                display:flex;align-items:center;justify-content:center;
                flex-shrink:0;transition:background 0.2s;">▶</button>
            <div style="flex:1;display:flex;flex-direction:column;gap:5px;">
                <div id="ppProgWrap" title="Clic para saltar" style="
                    width:100%;height:6px;
                    background:rgba(255,255,255,0.22);
                    border-radius:99px;cursor:pointer;position:relative;">
                    <div id="ppProgFill" style="
                        height:100%;background:#fff;
                        border-radius:99px;width:0%;
                        pointer-events:none;
                        transition:width 0.1s linear;"></div>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:11px;opacity:0.7;font-family:monospace;">
                    <span id="ppCur">0:00</span>
                    <span id="ppDur">--:--</span>
                </div>
            </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:15px;">🔈</span>
            <input type="range" id="ppVol" min="0" max="1" step="0.01" value="0.85"
                style="flex:1;accent-color:#c9a8e8;cursor:pointer;">
            <span style="font-size:15px;">🔊</span>
        </div>
    `;

    const resultPanel = document.getElementById("quizResult");
    resultPanel.appendChild(wrap);

    const audio = new Audio("premio.mp3");
    audio.volume = 0.85;

    const playBtn  = document.getElementById("ppPlayBtn");
    const progFill = document.getElementById("ppProgFill");
    const progWrap = document.getElementById("ppProgWrap");
    const curEl    = document.getElementById("ppCur");
    const durEl    = document.getElementById("ppDur");
    const volEl    = document.getElementById("ppVol");

    function fmt(s) {
        if (isNaN(s)) return "--:--";
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return m + ":" + String(sec).padStart(2, "0");
    }

    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().catch(() => {});
            playBtn.textContent = "⏸";
        } else {
            audio.pause();
            playBtn.textContent = "▶";
        }
    });

    audio.addEventListener("timeupdate", () => {
        if (!audio.duration) return;
        const pct = (audio.currentTime / audio.duration) * 100;
        progFill.style.width = pct + "%";
        curEl.textContent = fmt(audio.currentTime);
    });

    audio.addEventListener("loadedmetadata", () => {
        durEl.textContent = fmt(audio.duration);
    });

    audio.addEventListener("ended", () => {
        playBtn.textContent = "▶";
        progFill.style.width = "0%";
        curEl.textContent = "0:00";
    });

    progWrap.addEventListener("click", e => {
        if (!audio.duration) return;
        const rect = progWrap.getBoundingClientRect();
        const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        audio.currentTime = pct * audio.duration;
    });

    volEl.addEventListener("input", () => {
        audio.volume = parseFloat(volEl.value);
    });

    audio.play()
        .then(() => { playBtn.textContent = "⏸"; })
        .catch(() => {
            playBtn.style.background = "rgba(255,255,255,0.3)";
        });
}

// ─── Cajita sorpresa del día ───────────────────
(function initSorpresa() {

    const MENSAJES = [
        { dia: "Domingo",   texto: "Que este domingo te recargue de energía, amor y la certeza de que eres lo mejor que me pasó." },
        { dia: "Lunes",     texto: "Empezaste la semana y ya eres lo más bonito de mi día. Que tus clases sean fáciles y tu sonrisa no se apague." },
        { dia: "Martes",    texto: "Cada martes me recuerda que tengo a la chica más increíble del mundo estudiando para cambiar vidas." },
        { dia: "Miércoles", texto: "Mitad de semana, mitad de mis pensamientos son sobre ti. La otra mitad también. No me hagas caso." },
        { dia: "Jueves",    texto: "Ya casi es viernes y tú sigues siendo lo mejor de toda la semana, mi amor." },
        { dia: "Viernes",   texto: "¡Llegó el viernes, mi reina! Te mereces descansar, reír y saber que este ingeniero está muy orgulloso de ti." },
        { dia: "Sábado",    texto: "Sábado contigo o pensando en ti. De las dos formas es mi día favorito." },
    ];

    const section = document.getElementById("sorpresaSection");
    if (!section) return;

    const hoy = MENSAJES[new Date().getDay()];

    section.innerHTML = `
        <div class="sorpresa-label">sorpresa del día</div>
        <div class="sorpresa-title">Tu cajita de amor ❤️</div>
        <p class="sorpresa-hint" id="hintCaja">Toca la caja para ver tu sorpresa de hoy</p>
        <div class="caja-wrap" id="cajaWrap">
            <div class="caja" id="cajaBox">
                <div class="caja-lazo">🎀</div>
                <div class="caja-cara caja-frente">
                    <div class="caja-icono">🎁</div>
                    <div class="caja-tap-txt">toca aquí</div>
                </div>
                <div class="caja-cara caja-dorso">
                    <div class="sorpresa-msg-dia">${hoy.dia}</div>
                    <div class="sorpresa-msg-texto">${hoy.texto}</div>
                    <div class="sorpresa-msg-firma">— Tu angelito ❤️</div>
                </div>
            </div>
        </div>`;

    let abierta = false;
    const cajaBox = document.getElementById("cajaBox");
    const hint    = document.getElementById("hintCaja");

    document.getElementById("cajaWrap").addEventListener("click", () => {
        abierta = !abierta;
        cajaBox.classList.toggle("abierta", abierta);
        hint.textContent = abierta
            ? "¡Que tengas un día hermoso! ❤️"
            : "Toca la caja para ver tu sorpresa de hoy";
    });
})();

// ─── Carta animada ─────────────────────────────
(function initCarta() {

    const CARTAS = [
        "Hay mi amor la verdad que estoy tan feliz contigo que las palabras se quedan cortas amor y las acciones hablan por si solas, solo quiero decirte que contigo me siento feliz , seguro en confianza no sabes la alegria que me da tenerte conmigo y poder tener la dicha que seas mi novia , yo por ti hare lo imposible para que siempre estemos juntos y poder apoyarte en las buenas y las malas mi princesa ❤️",
        
    ];

    const semana  = Math.floor(Date.now() / 1000 / 60 / 60 / 24 / 7);
    const carta   = CARTAS[semana % CARTAS.length];
    const fechaStr = new Date().toLocaleDateString("es-ES", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    const section = document.getElementById("cartaSection");
    if (!section) return;

    section.innerHTML = `
        <div class="sorpresa-label">una carta para ti</div>
        <div class="sorpresa-title">Carta de amor ✉️</div>
        <div class="sobre-wrap" id="sobreWrap">
            <div class="sobre" id="sobre">
                <div class="sobre-flap" id="sobreFlap"></div>
                <div class="sobre-lineas">
                    <div class="sobre-linea"></div>
                    <div class="sobre-linea"></div>
                    <div class="sobre-linea"></div>
                    <div class="sobre-linea"></div>
                </div>
                <div class="sobre-sello">💌</div>
                <div class="sobre-tap-txt" id="sobreTap">abrir carta</div>
            </div>
        </div>
        <div class="carta-contenido" id="cartaContenido">
            <div class="carta-fecha">${fechaStr}</div>
            <div class="carta-deco-linea"></div>
            <div class="carta-saludo">Mi psicóloga preciosa,</div>
            <div class="carta-cuerpo">${carta}</div>
            <div class="carta-firma">Con todo mi amor,<br>Tu angelito ❤️</div>
        </div>`;

    let abierta = false;
    const flap      = document.getElementById("sobreFlap");
    const contenido = document.getElementById("cartaContenido");
    const tapTxt    = document.getElementById("sobreTap");

    document.getElementById("sobreWrap").addEventListener("click", () => {
        abierta = !abierta;
        flap.classList.toggle("levantada", abierta);
        contenido.classList.toggle("abierta", abierta);
        tapTxt.style.opacity = abierta ? "0" : "1";
    });
})();
