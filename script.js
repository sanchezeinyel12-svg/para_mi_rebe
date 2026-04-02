/* ============================================
   PARA REBECA ❤️  —  script.js
   ============================================ */

// ─── Frases flotantes ──────────────────────────
const FRASES = [
    "te quiero mucho mi princesa",
    "Mi mujer preciosa ❤️ ",
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

    const x   = Math.random() * 95;
    const dur = 10 + Math.random() * 14;
    const rot = (Math.random() - 0.5) * 20;
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
                0%   { transform: translateY(0) scale(0.5) rotate(0deg);   opacity: 0; }
                15%  { opacity: 0.7; }
                80%  { opacity: 0.3; }
                100% { transform: translateY(-110vh) scale(1) rotate(360deg); opacity: 0; }
            }
        `;
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
        dotsEl.querySelectorAll(".dot").forEach((d, i) => {
            d.classList.toggle("active", i === current);
        });
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
    track.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    track.addEventListener("touchend", e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) { resetAutoplay(); dx < 0 ? next() : prev(); }
    });

    function startAutoplay() { autoplayTimer = setInterval(next, 5000); }
    function resetAutoplay() { clearInterval(autoplayTimer); startAutoplay(); }

    startAutoplay();
})();

// ════════════════════════════════════════════════
// ── CONTADOR DE RELACIÓN ─────────────────────
// ════════════════════════════════════════════════
(function initCounter() {
    // ⬇️  CAMBIA esta fecha a la fecha real de inicio de su relación
    //     Formato: año, mes-1 (enero=0), día, hora, minuto, segundo
    const START = new Date(2026, 1, 9, 0, 0, 0); // Ejemplo: 15 de abril de 2023

    const elDays  = document.getElementById("cntDays");
    const elHours = document.getElementById("cntHours");
    const elMins  = document.getElementById("cntMins");
    const elSecs  = document.getElementById("cntSecs");

    if (!elDays) return;

    let prevSecs = -1;

    function pad(n, len = 2) {
        return String(n).padStart(len, "0");
    }

    function tick() {
        const now     = new Date();
        const diff    = Math.max(0, now - START); // milisegundos
        const totalSec = Math.floor(diff / 1000);
        const secs    = totalSec % 60;
        const mins    = Math.floor(totalSec / 60) % 60;
        const hours   = Math.floor(totalSec / 3600) % 24;
        const days    = Math.floor(totalSec / 86400);

        elDays.textContent  = pad(days, 3);
        elHours.textContent = pad(hours);
        elMins.textContent  = pad(mins);
        elSecs.textContent  = pad(secs);

        // Pequeño efecto "tick" en segundos
        if (secs !== prevSecs) {
            elSecs.classList.remove("tick");
            void elSecs.offsetWidth; // reflow
            elSecs.classList.add("tick");
            prevSecs = secs;
        }
    }

    tick();
    setInterval(tick, 1000);
})();

// ════════════════════════════════════════════════
// ── CARTA SECRETA ────────────────────────────
// ════════════════════════════════════════════════
(function initLetter() {
    // Mensajes del día — se elige uno según el día del año para que siempre sea distinto
    const MENSAJES = [
        `Hoy quiero que sepas que eres lo más bonito que me ha pasado en la vida.\nNo hay día en que no piense en esa sonrisa tuya que lo ilumina todo.\nTe amo más de lo que las palabras pueden decir.`,

        `Mi niña hermosa,\ncada vez que me miras así, con esos ojos llenos de luz, siento que tengo todo lo que necesito.\nGracias por existir y por dejarme ser parte de tu historia.`,

        `Sé que a veces los días son difíciles,\npero quiero que recuerdes que yo estoy aquí,\nsiempre, en las risas y también en las tormentas.\nEres mi lugar favorito en el mundo.`,

        `Hoy solo quiero decirte que estoy orgulloso de ti.\nDe tu fuerza, de tu inteligencia, de la persona tan increíble que eres.\nEl mundo no sabe todavía lo afortunado que es de tenerte.`,

        `Mi princesa,\nsi pudiera darte una cosa en el mundo,\nte daría todos los días felices que te mereces,\nporque te lo mereces absolutamente todo.`,

        `Eres mi calma cuando todo es caos,\nmi risa cuando el día se pone gris,\nmi hogar cuando estoy perdido.\nTe quiero muchísimo, mi amor.`,

        `Oye tú, la de la sonrisa que me roba el aliento...\n¿ya sabes cuánto te adoro?\nPorque te adoro a morir, mi psicóloga preciosa.`,
    ];

    const envelope   = document.getElementById("envelope");
    const letterCard = document.getElementById("letterCard");
    const closeBtn   = document.getElementById("letterCloseBtn");
    const letterBody = document.getElementById("letterBody");
    const letterDate = document.getElementById("letterDate");

    if (!envelope) return;

    // Elegir mensaje según día del año (siempre el mismo para el mismo día)
    const now = new Date();
    const dayOfYear = Math.floor(
        (now - new Date(now.getFullYear(), 0, 0)) / 86400000
    );
    const msg = MENSAJES[dayOfYear % MENSAJES.length];

    // Fecha formateada en español
    const fecha = now.toLocaleDateString("es-SV", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
    // capitalizar primera letra
    if (letterDate) {
        letterDate.textContent = fecha.charAt(0).toUpperCase() + fecha.slice(1);
    }
    if (letterBody) letterBody.textContent = msg;

    let isOpen = false;

    envelope.addEventListener("click", () => {
        if (isOpen) return;
        isOpen = true;

        envelope.classList.add("open");

        // Mostrar carta después de que el sobre se abra
        setTimeout(() => {
            letterCard.classList.add("visible");
            letterCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 500);
    });

    closeBtn?.addEventListener("click", () => {
        letterCard.classList.remove("visible");
        setTimeout(() => {
            envelope.classList.remove("open");
            isOpen = false;
        }, 400);
    });
})();

// ─── Año en footer ─────────────────────────────
const yearEl = document.getElementById("currentYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ════════════════════════════════════════════════
// ── CIELO ESTRELLADO ─────────────────────────
// ════════════════════════════════════════════════
(function initStars() {
    const sky   = document.getElementById("starsSky");
    const panel = document.getElementById("starsPhrasePanel");
    const text  = document.getElementById("starsPhraseText");
    if (!sky) return;

    const RAZONES = [
        "Cuando te veo, todo pierde sentido mi amor solo me enfoco en ti y en esos ojos preciosos.",
        "Tus ojitos me iluminan todos los días por eso le pido fotos todos los dias jejeje.",
        "Tu siendo tú me encantas tu forma de ser de cantar de alabar a Dios , me encantas mi amor.",
        "Mi vida tomó un rumbo muy bonito desde que llegaste.",
        "Pienso día y noche en ti, solo en ti. En nadie más.",
        "Si me dieran a escoger de nuevo, te elegiría con los ojos cerrados amoricto.",
        "Vales la pena hoy, mañana y siempre.",
        "Quiero estar ahí cuando cumplas tus metas y te pongas el uniforme de la psicóloga que siempre quisiste ser.",
        "Tu sonrisa es lo más bonito que existe en mi mundo.",
        "Contigo aprendí que el amor no duele, cura es decir curameeeeee.",
        "Eres mi lugar favorito, el que más entre semana cuando no te veo mi amor.",
        "Me haces mejor persona sin siquiera proponértelo y me cuidas mucho eso lo apreciooo amor.",
    ];

    // Tamaños de estrella
    const SIZES = [18, 22, 28, 24, 20, 26, 22, 18, 30, 24, 20, 26];

    // Posiciones % para que no se sobrepongan demasiado
    const POSITIONS = [
        [8,  12], [22, 55], [38, 10], [52, 62], [65, 18], [80, 48],
        [14, 72], [47, 38], [72, 75], [88, 15], [30, 82], [60, 90],
    ];

    RAZONES.forEach((razon, i) => {
        const [left, top] = POSITIONS[i] || [Math.random()*80+8, Math.random()*75+8];
        const size = SIZES[i] || 22;
        const dur  = (2 + Math.random() * 2).toFixed(1) + "s";
        const del  = (Math.random() * 2).toFixed(1) + "s";

        const btn = document.createElement("button");
        btn.className = "star-btn";
        btn.style.left = left + "%";
        btn.style.top  = top + "%";
        btn.setAttribute("aria-label", "Estrella " + (i + 1));

        // SVG estrella de 5 puntas
        btn.innerHTML = `
            <svg class="star-shape" width="${size}" height="${size}" viewBox="0 0 24 24"
                 style="--twinkle-dur:${dur};--twinkle-delay:${del}">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                    fill="#ffd700" stroke="#f4a020" stroke-width="0.5"/>
            </svg>`;

        btn.addEventListener("click", () => {
            // Iluminar estrella
            sky.querySelectorAll(".star-btn").forEach(b => b.classList.remove("lit"));
            btn.classList.add("lit");

            // Mostrar frase
            text.textContent = razon;
            panel.classList.remove("visible");
            void panel.offsetWidth;
            panel.classList.add("visible");
            panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });

        sky.appendChild(btn);
    });

    // Micro-estrellas decorativas de fondo (no clicables)
    for (let i = 0; i < 60; i++) {
        const dot = document.createElement("div");
        const s   = Math.random() * 2 + 1;
        dot.style.cssText = `
            position:absolute;
            width:${s}px; height:${s}px;
            border-radius:50%;
            background:rgba(255,255,220,${0.3 + Math.random()*0.5});
            left:${Math.random()*100}%;
            top:${Math.random()*100}%;
            pointer-events:none;
            animation: starTwinkle ${(1.5+Math.random()*2).toFixed(1)}s ease-in-out infinite;
            animation-delay:${(Math.random()*2).toFixed(1)}s;
        `;
        sky.appendChild(dot);
    }
})();
