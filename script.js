/* ============================================
   PARA REBECA ❤️  —  script.js
   ============================================ */

// ─── Frases flotantes ──────────────────────────
const FRASES = [
    "te quiero mucho mi princesa",
    "Mi mujer preciosa ❤️",
    "Mi tesorito",
    "eres increíble mi niña",
    "mi enojonaa",
    "mi psicóloga bonita",
    "tan orgulloso de ti",
    "Te admiro mucho mi reina hermosa",
    "eres capaz de todo",
    "te quiero muchote",
    "mi guerrera",
    "eres brillante",
    "siempre contigo en las buenas y en las malas",
    "mi vida entera",
    "❤️",
    "✦",
    "mi amor",
    "lo mejor que me pasó",
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

// ─── Partículas de fondo ───────────────────────
function spawnParticle() {
    const container = document.getElementById("bgParticles");
    if (!container) return;
    const emojis = ["❤️", "🌸", "✨", "💕", "🩷"];
    const el = document.createElement("div");
    el.style.cssText = `
        position: absolute;
        font-size: ${10 + Math.random() * 14}px;
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
                15%  { opacity: 0.7; }
                80%  { opacity: 0.3; }
                100% { transform: translateY(-110vh) scale(1) rotate(360deg); opacity: 0; }
            }`;
        document.head.appendChild(style);
    }
    container.appendChild(el);
    setTimeout(() => el.remove(), 15000);
}
setInterval(spawnParticle, 2200);

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

// ── CONTADOR DE RELACIÓN ────────────────────────
(function initCounter() {
    // ⬇️ Cambia esta fecha a la real de inicio
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

// ── JARDÍN DE MOMENTOS ─────────────────────────
(function initGarden() {

    // ⬇️ Personaliza aquí tus momentos — cambia "photo" por el nombre real de tu imagen
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

    const FLOWER_COLORS = [
        { petals: "#ff6b9d", center: "#ffd700", size: 90  },
        { petals: "#e8758a", center: "#ffb347", size: 80  },
        { petals: "#c9426a", center: "#ffd700", size: 100 },
        { petals: "#f4a0c0", center: "#ffcc44", size: 78  },
        { petals: "#d4537e", center: "#ffd700", size: 88  },
    ];

    const STEM_COLOR = "#2d8a4e";
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

    // Micro estrellas decorativas
    let starsHTML = "";
    for (let i = 0; i < 55; i++) {
        const s = (Math.random() * 2 + 1).toFixed(1);
        const l = (Math.random() * 100).toFixed(1);
        const t = (Math.random() * 85).toFixed(1);
        const o = (0.15 + Math.random() * 0.45).toFixed(2);
        starsHTML += `<div style="position:absolute;width:${s}px;height:${s}px;border-radius:50%;
            background:rgba(255,255,220,${o});left:${l}%;top:${t}%;pointer-events:none;"></div>`;
    }

    // Flores
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

    function closeModal() {
        overlay.classList.remove("open");
        if (activeBtn) { activeBtn.classList.remove("lit"); activeBtn = null; }
    }

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });

})();

