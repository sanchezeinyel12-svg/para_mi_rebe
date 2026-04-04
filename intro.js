/* ============================================
   INTRO CINEMÁTICA  —  intro.js
   ============================================ */
(function () {

    const NAME      = "Mi  Psicóloga preciosa ";
    const PHRASE    = "Cada día contigo es lo que me alegra mis semanas y meses uf";
    const TYPE_SPEED = 80; // ms por letra

    // ── Crear estructura del intro ──────────────
    const intro = document.createElement("div");
    intro.id = "cinematic-intro";
    intro.innerHTML = `
        <div class="intro-particles" id="introParticles"></div>
        <div class="intro-vignette"></div>
        <div class="intro-bars">
            <div class="intro-bar-top"></div>
            <div class="intro-bar-bottom"></div>
        </div>
        <div class="intro-center">
            <div class="intro-line-top"></div>
            <span class="intro-sub">con todo mi amor</span>
            <div class="intro-para">Para</div>
            <div class="intro-name" id="introName"><span class="intro-cursor"></span></div>
            <div class="intro-heart">❤️</div>
            <div class="intro-line-bottom"></div>
            <div class="intro-phrase">${PHRASE}</div>
        </div>
        <button class="intro-skip-btn" id="introSkip">continuar →</button>
    `;
    document.body.prepend(intro);
    document.body.classList.add("intro-active");

    // ── Partículas de luz rosada ──────────────
    function spawnIntroParticle() {
        const container = document.getElementById("introParticles");
        if (!container) return;
        const colors = ["#c9426a", "#e8758a", "#fce8ee", "#f4a0c0", "#ffd6e7"];
        const el = document.createElement("div");
        el.className = "intro-particle";
        const size = 2 + Math.random() * 5;
        el.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random() * 100}%;
            bottom:-10px;
            background:${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration:${5 + Math.random() * 7}s;
            animation-delay:${Math.random() * 0.5}s;
            opacity:0;
            box-shadow: 0 0 ${size * 2}px ${colors[0]};
        `;
        container.appendChild(el);
        setTimeout(() => el.remove(), 12000);
    }

    const particleInterval = setInterval(spawnIntroParticle, 180);

    // ── Efecto typewriter ──────────────────────
    function typeWriter(targetEl, text, speed, onDone) {
        let i = 0;
        const cursor = targetEl.querySelector(".intro-cursor");

        function type() {
            if (i < text.length) {
                const span = document.createElement("span");
                span.textContent = text[i];
                targetEl.insertBefore(span, cursor);
                i++;
                setTimeout(type, speed + (Math.random() * 30 - 15));
            } else {
                // Quitar cursor después de terminar
                setTimeout(() => {
                    cursor && cursor.remove();
                    onDone && onDone();
                }, 600);
            }
        }
        type();
    }

    // ── Secuencia cinemática ───────────────────
    let skipEnabled = false;

    function runSequence() {
        // 1. Barras cinematográficas
        setTimeout(() => intro.classList.add("bars-open"), 200);

        // 2. Líneas y texto principal
        setTimeout(() => {
            intro.classList.add("lines-open");
            intro.classList.add("text-open");
        }, 700);

        // 3. Typewriter del nombre
        const nameEl = document.getElementById("introName");
        setTimeout(() => {
            typeWriter(nameEl, NAME, TYPE_SPEED, () => {
                // 4. Corazón y frase
                intro.classList.add("heart-open");
                setTimeout(() => intro.classList.add("phrase-open"), 300);

                // 5. Botón continuar
                setTimeout(() => {
                    document.getElementById("introSkip").classList.add("visible");
                    skipEnabled = true;
                }, 800);

                // 6. Auto-skip después de 3.5s
                setTimeout(closeIntro, 3800);
            });
        }, 1100);
    }

    function closeIntro() {
        if (!skipEnabled) return;
        clearInterval(particleInterval);
        intro.classList.add("fade-out");
        document.body.classList.remove("intro-active");
        document.body.classList.add("intro-done");
        setTimeout(() => intro.remove(), 1200);
    }

    document.getElementById("introSkip").addEventListener("click", closeIntro);

    // Arrancar la secuencia
    runSequence();

    // También permitir tocar/click en cualquier parte para saltar (después de un momento)
    setTimeout(() => {
        intro.addEventListener("click", (e) => {
            if (e.target.id !== "introSkip") closeIntro();
        }, { once: true });
    }, 2500);

})();