// ════════════════════════════════════════════════
// ── RULETA DEL AMOR ──────────────────────────
// ════════════════════════════════════════════════
(function initRuleta() {

    const ITEMS = [
        { emoji: "💕", text: "Te quiero tanto que aveces las palabras se me quedan cortas mi princesa" },
        { emoji: "🌍", text: "Prometo en un futuro conocer el mundooo o bueno nuestro pais juntos" },
        { emoji: "😂", text: "Me haces reir mucho siempre me sacas una sonrisotaaaa" },
        { emoji: "🎓", text: "Prometo estar ahí el día que te pongas el uniforme de psicóloga y verte con ojos de orgullo" },
        { emoji: "🔒", text: "Mi corazón tiene tu nombre y ojos solo par ti" },
        { emoji: "👀", text: "Tus ojos me destruyen cada vez que me miran, no puedo explicarlo pero me cambian en un instante" },
        { emoji: "💍", text: "Prometo elegirte hoy, mañana y todos los días que me queden" },
    ];

    const section = document.getElementById("ruletaSection");
    if (!section) return;

    const COLORS = [
        "#c9426a","#d4537e","#e8758a","#b03060",
        "#c9426a","#d4537e","#e8758a","#b03060",
        "#c9426a","#d4537e","#e8758a","#b03060",
    ];

    const N     = ITEMS.length;
    const R     = 160; // radio
    const CX    = 170; // centro canvas
    const CY    = 170;
    const slice = (2 * Math.PI) / N;

    // ── Construir HTML ──
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

    const canvas = document.getElementById("ruletaCanvas");
    const ctx    = canvas.getContext("2d");
    const btn    = document.getElementById("ruletaSpinBtn");
    const result = document.getElementById("ruletaResult");
    const resEmoji = document.getElementById("ruletaEmoji");
    const resText  = document.getElementById("ruletaText");

    let currentAngle = 0;
    let spinning     = false;

    function drawWheel(angle) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sombra exterior
        ctx.save();
        ctx.shadowColor = "rgba(140,40,80,0.35)";
        ctx.shadowBlur  = 28;
        ctx.beginPath();
        ctx.arc(CX, CY, R + 4, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.restore();

        for (let i = 0; i < N; i++) {
            const start = angle + i * slice;
            const end   = start + slice;

            // Sector
            ctx.beginPath();
            ctx.moveTo(CX, CY);
            ctx.arc(CX, CY, R, start, end);
            ctx.closePath();
            ctx.fillStyle = COLORS[i];
            ctx.fill();
            ctx.strokeStyle = "rgba(255,255,255,0.35)";
            ctx.lineWidth   = 1.5;
            ctx.stroke();

            // Emoji
            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(start + slice / 2);
            ctx.translate(R * 0.68, 0);
            ctx.rotate(Math.PI / 2);
            ctx.font       = "18px serif";
            ctx.textAlign  = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(ITEMS[i].emoji, 0, 0);
            ctx.restore();
        }

        // Centro círculo
        ctx.save();
        ctx.shadowColor = "rgba(140,40,80,0.4)";
        ctx.shadowBlur  = 12;
        ctx.beginPath();
        ctx.arc(CX, CY, 28, 0, 2 * Math.PI);
        const grad = ctx.createRadialGradient(CX-6, CY-6, 2, CX, CY, 28);
        grad.addColorStop(0, "#f4a0c0");
        grad.addColorStop(1, "#8b1a3a");
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        // Corazón centro
        ctx.font          = "20px serif";
        ctx.textAlign     = "center";
        ctx.textBaseline  = "middle";
        ctx.fillText("❤️", CX, CY);
    }

    drawWheel(currentAngle);

    // ── Animación de giro ──
    function spin() {
        if (spinning) return;
        spinning = true;
        btn.disabled = true;
        result.classList.remove("visible");

        const extraSpins  = 5 + Math.floor(Math.random() * 5); // 5-9 vueltas
        const targetExtra = Math.random() * 2 * Math.PI;
        const totalRad    = extraSpins * 2 * Math.PI + targetExtra;
        const duration    = 4000 + Math.random() * 1500; // ms
        const startAngle  = currentAngle;
        const startTime   = performance.now();

        function easeOut(t) {
            // Ease out cubic
            return 1 - Math.pow(1 - t, 3);
        }

        function frame(now) {
            const elapsed  = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = easeOut(progress);

            currentAngle = startAngle + totalRad * eased;
            drawWheel(currentAngle);

            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                spinning = false;
                btn.disabled = false;
                showResult();
            }
        }

        requestAnimationFrame(frame);
    }

    function showResult() {
        // La punta (pin) apunta arriba = -PI/2
        // Calculamos qué sector queda arriba
        const normalized = (((-currentAngle - Math.PI / 2) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const idx = Math.floor(normalized / slice) % N;
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
