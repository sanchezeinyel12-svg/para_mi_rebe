/* ============================================
   PARA REBECA ❤️  —  script.js  (PSICOLOGÍA)
   ============================================ */

(function initMensajeSorpresa() {
  if (sessionStorage.getItem('sorpresaVista')) return;
  sessionStorage.setItem('sorpresaVista', '1');

  const overlay = document.createElement('div');
  overlay.id = 'sorpresaOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(10,2,22,0.88);
    z-index:99999;display:flex;align-items:center;justify-content:center;
    padding:20px;backdrop-filter:blur(6px);
    animation:sorpresaFadeIn 0.5s ease both;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes sorpresaFadeIn{from{opacity:0}to{opacity:1}}
    @keyframes sorpresaCardIn{from{opacity:0;transform:scale(0.85) translateY(28px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .sorpresa-card-pop{
      background:#fff;border-radius:28px;padding:48px 40px 40px;
      max-width:480px;width:100%;text-align:center;position:relative;
      box-shadow:0 30px 80px rgba(58,21,96,0.45);overflow:hidden;
      animation:sorpresaCardIn 0.6s cubic-bezier(.22,1,.36,1) 0.15s both;
    }
    .sorpresa-card-pop::before{
      content:'';position:absolute;top:0;left:0;right:0;height:5px;
      background:linear-gradient(90deg,#3a1560,#9b6bb9,#3a1560);
      border-radius:28px 28px 0 0;
    }
    .sorp-foto{
      width:110px;height:110px;border-radius:50%;object-fit:cover;
      border:4px solid #9b6bb9;
      box-shadow:0 6px 24px rgba(91,45,142,0.3);
      margin-bottom:18px;
    }
    .sorp-hearts{font-size:1rem;letter-spacing:6px;margin-bottom:18px;
      animation:heartPop 1.5s ease-in-out infinite;}
    @keyframes heartPop{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
    .sorp-titulo{font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.3rem,4vw,1.9rem);
      font-weight:700;color:#3a1560;line-height:1.25;margin-bottom:8px;}
    .sorp-sub{font-family:'Playfair Display',Georgia,serif;font-style:italic;
      font-size:clamp(0.88rem,2vw,1rem);color:#7a4aaa;margin-bottom:22px;line-height:1.6;}
    .sorp-deco{width:48px;height:2px;background:linear-gradient(90deg,#5b2d8e,#c9a8e8);
      border-radius:2px;margin:0 auto 22px;}
    .sorp-msg{font-family:'Playfair Display',Georgia,serif;font-style:italic;
      font-size:clamp(0.95rem,2.2vw,1.08rem);color:#1e0a3a;line-height:2;margin-bottom:24px;}
    .sorp-firma{font-family:'Caveat',cursive;font-size:1.6rem;color:#5b2d8e;margin-bottom:28px;}
    .sorp-btn{background:linear-gradient(135deg,#3a1560,#5b2d8e);border:none;
      border-radius:50px;padding:13px 40px;color:#fff;font-family:'Playfair Display',serif;
      font-size:1rem;font-weight:700;cursor:pointer;letter-spacing:0.04em;
      box-shadow:0 6px 24px rgba(91,45,142,0.35);
      transition:transform 0.2s,box-shadow 0.2s;}
    .sorp-btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 12px 32px rgba(91,45,142,0.4);}
    .sorp-bg-emoji{position:absolute;font-size:5rem;opacity:0.04;pointer-events:none;}
  `;
  document.head.appendChild(style);

  overlay.innerHTML = `
    <div class="sorpresa-card-pop">
      <div class="sorp-bg-emoji" style="top:-20px;right:-10px">🧠</div>
      <div class="sorp-bg-emoji" style="bottom:-15px;left:-10px">❤️</div>
      <div class="sorp-hearts">❤️ ❤️ ❤️</div>

      <!-- 📸 CAMBIA "TU_RUTA_AQUI" POR LA RUTA DE TU FOTO -->
      <img class="sorp-foto" src="cita2.jpeg" alt="Foto">

      <div class="sorp-titulo">Para ti, mi psicóloga preciosa</div>
      <div class="sorp-sub">Algo que quiero decirte antes que nada amorcito</div>
      <div class="sorp-deco"></div>
      <div class="sorp-msg">
    Te quiero muchote mi niña chiquita, preciosa mi bebéeee❤️ <br>
      </div>
      <div class="sorp-firma">— Tu angelito que te quiere muchote</div>
      <button class="sorp-btn" id="sorpresaCerrarBtn">Ir al inicio</button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.getElementById('sorpresaCerrarBtn').addEventListener('click', () => {
    overlay.style.transition = 'opacity 0.4s ease';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 420);
  });
})();


(function initAtardecer() {
 
    /* ── Mensajes ── */
    const MSGS = [
        { emoji: "🌅", titulo: "Quiero llevarlaaaa aquí", msg: "Quiero ver un atardecer contigo mi amor, tomados de la mano viendo cómo el cielo se pone de ese color tan bonito que a ti tanto te gusta. ❤️", label: "Quiero llevarte a verlo" },
        { emoji: "🌊", titulo: "Veremos las olas y esos ojitos preciosos", msg: "Me imagino caminando descalzos por la orilla de la playaaaaa, riendo de cualquier cosa o usted de mi jajajaja y quedándonos hasta que el sol se oculte mi amor. ❤️", label: "Caminar contigoooo" },
        { emoji: "✨", titulo: "El cielo para ti", msg: "Si pudiese te regalaría el cielo mi amor con esos tonos preciosos que le encantan. No puedo regalarte el cielo, pero te prometo que lo veremos juntos si o si mi amor Primero DIOS. ❤️", label: "Te regalaría todo mi amor" },
        { emoji: "🫶", titulo: "Eres mi atardecer favorito", msg: "No importa cuántos atardeceres pueda ver yo en la vida, ninguno será tan bonito como verte a ti cuando me sonríes así con esos ojitos preciosos. ❤️", label: "Mi favorito lugar eres tú" },
    ];
 
    /* ── Canvas setup ── */
    const canvas = document.getElementById('atardecer-canvas');
    const ctx    = canvas.getContext('2d');
    let W = 0, H = 0, tick = 0;
    let animId = null;
 
    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        W = canvas.width  = rect.width  || 860;
        H = canvas.height = 420;
    }
    resize();
    window.addEventListener('resize', resize);
 
    /* ── Dibujar cielo ── */
    function drawSky() {
        const pulse = (Math.sin(tick * 0.0006) + 1) / 2;
        const topR   = Math.round(20  + pulse * 8);
        const topG   = Math.round(4   + pulse * 4);
        const topB   = Math.round(50  + pulse * 20);
        const midR   = Math.round(160 + pulse * 20);
        const midG   = Math.round(60  + pulse * 15);
        const midB   = Math.round(80  + pulse * 10);
        const botR   = Math.round(240 + pulse * 10);
        const botG   = Math.round(140 + pulse * 20);
        const botB   = Math.round(40  + pulse * 10);
 
        const grad = ctx.createLinearGradient(0, 0, 0, H * 0.62);
        grad.addColorStop(0,    `rgb(${topR},${topG},${topB})`);
        grad.addColorStop(0.38, `rgb(${midR},${midG},${midB})`);
        grad.addColorStop(1,    `rgb(${botR},${botG},${botB})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H * 0.63);
    }
 
    /* ── Sol ── */
    function drawSun() {
        const cx = W * 0.62, cy = H * 0.27, r = Math.min(W, H) * 0.072;
 
        // halo
        const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 4);
        halo.addColorStop(0,   'rgba(255,230,120,0.38)');
        halo.addColorStop(0.4, 'rgba(255,160,50,0.18)');
        halo.addColorStop(1,   'rgba(255,100,30,0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 4, 0, Math.PI * 2);
        ctx.fill();
 
        // disco
        ctx.fillStyle = '#fde68a';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
 
        // brillo
        ctx.fillStyle = 'rgba(255,255,230,0.7)';
        ctx.beginPath();
        ctx.arc(cx - r * 0.22, cy - r * 0.22, r * 0.34, 0, Math.PI * 2);
        ctx.fill();
    }
 
    /* ── Silueta montañas / horizonte ── */
    function drawHills() {
        ctx.fillStyle = 'rgba(20,8,48,0.72)';
        ctx.beginPath();
        ctx.moveTo(0, H * 0.56);
        ctx.bezierCurveTo(W * 0.08, H * 0.36, W * 0.16, H * 0.48, W * 0.24, H * 0.38);
        ctx.bezierCurveTo(W * 0.32, H * 0.28, W * 0.40, H * 0.44, W * 0.50, H * 0.35);
        ctx.bezierCurveTo(W * 0.60, H * 0.26, W * 0.70, H * 0.44, W * 0.82, H * 0.36);
        ctx.bezierCurveTo(W * 0.92, H * 0.28, W * 0.96, H * 0.42, W, H * 0.46);
        ctx.lineTo(W, H * 0.62);
        ctx.lineTo(0, H * 0.62);
        ctx.closePath();
        ctx.fill();
    }
 
    /* ── Agua / mar ── */
    function drawSea() {
        const seaY = H * 0.62;
        const grad = ctx.createLinearGradient(0, seaY, 0, H);
        grad.addColorStop(0,   'rgba(160,80,40,0.9)');
        grad.addColorStop(0.3, 'rgba(80,30,70,0.95)');
        grad.addColorStop(1,   'rgba(10,5,30,1)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, seaY, W, H - seaY);
    }
 
    /* ── Reflejo del sol en el agua ── */
    function drawReflection() {
        const seaY = H * 0.62;
        const cx   = W * 0.62;
        for (let y = seaY; y < H; y += 11) {
            const frac = (y - seaY) / (H - seaY);
            const ww   = (10 + frac * 22) + Math.sin(tick * 0.05 + y * 0.18) * 5;
            const xOff = Math.sin(y * 0.15 + tick * 0.04) * 9;
            const alpha = (0.55 - frac * 0.3) * Math.max(0, Math.sin(tick * 0.012 + y * 0.02) * 0.3 + 0.7);
            ctx.fillStyle = `rgba(255,210,80,${alpha.toFixed(2)})`;
            ctx.fillRect(cx - ww / 2 + xOff, y, ww, 7);
        }
    }
 
    /* ── Olas ── */
    function drawWaves() {
        const seaY = H * 0.62;
        for (let w = 2; w >= 0; w--) {
            ctx.strokeStyle = `rgba(200,230,255,${0.06 + w * 0.06})`;
            ctx.lineWidth   = 0.8 + w * 0.5;
            ctx.beginPath();
            for (let x = 0; x <= W; x += 4) {
                const y = seaY + w * 16
                    + Math.sin(x * 0.010 + tick * 0.038 + w * 1.2) * 6
                    + Math.sin(x * 0.020 - tick * 0.022 + w * 0.8) * 3;
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    }
 
    /* ── Palma ── */
    function drawPalm(x, y, scale, flip) {
        ctx.save();
        ctx.translate(x, y);
        if (flip) ctx.scale(-1, 1);
        ctx.scale(scale, scale);
 
        // tronco
        ctx.strokeStyle = 'rgba(25,10,45,0.88)';
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-8, -55, 10, -105, -4, -145);
        ctx.stroke();
 
        // hojas
        const leaves = [
            [[-4,-145], [-65,-168], [-44,-140]],
            [[-4,-145], [42,-165],  [28,-140]],
            [[-4,-145], [-18,-192], [0,-160]],
            [[-4,-145], [10,-188],  [5,-158]],
            [[-4,-145], [-40,-158], [-20,-135]],
        ];
        ctx.strokeStyle = 'rgba(18,8,38,0.75)';
        ctx.lineWidth = 3.5;
        leaves.forEach(([s, c, e]) => {
            ctx.beginPath();
            ctx.moveTo(...s);
            ctx.quadraticCurveTo(...c, ...e);
            ctx.stroke();
        });
        ctx.restore();
    }
 
    /* ── Estrellas ── */
    const stars = Array.from({length:28}, () => ({
        x: Math.random(), y: Math.random() * 0.48,
        r: Math.random() * 1.3 + 0.3,
        a: Math.random(),
        speed: Math.random() * 0.018 + 0.006,
    }));
    function drawStars() {
        stars.forEach(s => {
            s.a += s.speed;
            const alpha = (Math.sin(s.a) + 1) / 2 * 0.7;
            ctx.fillStyle = `rgba(255,245,220,${alpha.toFixed(2)})`;
            ctx.beginPath();
            ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
            ctx.fill();
        });
    }
 
    /* ── Pájaros ── */
    const birds = Array.from({length:6}, (_, i) => ({
        x: Math.random() * W,
        y: H * (0.1 + Math.random() * 0.25),
        speed: 0.3 + Math.random() * 0.4,
        wingCycle: Math.random() * Math.PI * 2,
        size: 0.6 + Math.random() * 0.5,
    }));
    function drawBirds() {
        birds.forEach(b => {
            b.x += b.speed;
            b.wingCycle += 0.055;
            if (b.x > W + 30) { b.x = -30; b.y = H * (0.08 + Math.random() * 0.28); }
            const wf = Math.sin(b.wingCycle) * 5 * b.size;
            ctx.strokeStyle = 'rgba(15,6,35,0.72)';
            ctx.lineWidth   = 1.1 * b.size;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(b.x - 9 * b.size, b.y + wf);
            ctx.quadraticCurveTo(b.x, b.y, b.x + 9 * b.size, b.y + wf);
            ctx.stroke();
        });
    }
 
    /* ── Loop principal ── */
    function draw() {
        ctx.clearRect(0, 0, W, H);
        drawSky();
        drawStars();
        drawSun();
        drawHills();
        drawSea();
        drawReflection();
        drawWaves();
        drawBirds();
 
        // palmas
        drawPalm(W * 0.06, H * 0.62, 0.85, false);
        drawPalm(W * 0.12, H * 0.62, 0.65, false);
        drawPalm(W * 0.91, H * 0.62, 0.90, true);
        drawPalm(W * 0.97, H * 0.62, 0.60, true);
 
        tick++;
        animId = requestAnimationFrame(draw);
    }
    draw();
 
    /* ── Mensajes flotantes ── */
    const container = document.getElementById('atardecer-msgs');
    const seaAreaTop = 0.08, seaAreaBot = 0.56;
 
    const positions = [
        { left: '7%',  top: '12%' },
        { left: '55%', top: '8%'  },
        { left: '30%', top: '20%' },
        { left: '68%', top: '28%' },
        { left: '14%', top: '38%' },
        { left: '50%', top: '44%' },
        { left: '78%', top: '15%' },
    ];
 
    const tilts   = [-2, 1.5, -1, 2.5, -1.8, 1.2, -2.2];
    const delays  = [0, 1.2, 2.4, 0.6, 1.8, 3.0, 0.3];
    const durations = [5, 6.5, 5.8, 7, 6, 5.5, 7.5];
 
    MSGS.forEach((m, i) => {
        const el = document.createElement('div');
        el.className = 'msg-float';
        el.textContent = m.label;
        el.style.cssText = `
            left: ${positions[i].left};
            top:  ${positions[i].top};
            --tilt: ${tilts[i]}deg;
            animation-duration: ${durations[i]}s;
            animation-delay: ${-delays[i]}s;
        `;
        el.addEventListener('click', () => openModal(m));
        container.appendChild(el);
    });
 
    /* ── Modal ── */
    const modalBg    = document.getElementById('atardModalBg');
    const modalEmoji = document.getElementById('atardModalEmoji');
    const modalTit   = document.getElementById('atardModalTitulo');
    const modalMsg   = document.getElementById('atardModalMsg');
    const modalClose = document.getElementById('atardModalClose');
    const modalBtn   = document.getElementById('atardModalBtn');
 
    function openModal(m) {
        modalEmoji.textContent = m.emoji;
        modalTit.textContent   = m.titulo;
        modalMsg.textContent   = m.msg;
        modalBg.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modalBg.classList.remove('open');
        document.body.style.overflow = '';
    }
    modalClose.addEventListener('click', closeModal);
    modalBtn.addEventListener('click', closeModal);
    modalBg.addEventListener('click', e => { if (e.target === modalBg) closeModal(); });
 
})();




/* ============================================
   PARA REBECA ❤️  —  effects_enhanced.js
   Copiar este código AL INICIO de script.js,
   justo después de initMensajeSorpresa()
   ============================================ */

// ══════════════════════════════════════════════
//  ✨ LLUVIA DE PÉTALOS / CORAZONES (Canvas)
// ══════════════════════════════════════════════
(function initPetalRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'petalsCanvas';
    canvas.style.cssText = `
        position:fixed;inset:0;pointer-events:none;
        z-index:2;opacity:0.55;width:100%;height:100%;
    `;
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });

    const SYMBOLS = ['❤️', '💜', '🌸', '✨', '💗', '🌺'];
    const COLORS  = ['rgba(244,167,192,0.7)', 'rgba(155,107,185,0.6)', 'rgba(212,96,122,0.5)', 'rgba(232,201,122,0.5)'];

    class Petal {
        constructor() { this.reset(true); }
        reset(init = false) {
            this.x     = Math.random() * W;
            this.y     = init ? Math.random() * -H : -40;
            this.size  = 8 + Math.random() * 14;
            this.speed = 0.4 + Math.random() * 0.7;
            this.wind  = (Math.random() - 0.5) * 0.6;
            this.rot   = Math.random() * Math.PI * 2;
            this.rotSp = (Math.random() - 0.5) * 0.04;
            this.alpha = 0.15 + Math.random() * 0.45;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.type  = Math.random() > 0.5 ? 'petal' : 'heart';
            this.waver = Math.random() * 0.03;
            this.waverOff = Math.random() * Math.PI * 2;
            this.t = 0;
        }
        update() {
            this.t += 0.02;
            this.y += this.speed;
            this.x += this.wind + Math.sin(this.t + this.waverOff) * this.waver * 8;
            this.rot += this.rotSp;
            if (this.y > H + 50) this.reset();
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot);
            if (this.type === 'petal') {
                // Pétalo elegante
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(
                    this.size * 0.5, -this.size * 0.5,
                    this.size, 0,
                    0, this.size
                );
                ctx.bezierCurveTo(
                    -this.size, 0,
                    -this.size * 0.5, -this.size * 0.5,
                    0, 0
                );
                ctx.fillStyle = this.color;
                ctx.fill();
            } else {
                // Corazón pequeño
                const s = this.size * 0.35;
                ctx.beginPath();
                ctx.moveTo(0, s * 0.5);
                ctx.bezierCurveTo(-s * 2, -s, -s * 3.5, s * 1.5, 0, s * 3.5);
                ctx.bezierCurveTo(s * 3.5, s * 1.5, s * 2, -s, 0, s * 0.5);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            ctx.restore();
        }
    }

    const petals = Array.from({ length: 28 }, () => new Petal());

    function animate() {
        ctx.clearRect(0, 0, W, H);
        petals.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
})();

// ══════════════════════════════════════════════
//  🌟 AURA DE MOUSE — brillo suave que sigue el cursor
// ══════════════════════════════════════════════
(function initMouseAura() {
    const aura = document.createElement('div');
    aura.className = 'mouse-aura';
    aura.style.cssText = `
        position:fixed;width:280px;height:280px;
        border-radius:50%;pointer-events:none;z-index:1;
        background:radial-gradient(circle, rgba(244,167,192,0.07) 0%, rgba(155,107,185,0.04) 40%, transparent 70%);
        transform:translate(-50%,-50%);
        transition:left 0.12s ease, top 0.12s ease;
        will-change:left,top;
    `;
    document.body.appendChild(aura);

    let mx = -500, my = -500;
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        aura.style.left = mx + 'px';
        aura.style.top  = my + 'px';
    });
})();

// ══════════════════════════════════════════════
//  💜 CORAZONES AL HACER CLICK
// ══════════════════════════════════════════════
(function initClickHearts() {
    const emojis = ['💜', '❤️', '🌸', '✨', '💗', '🩷', '⭐'];
    document.addEventListener('click', e => {
        const count = 5 + Math.floor(Math.random() * 4);
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.className = 'click-heart';
                el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                const angle = (Math.random() * Math.PI * 2);
                const dist  = 40 + Math.random() * 70;
                const tx    = Math.cos(angle) * dist;
                const ty    = Math.sin(angle) * dist;
                const ty2   = ty - 80 - Math.random() * 60;
                el.style.cssText = `
                    position:fixed;left:${e.clientX}px;top:${e.clientY}px;
                    pointer-events:none;z-index:99999;
                    font-size:${0.8 + Math.random() * 0.8}rem;
                    --tx:${tx}px;--ty:${ty}px;--ty2:${ty2}px;
                    animation:clickHeartBurst 0.9s cubic-bezier(.22,1,.36,1) forwards;
                    transform:translate(-50%,-50%);
                `;
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 950);
            }, i * 55);
        }
    });
})();



/* ════════════════════════════════════════════════
   EXPEDIENTE CLÍNICO CONFIDENCIAL
   ════════════════════════════════════════════════ */
(function initExpedienteClinico() {
    const input = document.getElementById('expInput');
    const btn = document.getElementById('expBtn');
    const errorMsg = document.getElementById('expError');
    const lockScreen = document.getElementById('expLock');
    const reportScreen = document.getElementById('expReport');

    if (!btn || !input) return;

    // 👇 PON AQUÍ LA FRASE EXACTA QUE ELLA DEBE ESCRIBIR 👇
    const FRASE_SECRETA = "MI NIÑA BONITA"; 

    // Función para limpiar texto (quita tildes y lo hace minúscula para evitar fallos)
    function limpiarTexto(texto) {
        return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    function verificarFrase() {
        const fraseIngresada = limpiarTexto(input.value);
        const fraseCorrecta = limpiarTexto(FRASE_SECRETA);

        if (fraseIngresada === fraseCorrecta) {
            // ¡Frase correcta! Ocultar candado y mostrar reporte
            errorMsg.classList.remove('show');
            lockScreen.style.display = 'none';
            reportScreen.style.display = 'block';

            // Lanzar los corazones si existe la función global que creaste
            if (typeof launchHeartsRain === 'function') {
                launchHeartsRain();
            }
        } else {
            // Frase incorrecta, mostrar error
            errorMsg.classList.add('show');
            input.value = ''; // Limpia el input para que lo intente de nuevo
            input.focus();

            // Ocultar el mensaje de error después de 3 segundos
            setTimeout(() => {
                errorMsg.classList.remove('show');
            }, 3000);
        }
    }

    // Verificar al darle clic al botón
    btn.addEventListener('click', verificarFrase);

    // Verificar si presiona la tecla "Enter" en el teclado
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verificarFrase();
        }
    });
})();

// ══════════════════════════════════════════════
//  👁️ SCROLL REVEAL SUAVE para secciones
// ══════════════════════════════════════════════
(function initScrollReveal() {
    const targets = document.querySelectorAll('section, .counter-section, .content-row');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    targets.forEach((el, i) => {
        el.classList.add('scroll-reveal');
        el.style.transitionDelay = (i * 0.04) + 's';
        observer.observe(el);
    });
})();

// ══════════════════════════════════════════════
//  🌠 ESTRELLAS DE FONDO PULSANTES (fijas)
// ══════════════════════════════════════════════
(function initBgStars() {
    const colors = [
        'rgba(244,167,192,0.45)',
        'rgba(155,107,185,0.35)',
        'rgba(232,201,122,0.3)',
        'rgba(91,45,142,0.25)',
    ];
    for (let i = 0; i < 18; i++) {
        const star = document.createElement('div');
        const size = 2 + Math.random() * 5;
        const dur  = 2 + Math.random() * 4;
        const del  = Math.random() * 4;
        star.style.cssText = `
            position:fixed;
            left:${Math.random() * 100}vw;
            top:${Math.random() * 100}vh;
            width:${size}px;height:${size}px;
            border-radius:50%;
            background:${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events:none;z-index:0;
            animation:starPulse ${dur}s ${del}s ease-in-out infinite alternate;
        `;
        document.body.appendChild(star);
    }
})();

// ══════════════════════════════════════════════
//  💌 TOAST ROMÁNTICO al cargar la página
// ══════════════════════════════════════════════
(function initRomanticToast() {
    const msgs = [
        "Con todo mi amor para ti, mi princesa 💜",
        "Te quiero más cada día que pasa ❤️",
        "Mi psicóloga preciosa, esto es para ti 🌸",
        "Gracias por existir, mi amor ✨",
    ];
    const toast = document.createElement('div');
    toast.className = 'romantic-toast';
    toast.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 3500);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 600);
    }, 7000);
})();

// ══════════════════════════════════════════════
//  💫 ONDAS (RIPPLE) en las cards al hacer hover
// ══════════════════════════════════════════════
(function initCardRipples() {
    const cards = document.querySelectorAll('.message-card, .song-card, .quiz-card, .ruleta-result, .counter-units');
    cards.forEach(card => {
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.addEventListener('click', function(e) {
            const rect = card.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position:absolute;
                left:${e.clientX - rect.left}px;
                top:${e.clientY - rect.top}px;
                width:40px;height:40px;
                border-radius:50%;
                background:rgba(155,107,185,0.22);
                pointer-events:none;
                animation:rippleOut 0.7s ease-out forwards;
                transform:translate(-50%,-50%) scale(0);
            `;
            card.appendChild(ripple);
            setTimeout(() => ripple.remove(), 750);
        });
    });
})();

// ══════════════════════════════════════════════
//  🎨 Añadir keyframes de animación al head
// ══════════════════════════════════════════════
(function addKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes clickHeartBurst {
            0%   { opacity:1; transform:translate(-50%,-50%) scale(0.5); }
            40%  { opacity:0.9; transform:translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.2); }
            100% { opacity:0;   transform:translate(calc(-50% + var(--tx2)), calc(-50% + var(--ty2))) scale(0.3) rotate(30deg); }
        }
        @keyframes rippleOut {
            0%   { transform:translate(-50%,-50%) scale(0); opacity:0.6; }
            100% { transform:translate(-50%,-50%) scale(4.5); opacity:0; }
        }
        @keyframes starPulse {
            from { opacity:0.2; transform:scale(1); }
            to   { opacity:0.7; transform:scale(1.5); }
        }
        .scroll-reveal {
            opacity:0;
            transform:translateY(28px);
            transition:opacity 0.9s cubic-bezier(.22,1,.36,1), transform 0.9s cubic-bezier(.22,1,.36,1);
        }
        .scroll-reveal.revealed {
            opacity:1;
            transform:translateY(0);
        }
    `;
    document.head.appendChild(style);
})();


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

// ─── Mariposas interactivas ────────────────────
(function initMariposas() {

    const RAZONES = [
        {
            titulo: "Te quiero por ser tan unica conmigoooooo ❤️ ",
            msg: "La forma en que me quieres y me demuestras todos tus bonitos sentimientos es increíble❤️.",
            color: "#c04070",
            colorAla: "#e05080",
            colorCuerpo: "#7a1a3a"
        },
        {
            titulo: "Te quiero muchote por darme tanto amooooor ❤️",
            msg: "Siempre me recibes con una sonrisa, con un besito eso me encanta muchote de ti ❤️.",
            color: "#c9a84c",
            colorAla: "#f0c860",
            colorCuerpo: "#7a6030"
        },
        {
            titulo: "Te quiero por todas las sonrisas que me sacas",
            msg: "Ya sean bromas o momentos divertidos entre nosotros dos, los guardo en mi corazón por que valen muchisimo para mi ❤️.",
            color: "#9b6bb9",
            colorAla: "#c9a8e8",
            colorCuerpo: "#3a1560"
        },
        {
            titulo: "Te quiero por que, desde que te conoci supe que quiero estar contigo mucho tiempo",
            msg: "Amor a primera vista o conexion rápida es lo que siento contigo, cuando estoy a tu lado el tiempo pasa rapido, no se siente por ende de mi parte quisiera estar contigo toda mi vida ❤️.",
            color: "#c04070",
            colorAla: "#f090b0",
            colorCuerpo: "#7a1a3a"
        },
        {
            titulo: "Te quiero por que te elegí  a ti y lo volvería a hacer con los ojos cerrados",
            msg: "No fue coincidencia ese dia viernes ir a la universidad y vernos. Fue el destino o mejor dicho Dios uniendo nuestros caminos y si pudiera volver atrás te volvería a elegir mi reina ❤️.",
            color: "#c9a84c",
            colorAla: "#e8d080",
            colorCuerpo: "#5a4020"
        },
    ];

    const section = document.getElementById("mariposasSection");
    const escena  = document.getElementById("mariposasEscena");
    if (!section || !escena) return;

    // Contador visual
    const counter = document.createElement("div");
    counter.className = "mari-counter";
    counter.innerHTML = `<span>🦋</span><div class="mari-counter-fill" id="mariCounterFill"></div>`;
    section.appendChild(counter);

    const counterFill = document.getElementById("mariCounterFill");
    RAZONES.forEach(() => {
        const d = document.createElement("div");
        d.className = "mari-dot-ind";
        counterFill.appendChild(d);
    });

    // Mensaje final
    const finalMsg = document.createElement("div");
    finalMsg.className = "mari-final";
    finalMsg.textContent = "¡Encontraste todas mis razones, mi amor! ❤️ 🦋";
    section.appendChild(finalMsg);

    // SVG de mariposa
    function buildButterflySVG(colorAla, colorCuerpo, size = 80) {
        return `<svg width="${size}" height="${size}" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 36 C34 18 6 10 8 28 C10 42 26 44 40 48 C54 44 70 42 72 28 C74 10 46 18 40 36Z"
                fill="${colorAla}" opacity="0.92"/>
            <path d="M40 48 C30 60 8 68 10 56 C12 46 28 44 40 48Z"
                fill="${colorAla}" opacity="0.7"/>
            <path d="M40 48 C50 60 72 68 70 56 C68 46 52 44 40 48Z"
                fill="${colorAla}" opacity="0.7"/>
            <ellipse cx="40" cy="42" rx="3" ry="9" fill="${colorCuerpo}"/>
            <circle cx="40" cy="33" r="3.5" fill="${colorCuerpo}"/>
            <line x1="38" y1="31" x2="30" y2="22" stroke="${colorCuerpo}" stroke-width="1.2" stroke-linecap="round"/>
            <line x1="42" y1="31" x2="50" y2="22" stroke="${colorCuerpo}" stroke-width="1.2" stroke-linecap="round"/>
        </svg>`;
    }

    // Posiciones iniciales distribuidas
    const POSITIONS = [
        { x: 8,  y: 15 },
        { x: 65, y: 8  },
        { x: 35, y: 55 },
        { x: 72, y: 55 },
        { x: 18, y: 65 },
    ];

    let capturadas = 0;
    const maris = [];

    RAZONES.forEach((r, i) => {
        const el = document.createElement("div");
        el.className = "mari";
        el.innerHTML = buildButterflySVG(r.colorAla, r.colorCuerpo, 72);

        const pos = POSITIONS[i];
        el.style.left = pos.x + "%";
        el.style.top  = pos.y + "%";

        // Animación de vuelo única por mariposa
        const dur   = 3.5 + i * 0.7;
        const delay = i * 0.4;
        const ampX  = 40 + i * 15;
        const ampY  = 25 + i * 10;

        const styleEl = document.createElement("style");
        styleEl.textContent = `
            @keyframes mariFly${i} {
                0%   { transform: translate(0px, 0px) scaleX(1) rotate(-4deg); }
                20%  { transform: translate(${ampX * 0.6}px, -${ampY}px) scaleX(0.5) rotate(2deg); }
                40%  { transform: translate(${ampX}px, ${ampY * 0.4}px) scaleX(1) rotate(-3deg); }
                60%  { transform: translate(${ampX * 0.3}px, ${ampY}px) scaleX(0.6) rotate(4deg); }
                80%  { transform: translate(-${ampX * 0.4}px, -${ampY * 0.5}px) scaleX(1) rotate(-2deg); }
                100% { transform: translate(0px, 0px) scaleX(0.5) rotate(-4deg); }
            }
            @keyframes mariWing${i} {
                0%, 100% { transform: scaleX(1); }
                50%       { transform: scaleX(0.45); }
            }
        `;
        document.head.appendChild(styleEl);

        el.style.animation = `mariFly${i} ${dur}s ${delay}s ease-in-out infinite`;
        el.querySelector("svg").style.animation = `mariWing${i} 0.38s ease-in-out infinite`;

        // Click
        el.addEventListener("click", (e) => {
            if (el.classList.contains("capturada")) return;

            // Partículas
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top  + rect.height / 2;
            const parts = ["🦋","✨","❤️","💜","🌸"];
            for (let p = 0; p < 7; p++) {
                const part = document.createElement("div");
                part.className = "mari-particle";
                part.textContent = parts[p % parts.length];
                const angle = (p / 7) * Math.PI * 2;
                const dist  = 50 + Math.random() * 40;
                part.style.cssText = `
                    left: ${cx}px; top: ${cy}px;
                    --px: ${Math.cos(angle) * dist}px;
                    --py: ${Math.sin(angle) * dist}px;
                `;
                document.body.appendChild(part);
                setTimeout(() => part.remove(), 1000);
            }

            // Capturar
            el.classList.add("capturada");
            capturadas++;

            // Actualizar indicadores
            const dots = counterFill.querySelectorAll(".mari-dot-ind");
            dots[i].classList.add("capturada");

            // Mostrar modal
            document.getElementById("mariposModalSvg").innerHTML =
                buildButterflySVG(r.colorAla, r.colorCuerpo, 90);
            document.getElementById("mariposModalNum").textContent =
                `razón ${String(i+1).padStart(2,"0")} de ${RAZONES.length}`;
            document.getElementById("mariposModalTitulo").textContent = r.titulo;
            document.getElementById("mariposModalMsg").textContent    = r.msg;
            document.getElementById("mariposModalBg").classList.add("visible");

            // Si capturó todas
            if (capturadas === RAZONES.length) {
                setTimeout(() => finalMsg.classList.add("visible"), 600);
            }
        });

        escena.appendChild(el);
        maris.push(el);
    });

    // Cerrar modal — la mariposa NO regresa (ya fue capturada)
    document.getElementById("mariposModalBtn").addEventListener("click", () => {
        document.getElementById("mariposModalBg").classList.remove("visible");
    });
    document.getElementById("mariposModalBg").addEventListener("click", (e) => {
        if (e.target === document.getElementById("mariposModalBg"))
            document.getElementById("mariposModalBg").classList.remove("visible");
    });

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


         {
            photo: "ayer2.jpeg",
            emoji: "⭐",
            caption: "A TU LADO SIEMPRE SERE FELIZ MI AMOR ❤️",
            note: "Cada día que nos vemos es inolvidable",
            color: "#e8d8f8",
            rot: "2deg"
        },
        {
            photo: "caderas.jpeg",
            emoji: "⭐",
            caption: "ESA MANOOOOOOOO ❤️",
            note: "Cada día que nos vemos es inolvidable no puedo dejar de verte y enamorarme cada vez que te veooooo ❤️",
            color: "#e8d8f8",
            rot: "2deg"
        },
        {
            photo: "tesoro.jpeg",
            emoji: "⭐",
            caption: "Otro recuerdo con el AMOR DE MI VIDA ❤️",
            note: "Cada foto la guardo con todo mi amoooor para nosotros",
            color: "#e8d8f8",
            rot: "2deg"
        },

        {
            photo: "pr2.jpeg",
            emoji: "⭐",
            caption: "NUNCA DEJES DE SONREIR AMOR ❤️",
            note: "Yo me encargaré que nadie apague ese brillo tan bonito que tienes mi princesa",
            color: "#e8d8f8",
            rot: "2deg"
        },

         {
            photo: "n1.jpeg",
            emoji: "⭐",
            caption: "Verte a mi lado tan feliz no tiene precio ❤️",
            note: "Esos ojitos cuando brillan de esa forma me encantaaaaan",
            color: "#e8d8f8",
            rot: "2deg"
        },
        

         {
            photo: "n2.jpeg",
            emoji: "⭐",
            caption: "No te soltaré nunca la mano mi AMOR❤️",
            note: "Habrán dias buenos y malos pero juntos de la mano saldremos de todo",
            color: "#e8d8f8",
            rot: "2deg"
        },
        

         {
            photo: "n3.jpeg",
            emoji: "⭐",
            caption: "ESTAR A TU LADO ES UNICO❤️",
            note: "Cada foto cada recuerdo se va directamente a mi corazon donde nunca olvidare todo lo lindo que esta siendo esta nueva etapa juntos  ❤️",
            color: "#e8d8f8",
            rot: "2deg"
        },
        
        
        
    ];

    (function initPlayerLetra() {
 
        // ── Letra con tiempos (segundos desde el inicio de la canción) ──
        const LYRICS = [
            // Estrofa 1
            { t: 14,  text: "No ocupaba nada hasta que te conocí",           stanza: 0 },
            { t: 18,  text: "Luego vi tu cara y ahora soy adicto a ti",       stanza: 0 },
            { t: 22,  text: "Respiro tristeza, más contigo sale el Sol",       stanza: 0 },
            { t: 26,  text: "Me curas en corto, más que paracetamol",          stanza: 0 },
            // Coro 1
            { t: 33,  text: "Quiero dedicarte esta canción",                   stanza: 1 },
            { t: 36,  text: "Le haces tanto bien al corazón",                  stanza: 1 },
            { t: 40,  text: "Quiero que me quieras como yo",                   stanza: 1 },
            { t: 43,  text: "Eres tú mi magia y mi motor",                     stanza: 1 },
            // Puente
            { t: 50,  text: "¡Entre tantas voces te sentí!",                  stanza: 2 },
            { t: 54,  text: "Blanca nubecita en cielo gris",                   stanza: 2 },
            { t: 58,  text: "En el viento me convertiré",                      stanza: 2 },
            { t: 62,  text: "Para acariciar suave tu piel",                    stanza: 2 },
            // Estrofa 2
            { t: 68,  text: "Tú, como la playa, Sol y mar",                   stanza: 3 },
            { t: 72,  text: "Y como aquel bosque me das paz",                  stanza: 3 },
            { t: 76,  text: "Un café con leche, frío y calor",                 stanza: 3 },
            { t: 80,  text: "Amor, das sentido a lo que soy",                  stanza: 3 },
            // Puente final
            { t: 86,  text: "¡Entre tantas voces te sentí!",                  stanza: 4 },
            { t: 90,  text: "Blanca nubecita en cielo gris",                   stanza: 4 },
            { t: 94,  text: "En el viento me convertiré",                      stanza: 4 },
            { t: 98,  text: "Para acariciar suave tu piel",                    stanza: 4 },
        ];
 
        const TOTAL_SECS = 215;
 
        const progBg   = document.getElementById('playerProgBg');
        const progFill = document.getElementById('playerProgFill');
        const timeCur  = document.getElementById('playerTimeCur');
        const lyricsEl = document.getElementById('playerLyricsContainer');
        const btnStart = document.getElementById('playerBtnStart');
        const btnPause = document.getElementById('playerBtnPause');
        const btnReset = document.getElementById('playerBtnReset');
 
        if (!lyricsEl) return;
 
        let elapsed  = 0;
        let running  = false;
        let speed    = 1;
        let lastTs   = null;
        let raf      = null;
        let activeIdx = -1;
 
        // Construir HTML de la letra agrupada en estrofas
        function buildLyrics() {
            const stanzas = {};
            LYRICS.forEach((line, i) => {
                if (!stanzas[line.stanza]) stanzas[line.stanza] = [];
                stanzas[line.stanza].push({ ...line, idx: i });
            });
 
            let html = '';
            Object.values(stanzas).forEach(lines => {
                html += '<div class="player-lyrics-stanza">';
                lines.forEach(line => {
                    html += `<span class="player-lyric-line" data-idx="${line.idx}">${line.text}</span>`;
                });
                html += '</div>';
            });
            lyricsEl.innerHTML = html;
        }
 
        function fmt(s) {
            const m = Math.floor(s / 60);
            const sec = Math.floor(s % 60);
            return m + ':' + String(sec).padStart(2, '0');
        }
 
        function updateLyrics() {
            let newIdx = -1;
            LYRICS.forEach((line, i) => {
                if (elapsed >= line.t) newIdx = i;
            });
            if (newIdx === activeIdx) return;
            activeIdx = newIdx;
 
            const allLines = lyricsEl.querySelectorAll('.player-lyric-line');
            allLines.forEach(el => {
                const i = parseInt(el.dataset.idx);
                el.classList.remove('active', 'past');
                if (i < activeIdx)      el.classList.add('past');
                else if (i === activeIdx) {
                    el.classList.add('active');
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        }
 
        function tick(ts) {
            if (!running) return;
            if (lastTs !== null) {
                elapsed += ((ts - lastTs) / 1000) * speed;
                if (elapsed >= TOTAL_SECS) { elapsed = TOTAL_SECS; running = false; }
            }
            lastTs = ts;
            progFill.style.width = Math.min(100, (elapsed / TOTAL_SECS) * 100) + '%';
            timeCur.textContent  = fmt(elapsed);
            updateLyrics();
            if (running) raf = requestAnimationFrame(tick);
        }
 
        buildLyrics();
 
        btnStart.addEventListener('click', () => {
            if (running) return;
            running = true;
            lastTs  = null;
            raf = requestAnimationFrame(tick);
            btnStart.style.opacity = '0.5';
        });
 
        btnPause.addEventListener('click', () => {
            running = !running;
            if (running) {
                lastTs = null;
                raf = requestAnimationFrame(tick);
                btnPause.textContent = '⏸ Pausar';
                btnStart.style.opacity = '0.5';
            } else {
                btnPause.textContent = '▶ Continuar';
            }
        });
 
        btnReset.addEventListener('click', () => {
            running   = false;
            elapsed   = 0;
            activeIdx = -1;
            lastTs    = null;
            progFill.style.width = '0%';
            timeCur.textContent  = '0:00';
            btnPause.textContent = '⏸ Pausar';
            btnStart.style.opacity = '1';
            lyricsEl.querySelectorAll('.player-lyric-line')
                .forEach(el => el.classList.remove('active', 'past'));
        });
 
        // Click en barra para saltar
        progBg.addEventListener('click', e => {
            const rect = progBg.getBoundingClientRect();
            const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            elapsed    = pct * TOTAL_SECS;
            activeIdx  = -1;
            lastTs     = null;
            progFill.style.width = (pct * 100) + '%';
            timeCur.textContent  = fmt(elapsed);
            updateLyrics();
        });
 
        // Velocidad
        function setSpeed(s, btnId) {
            speed = s;
            ['psp85','psp1','psp115'].forEach(id => {
                document.getElementById(id).classList.remove('active');
            });
            document.getElementById(btnId).classList.add('active');
        }
        document.getElementById('psp85').addEventListener('click',  () => setSpeed(0.85, 'psp85'));
        document.getElementById('psp1').addEventListener('click',   () => setSpeed(1,    'psp1'));
        document.getElementById('psp115').addEventListener('click', () => setSpeed(1.15, 'psp115'));
 
    })();
  



    (function initPolaroid() {

    const POLAROIDS = [
        { photo:"gato.jpeg",   emoji:"🌅", caption:"la primera vez que nos encontramos 😂",         note:"Ese día lo cambió todo ❤️" },
        { photo:"beso.jpeg",   emoji:"💋", caption:"nuestro primer besitooo 🥹",                    note:"Me dejaste sin palabras" },
        { photo:"paisaje.jpeg",emoji:"🌄", caption:"Huyy ese dia ese vestidoooo huuuuuy",            note:"No la miré mucho a los ojos ese dia huuuy" },
        { photo:"mano.jpg",    emoji:"🤝", caption:"Amoooor esa cinturitaaaa 😤",                    note:"Siempre quiero abrazarte así" },
        { photo:"comida.jpg",  emoji:"🍽️", caption:"nuestra cita juntitos comiendo felices 🥺",     note:"Verte feliz no tiene precio ❤️" },
        { photo:"rebe4.jpeg",  emoji:"⭐", caption:"Esos ojitos 🥺",                                note:"Me encanta ❤️" },
        { photo:"c3.jpeg",     emoji:"⭐", caption:"Lo preciosa que estás 🥺 Tan feliz contigo ❤️", note:"WOW" },
        { photo:"c1.jpeg",     emoji:"⭐", caption:"Esos besitos ufff",                              note:"Más fotitos así por favor 😅" },
        { photo:"c2.jpeg",     emoji:"⭐", caption:"Nosotros juntitos como debe ser",               note:"Esa foto me encantó" },
        { photo:"c4.jpeg",     emoji:"⭐", caption:"Qué me veas así me deja uff ❤️",               note:"Me enamora esa miradaaa ❤️" },
        { photo:"ayer2.jpeg",  emoji:"⭐", caption:"A TU LADO SIEMPRE SERÉ FELIZ ❤️",              note:"Cada día es inolvidable" },
        { photo:"caderas.jpeg",emoji:"⭐", caption:"ESA MANOOOO ❤️",                               note:"No puedo dejar de enamorarme cada vez que te veo ❤️" },
        { photo:"tesoro.jpeg", emoji:"⭐", caption:"Otro recuerdo con el AMOR DE MI VIDA ❤️",      note:"Cada foto la guardo con todo mi amor" },
        { photo:"pr2.jpeg",    emoji:"⭐", caption:"NUNCA DEJES DE SONREÍR AMOR ❤️",              note:"Yo me encargaré de ese brillo tan bonito que tienes" },
    ];

    const section = document.getElementById("polaroidSection");
    if (!section) return;

    section.innerHTML = `
        <div class="polaroid-section-label">Galería de recuerdos</div>
        <div class="polaroid-section-title">Nuestros Polaroids ❤️</div>
        <div class="polaroid-section-sub">Toca cada foto para verla mejor, mi amor</div>
        <div class="polaroid-table" id="polaroidTable"></div>
    `;

    const table = document.getElementById("polaroidTable");

    // Distribución en filas para que no se amontonen
    const cols   = 4;
    const colW   = 100 / cols;
    const cardW  = 160;
    const cardH  = 200;
    const rowH   = 220;

    POLAROIDS.forEach((p, i) => {
        const col   = i % cols;
        const row   = Math.floor(i / cols);

        // Posición base + desplazamiento aleatorio suave (seed fija por índice)
        const seed  = (i * 7 + 3) % 19;
        const offX  = (seed % 5) * 10 - 20;   // -20 a +20px
        const offY  = ((seed * 3) % 5) * 8 - 16;
        const rot   = (((i * 13 + 5) % 22) - 11); // -11 a +11 grados

        const x = col * (colW) + (colW / 2) - (cardW / 2) / 6 + offX / 10;
        const y = row * rowH + offY;

        const wrap = document.createElement("div");
        wrap.className = "pol-item";
        wrap.style.cssText = `
            left: calc(${col * colW + colW * 0.1}% + ${offX}px);
            top: ${row * rowH + 20 + Math.abs(offY)}px;
            transform: rotate(${rot}deg);
            z-index: ${10 + (seed % 8)};
        `;

        wrap.innerHTML = `
            <div class="pol-tape"></div>
            <div class="pol-card">
                <div class="pol-img-wrap">
                    <img src="${p.photo}" alt="${p.caption}"
                        onerror="this.style.display='none'">
                    <div class="pol-emoji-fallback">${p.emoji}</div>
                </div>
                <div class="pol-caption">${p.caption}</div>
            </div>
            <div class="pol-heart">❤️</div>
        `;

        wrap.addEventListener("click", () => openLightbox(p));
        table.appendChild(wrap);
    });

    // Ajustar altura del table según filas
    const totalRows = Math.ceil(POLAROIDS.length / cols);
    table.style.minHeight = (totalRows * rowH + 60) + "px";

    // Lightbox
    const overlay = document.getElementById("lbOverlay");
    const lbEmoji = document.getElementById("lbEmoji");
    const lbPhoto = document.getElementById("lbPhotoImg");
    const lbCap   = document.getElementById("lbCaption");
    const lbNote  = document.getElementById("lbNote");
    const lbClose = document.getElementById("lbClose");

    function openLightbox(p) {
        lbEmoji.textContent    = p.emoji;
        lbEmoji.style.display  = "inline";
        lbPhoto.style.display  = "none";
        lbPhoto.src = p.photo;
        lbPhoto.onload  = () => { lbPhoto.style.display = "block"; lbEmoji.style.display = "none"; };
        lbPhoto.onerror = () => { lbPhoto.style.display = "none";  lbEmoji.style.display = "inline"; };
        lbCap.textContent  = p.caption;
        lbNote.textContent = p.note;
        overlay.classList.add("open");
    }

    lbClose.addEventListener("click", () => overlay.classList.remove("open"));
    overlay.addEventListener("click", e => {
        if (e.target === overlay) overlay.classList.remove("open");
    });

})();

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

// ─── Carta animada original ─────────────────────────────
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


/* ══════════════════════════════════════════
   MINIJUEGO: MEMORIA DEL DESTINO
   ══════════════════════════════════════════ */
(function initMemoryGame() {
    const grid = document.getElementById('memoryGrid');
    const winMsg = document.getElementById('memoryWinMsg');
    if (!grid) return;

    // Emojis que representan su historia
    const items = ['💋', '💍', '🧠', '🦋', '🌄', '🍽️'];
    // Si la pantalla es muy pequeña (móvil), mostramos solo 6 pares (12 cartas en grid de 3x4).
    // Si es grande, mostramos 8 pares agregando dos emojis más al array original si gustas.
    let cards = [...items, ...items];
    
    // Barajar las cartas
    cards.sort(() => Math.random() - 0.5);

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matches = 0;

    // Generar el HTML de las cartas dinámicamente
    cards.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('mem-card');
        card.dataset.item = item;

        card.innerHTML = `
            <div class="mem-card-face mem-card-front">${item}</div>
            <div class="mem-card-face mem-card-back"></div>
        `;

        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            // Primer click
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Segundo click
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.item === secondCard.dataset.item;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        matches++;
        
        // Efecto de chispas o algo leve al hacer match (opcional)
        firstCard.style.boxShadow = "0 0 15px rgba(201,168,76,0.4)";
        secondCard.style.boxShadow = "0 0 15px rgba(201,168,76,0.4)";

        resetBoard();

        if(matches === items.length) {
            setTimeout(() => {
                winMsg.classList.add('show');
                // Reutilizamos tu función de lluvia de corazones que creaste para el Quiz
                if(typeof launchHeartsRain === 'function') {
                    launchHeartsRain();
                }
            }, 600);
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1200);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
})();


/* ══════════════════════════════════════════
   MINIJUEGO: EL CÓDIGO DE TUS OJOS
   ══════════════════════════════════════════ */
(function initCodigoOjos() {
    const board = document.getElementById('codigoBoard');
    const keyboard = document.getElementById('codigoKeyboard');
    const heart = document.getElementById('codigoHeart');
    const heartGlow = document.getElementById('codigoHeartGlow');
    const resultPanel = document.getElementById('codigoResult');
    const resultMsg = document.getElementById('codigoResultMsg');
    const restartBtn = document.getElementById('codigoRestartBtn');

    if (!board) return;

    // Puedes cambiar la frase aquí. Elegí esta porque sé que esos ojitos te vuelven loco.
    const FRASE = "ESOS OJITOS SON MIOS";
    const MAX_ERRORES = 6;
    
    let letrasAdivinadas = [];
    let errores = 0;
    let juegoTerminado = false;

    const ALFABETO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

    function inicializarJuego() {
        letrasAdivinadas = [];
        errores = 0;
        juegoTerminado = false;
        
        actualizarCorazon();
        resultPanel.classList.remove('show');
        board.innerHTML = '';
        keyboard.innerHTML = '';

        // Crear tablero de letras
        const palabras = FRASE.split(' ');
        palabras.forEach((palabra, index) => {
            const divPalabra = document.createElement('div');
            divPalabra.className = 'codigo-word';
            
            palabra.split('').forEach(letra => {
                const divLetra = document.createElement('div');
                divLetra.className = 'codigo-letter';
                divLetra.dataset.letra = letra;
                divPalabra.appendChild(divLetra);
            });

            board.appendChild(divPalabra);
            
            // Añadir espacio entre palabras (excepto en la última)
            if (index < palabras.length - 1) {
                const space = document.createElement('div');
                space.className = 'codigo-letter space';
                board.appendChild(space);
            }
        });

        // Crear teclado virtual
        ALFABETO.forEach(letra => {
            const btn = document.createElement('button');
            btn.className = 'codigo-key';
            btn.textContent = letra;
            btn.addEventListener('click', () => procesarIntento(letra, btn));
            keyboard.appendChild(btn);
        });
    }

    function procesarIntento(letra, btn) {
        if (juegoTerminado) return;
        
        btn.disabled = true;
        
        if (FRASE.includes(letra)) {
            btn.classList.add('correct');
            letrasAdivinadas.push(letra);
            revelarLetras(letra);
            verificarVictoria();
        } else {
            btn.classList.add('wrong');
            errores++;
            actualizarCorazon();
            
            // Efecto de "temblor" suave en el corazón al fallar
            heart.style.transform = "scale(0.9) rotate(-5deg)";
            setTimeout(() => heart.style.transform = "scale(1) rotate(0)", 200);
            
            if (errores >= MAX_ERRORES) {
                mostrarDerrota();
            }
        }
    }

    function revelarLetras(letra) {
        const casillas = board.querySelectorAll('.codigo-letter:not(.space)');
        casillas.forEach(casilla => {
            if (casilla.dataset.letra === letra) {
                casilla.textContent = letra;
                casilla.classList.add('revealed');
            }
        });
    }

    function actualizarCorazon() {
        const porcentajeSalud = 1 - (errores / MAX_ERRORES);
        
        // El corazón se va volviendo gris y pierde su brillo dorado
        const grayscale = (errores / MAX_ERRORES) * 100;
        heart.style.filter = `grayscale(${grayscale}%)`;
        
        heartGlow.style.opacity = porcentajeSalud;
        heartGlow.style.transform = `scale(${0.8 + (porcentajeSalud * 0.4)})`;
    }

    function verificarVictoria() {
    const letrasUnicas = [...new Set(FRASE.replace(/ /g, '').split(''))];
    const gano = letrasUnicas.every(letra => letrasAdivinadas.includes(letra));
    
    if (gano) {
        juegoTerminado = true;
        
        // Aquí insertamos la foto (cambia 'rebe4.jpeg' por la foto que más te guste de ella)
        resultMsg.innerHTML = `
            <div class="codigo-win-photo">
                <img src="4.jpeg" alt="Mi princesa">
            </div>
            Lo lograste mi princesaaa❤️<br>
            <span style='font-size:0.8rem; color:var(--text-dim)'>No lo olvides nunca❤️</span>
        `;
        
        resultPanel.classList.add('show');
        
        // Usamos tu función de lluvia de corazones que ya tienes global
        if (typeof launchHeartsRain === 'function') {
            launchHeartsRain();
        }
    }
}

    function mostrarDerrota() {
        juegoTerminado = true;
        // Revelar la frase completa
        
        resultMsg.innerHTML = "Se quedo sin intentooooos <br><span style='font-size:0.8rem; color:var(--text-dim)'>Intente denuevooooooo.</span>";
        resultPanel.classList.add('show');
    }

    restartBtn.addEventListener('click', inicializarJuego);

    // Iniciar el juego al cargar
    inicializarJuego();
})();


/* ════════════════════════════════════════════════
   ✨ NUEVA SECCIÓN 1: RAZONES PSICÓLOGA ✨
   Tarjetas flotantes con animación
   ════════════════════════════════════════════════ */
(function initRazones() {

    const RAZONES = [
        {
            emoji: "💜",
            titulo: "Tu empatía es  increible mi amorcito",
            texto: "He notado su percepcion para sentir cosas en las demas  personas y como actuan eso se valora mucho mi amorr.",
            tag: "Se nota vocación mi amor"
        },
        {
            emoji: "👂",
            titulo: "Escuchas sin juzgar algo que lo valoro mucho yo mi amor",
            texto: "Cuando estoy contigo me siento en paz por que puedo ser yo sin que me juzguen asi me haces sentir tu mi amor.",
            tag: "Una habilidad que tienes para escuchar que se aprecia un monton mi amor de mi vida"
        },
        {
            emoji: "🧠",
            titulo: "Eres brillante e inteligente",
            texto: "Te he visto estudiar y el tiempo que le metes y te he visto pensar y como relacionas todo amor tienes mucho conocimiento. Un examen no te va definir nunca en lo increible que eres como persona amor.",
            tag: "Lo que yo veo con orgullo en ti"
        },
        {
            emoji: "🔥",
            titulo: "Te apasiona lo que estudias amor",
            texto: "No estudias psicología por obligación  ni conveniencia lo haces por tienes esa pasión que te llama amor eso ufff amor vale mucho",
            tag: "Tu motivación"
        },
        {
            emoji: "❤️",
            titulo: "Un examen no te va definir nunca mi princesa",
            texto: "Tu valor como futura psicóloga nunca se va basar en lo que escribas en un papel amor si no en las acciones que tomes como profesional.",
            tag: "Serás la mejor mi amor no me cabe duda"
        },
    ];

    const section = document.getElementById("razonesSection");
    if (!section) return;

    // Estilos de las cartas
    const style = document.createElement("style");
    style.textContent = `
        .cartas-escena {
            position: relative;
            width: 100%;
            min-height: 440px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .carta-hp {
            position: absolute;
            width: 130px;
            height: 90px;
            cursor: pointer;
            transform-style: preserve-3d;
        }
        .carta-hp-inner {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .carta-hp.abierta .carta-hp-inner { transform: rotateY(180deg); }
        .carta-hp-front, .carta-hp-back {
            position: absolute;
            inset: 0;
            border-radius: 10px;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px;
            box-sizing: border-box;
        }
        .carta-hp-front {
            background: linear-gradient(135deg, #f8f0ff, #ede0fa);
            border: 1.5px solid rgba(91,45,142,0.25);
            box-shadow: 0 6px 24px rgba(91,45,142,0.2), inset 0 1px 0 rgba(255,255,255,0.8);
        }
        .carta-hp-front::after {
            content: '';
            position: absolute;
            bottom: -1px; left: -1px; right: -1px;
            height: 28px;
            background: linear-gradient(135deg, #f0e6ff, #e8d8f8);
            border-radius: 0 0 10px 10px;
            clip-path: polygon(0 0, 50% 100%, 100% 0);
        }
        .carta-hp-back {
            background: #fff;
            border: 1.5px solid rgba(91,45,142,0.2);
            box-shadow: 0 6px 24px rgba(91,45,142,0.15);
            transform: rotateY(180deg);
            text-align: center;
            padding: 10px 8px;
        }
        .carta-sello {
            width: 28px; height: 28px;
            border-radius: 50%;
            background: linear-gradient(135deg, #5b2d8e, #9b6bb9);
            display: flex; align-items: center; justify-content: center;
            font-size: 13px; margin-bottom: 4px;
            box-shadow: 0 2px 8px rgba(91,45,142,0.3);
        }
        .carta-sobre-texto {
            font-family: var(--font-serif, Georgia, serif);
            font-size: 9px; color: #7a4aaa;
            font-style: italic; text-align: center;
            letter-spacing: 0.05em; line-height: 1.4;
        }
        .carta-back-num {
            font-family: var(--font-serif, Georgia, serif);
            font-size: 16px; font-weight: 700; color: #5b2d8e;
            line-height: 1; margin-bottom: 2px;
        }
        .carta-back-emoji { font-size: 15px; margin-bottom: 3px; }
        .carta-back-titulo {
            font-family: var(--font-serif, Georgia, serif);
            font-size: 8px; font-weight: 700;
            color: #3a1560; line-height: 1.3; margin-bottom: 4px;
        }
        .carta-back-texto {
            font-family: var(--font-serif, Georgia, serif);
            font-style: italic; font-size: 7px;
            color: #666; line-height: 1.5;
            max-height: 36px; overflow: hidden;
        }
        .carta-back-tag {
            margin-top: 4px;
            font-family: var(--font-sans, sans-serif);
            font-size: 6px; letter-spacing: 0.12em;
            text-transform: uppercase; color: #9b6bb9;
            background: #f0e8ff; padding: 2px 7px;
            border-radius: 20px;
        }
        .ala {
            position: absolute;
            width: 36px; height: 22px;
            background: linear-gradient(135deg, #ede0fa, #d4b8f0);
            border-radius: 50% 50% 0 0;
            border: 1px solid rgba(91,45,142,0.2);
            transform-origin: center bottom;
            pointer-events: none;
        }
        .ala-izq { left: -28px; top: 18px; transform: rotate(-30deg); }
        .ala-der  { right: -28px; top: 18px; transform: rotate(30deg); }
        .carta-hp:not(.abierta):hover .ala-izq {
            animation: bateIzq 0.45s ease-in-out infinite alternate;
        }
        .carta-hp:not(.abierta):hover .ala-der {
            animation: bateDer 0.45s ease-in-out infinite alternate;
        }
        @keyframes bateIzq { from{transform:rotate(-30deg)} to{transform:rotate(-55deg) translateY(-5px)} }
        @keyframes bateDer { from{transform:rotate(30deg)}  to{transform:rotate(55deg) translateY(-5px)} }
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-16px) rotate(-1deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(4deg)}  50%{transform:translateY(-20px) rotate(2deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-12px) rotate(1deg)} }
        .estela-part {
            position: absolute; pointer-events: none; font-size: 10px;
            animation: estelaFade 0.8s ease-out forwards; z-index: 0;
        }
        @keyframes estelaFade {
            0%   { opacity:0.8; transform:scale(1) translateY(0); }
            100% { opacity:0; transform:scale(0.5) translateY(-14px); }
        }
        .cartas-overlay-bg {
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.4);
            z-index: 998; opacity: 0; pointer-events: none;
            transition: opacity 0.3s;
        }
        .cartas-overlay-bg.visible { opacity: 1; pointer-events: all; }
        .carta-panel-detalle {
            position: fixed;
            bottom: 0; left: 0; right: 0;
            background: linear-gradient(135deg, #3a1560, #5b2d8e);
            border-radius: 24px 24px 0 0;
            padding: 28px 32px 36px;
            color: #fff; z-index: 999;
            transform: translateY(100%);
            transition: transform 0.45s cubic-bezier(.22,1,.36,1);
            max-width: 520px; margin: 0 auto;
            box-shadow: 0 -8px 40px rgba(58,21,96,0.4);
        }
        .carta-panel-detalle.visible { transform: translateY(0); }
        .carta-panel-cerrar {
            position: absolute; top: 14px; right: 18px;
            background: rgba(255,255,255,0.15); border: none;
            color: #fff; width: 30px; height: 30px;
            border-radius: 50%; font-size: 14px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
        }
        .carta-panel-num  { font-size: 11px; opacity: 0.6; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px; }
        .carta-panel-emoji { font-size: 26px; margin-bottom: 8px; }
        .carta-panel-titulo { font-family: var(--font-serif, Georgia, serif); font-size: 19px; font-weight: 700; margin-bottom: 10px; line-height: 1.3; }
        .carta-panel-divider { width: 40px; height: 2px; background: rgba(255,255,255,0.4); border-radius: 2px; margin-bottom: 12px; }
        .carta-panel-texto { font-family: var(--font-serif, Georgia, serif); font-style: italic; font-size: 14px; line-height: 1.8; opacity: 0.88; margin-bottom: 12px; }
        .carta-panel-tag { display:inline-block; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; background: rgba(255,255,255,0.18); padding: 5px 14px; border-radius: 50px; opacity: 0.85; }
        .cartas-hint { text-align: center; font-family: var(--font-serif, Georgia, serif); font-style: italic; font-size: 12px; color: rgba(91,45,142,0.6); margin-bottom: 8px; animation: pulsHint 2s ease-in-out infinite; }
        @keyframes pulsHint { 0%,100%{opacity:0.5} 50%{opacity:1} }
    `;
    document.head.appendChild(style);

    // Posiciones en el canvas relativo
    const POS = [
        { x: 40,  y: 40  },
        { x: 210, y: 120 },
        { x: 380, y: 45  },
        { x: 130, y: 270 },
        { x: 310, y: 285 },
    ];

    const FLOAT_ANIMS = [
        { name: "floatA", dur: "4.2s", delay: "0s"   },
        { name: "floatB", dur: "5s",   delay: "0.5s"  },
        { name: "floatC", dur: "4.6s", delay: "0.2s"  },
        { name: "floatB", dur: "5.4s", delay: "0.8s"  },
        { name: "floatA", dur: "4.8s", delay: "0.4s"  },
    ];

    // Rebuild la sección
    section.innerHTML = `
        <div class="razones-label">para ti, mi amorcito</div>
        <div class="razones-title">Razones que yo he visto en primera persona por las que serás<br>una psicóloga increíble 🧠❤️</div>
        <div class="cartas-hint">toca una carta estan algo raras pero con amor</div>
        <div class="cartas-escena" id="cartasEscena"></div>
    `;

    const escena = document.getElementById("cartasEscena");

    // Overlay de fondo
    const overlayBg = document.createElement("div");
    overlayBg.className = "cartas-overlay-bg";
    overlayBg.id = "cartasOverlay";
    document.body.appendChild(overlayBg);

    // Panel de detalle
    const panelEl = document.createElement("div");
    panelEl.className = "carta-panel-detalle";
    panelEl.innerHTML = `
        <button class="carta-panel-cerrar" id="cartaPanelCerrar">✕</button>
        <div class="carta-panel-num"   id="cartaPanelNum"></div>
        <div class="carta-panel-emoji" id="cartaPanelEmoji"></div>
        <div class="carta-panel-titulo" id="cartaPanelTitulo"></div>
        <div class="carta-panel-divider"></div>
        <div class="carta-panel-texto" id="cartaPanelTexto"></div>
        <span class="carta-panel-tag"  id="cartaPanelTag"></span>
    `;
    document.body.appendChild(panelEl);

    let cartaActiva = null;

    function cerrarPanel() {
        panelEl.classList.remove("visible");
        overlayBg.classList.remove("visible");
        if (cartaActiva) { cartaActiva.classList.remove("abierta"); cartaActiva = null; }
    }

    document.getElementById("cartaPanelCerrar").addEventListener("click", cerrarPanel);
    overlayBg.addEventListener("click", cerrarPanel);

    function lanzarEstela(x, y) {
        const emojis = ["✨","💜","🌸","❤️","⭐"];
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const e = document.createElement("div");
                e.className = "estela-part";
                e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                e.style.left  = (x + (Math.random()-0.5)*30) + "px";
                e.style.top   = (y + (Math.random()-0.5)*20) + "px";
                escena.appendChild(e);
                setTimeout(() => e.remove(), 900);
            }, i * 80);
        }
    }

    RAZONES.forEach((r, i) => {
        const pos  = POS[i];
        const fa   = FLOAT_ANIMS[i];
        const num  = String(i + 1).padStart(2, "0");

        const el = document.createElement("div");
        el.className = "carta-hp";
        el.style.cssText = `left:${pos.x}px; top:${pos.y}px; animation:${fa.name} ${fa.dur} ${fa.delay} ease-in-out infinite; z-index:${10+i};`;

        el.innerHTML = `
            <div class="ala ala-izq"></div>
            <div class="ala ala-der"></div>
            <div class="carta-hp-inner">
                <div class="carta-hp-front">
                    <div class="carta-sello">${r.emoji}</div>
                    <div class="carta-sobre-texto">para ti<br>mi amor ❤️</div>
                </div>
                <div class="carta-hp-back">
                    <div class="carta-back-num">${num}</div>
                    <div class="carta-back-emoji">${r.emoji}</div>
                    <div class="carta-back-titulo">${r.titulo}</div>
                    <div class="carta-back-texto">${r.texto}</div>
                    <div class="carta-back-tag">${r.tag}</div>
                </div>
            </div>
        `;

        el.addEventListener("click", () => {
            const rect = el.getBoundingClientRect();
            const sr   = escena.getBoundingClientRect();
            lanzarEstela(rect.left - sr.left + 65, rect.top - sr.top + 45);

            const seAbre = !el.classList.contains("abierta");
            if (cartaActiva && cartaActiva !== el) cartaActiva.classList.remove("abierta");
            el.classList.toggle("abierta");
            cartaActiva = seAbre ? el : null;

            if (seAbre) {
                document.getElementById("cartaPanelNum").textContent   = `razón ${num} de 5`;
                document.getElementById("cartaPanelEmoji").textContent = r.emoji;
                document.getElementById("cartaPanelTitulo").textContent = r.titulo;
                document.getElementById("cartaPanelTexto").textContent  = r.texto;
                document.getElementById("cartaPanelTag").textContent    = r.tag;
                panelEl.classList.add("visible");
                overlayBg.classList.add("visible");
            } else {
                cerrarPanel();
            }
        });

        escena.appendChild(el);
    });

    escena.style.minHeight = "400px";
})();

/* ════════════════════════════════════════════════
   ✨ NUEVA SECCIÓN 2: CARTA MOTIVADORA TYPEWRITER ✨
   ════════════════════════════════════════════════ */
(function initCartaMotivadora() {

    const fechaEl  = document.getElementById("cartaMotivFecha");
    const textoEl  = document.getElementById("cartaMotivTexto");
    const cierreEl = document.getElementById("cartaMotivCierre");
    const cursor   = document.getElementById("cartaMotivCursor");
    const btn      = document.getElementById("cartaMotivBtn");

    if (!textoEl) return;

    // Fecha en formato bonito
    const fecha = new Date().toLocaleDateString("es-ES", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
    if (fechaEl) fechaEl.textContent = fecha;

    // El texto de la carta — dividido en párrafos para respirar
   const PARRAFOS = [
    "Amor de mi vida, novia preciosa de mi corazón.",
    "Ayer uff dia inolvidable para nosotros dos, verte reir llorar, ese brillo en los ojitos el  abrazoooo tan sincero y nuestros besitooos 🙌",
    "Me abrieron los ojos para darme cuenta que contigo quiero estar siempre, estoy atrapado en tu sonrisa y soy fan de tus ojos mi amooooor❤️",
    "Cada dia nuestro amor crece mas y mas de corazon se lo pido que esté siempre a mi lado hagamos las cosas bien por que yo si me veo con usted para muchote tiempooooo❤️ ",
    "Gracias por ser quien eres mi amor , gracias por tu pureza y sencillez, gracias por darme la oportunidad de ser el novio de una niña tan maravillosa te quieroooo infinitooo❤️",
   
];

    const TEXTO_COMPLETO = PARRAFOS.join("\n\n");

    let typeTimer   = null;
    let charIdx     = 0;
    let isTyping    = false;

    function limpiar() {
        clearInterval(typeTimer);
        textoEl.innerHTML = "";
        cierreEl.classList.remove("visible");
        charIdx  = 0;
        isTyping = false;
    }

    function escribir() {
        if (isTyping) return;
        isTyping = true;
        limpiar();

        // Velocidad: 28ms por carácter — suave y legible
        const SPEED = 40;

        typeTimer = setInterval(() => {
            if (charIdx >= TEXTO_COMPLETO.length) {
                clearInterval(typeTimer);
                isTyping = false;
                // Mostrar cierre con fade
                setTimeout(() => cierreEl.classList.add("visible"), 400);
                return;
            }

            const ch = TEXTO_COMPLETO[charIdx];
            charIdx++;

            if (ch === "\n" && TEXTO_COMPLETO[charIdx] === "\n") {
                // doble salto = nuevo párrafo
                textoEl.innerHTML += "<br><br>";
                charIdx++; // saltar el segundo \n
            } else if (ch !== "\n") {
                // escapar HTML básico
                textoEl.innerHTML += ch === "<" ? "&lt;" : ch === ">" ? "&gt;" : ch;
            }
        }, SPEED);
    }

    // Iniciar automáticamente cuando la sección entra en vista
    const section = document.getElementById("cartaMotivSection");
    if (section) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isTyping && charIdx === 0) {
                    setTimeout(escribir, 600);
                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(section);
    }

    // Botón para releer
    if (btn) {
        btn.addEventListener("click", () => {
            limpiar();
            setTimeout(escribir, 200);
        });
    }
})();

/* ============================================
   LÍNEA DEL TIEMPO — timeline.js
   Pegar AL FINAL de script.js
   (antes del último cierre si hay alguno)
   ============================================ */

(function initTimeline() {

    const MOMENTS = [
        {
            side: "left",
            special: false,
            emoji: "📚",
            nodeDelay: "0s",
            badge: "el destino tenia algo para nosotros mi rebe",
            date: "Hace 2 años",
            title: "La primera vez que te vi ufff la vi bieeeen",
            preview: "Te conocí dandote clases sin creer el impacto que tendrias en mi",
            desc: "Hace dos años te vi por primera vez ahi toda nerviosa sin querer preguntar, toda preciosa con timidez",
            photo: null,
            photoEmoji: "📚",
            photoLabel: "el inicio de toda esta bonita historia",
            msg: "El destino nos junto a dar clases y ahora a seguir dando clases huuuuy 💋."
        },
        {
            side: "right",
            special: false,
            emoji: "💬",
            nodeDelay: "0.3s",
            badge: "el primer paso",
            date: "6 de febrero 2026",
            title: "Te escribí por primera vez , con un chiste para romper el hielo y ver que pasaba obviamente mi interes ya estaba en ti amoor",
            preview: "Pensé muchas formas de hablarle hasta que se me ocurrioo algo",
            desc: "El 6 de febrero me armé de valor y te escribí ese mensaje lo pensé mil veces antes de mandarlo y o sabía si ibas a responder, pero lo mandé sin miedo al exito. ",
            photo: null,
            photoEmoji: "💬",
            photoLabel: "ese primer mensaje",
            msg: "La mejor accion que puede hacer."
        },
        {
            side: "right",
            special: false,
            emoji: "🦋",
            nodeDelay: "0.9s",
            badge: "los nervios de ese dia ufff",
            date: "20 de febrero 2026",
            title: "Nos vimos por primera vez en persona ni queria sentarmeeeee",
            preview: "Los dos nerviosos, los dos emocionados. Te vi y WOW solo dije que mujer más preciosa que tengo enfrenteeee",
            desc: "El 20 de febrero nos vimos por primera vez verte ahi enfrente mio , que me sonrieras por primera vezzz uff y me vieras a los ojoooos ❤️",
            photo: null,
            photoEmoji: "🦋",
            photoLabel: "nuestro primer encuentro",
            msg: "Te vi y pensé: qué mujer tan increíble."
        },
        {
            side: "left",
            special: false,
            emoji: "💋",
            nodeDelay: "1.2s",
            badge: "primer besito, bueno fueron variooooos",
            date: "2 de marzo 2026",
            title: "Primera foto juntos y ese primer beso uffff",
            preview: "Nuestra primera foto. Ese beso que me dejó mudo aunque se queda corto mudo jajajaja",
            desc: "Ese día me dejaste sin palabras mi amooor WOW sin palabras como tomaste la iniciatva me encanto 💋",
            photo: "beso.jpeg",
            photoEmoji: "💋",
            photoLabel: "nuestra primera foto",
            msg: "No hablé en todo el camino de regreso. Solo pensaba en ti."
        },
        {
            side: "right",
            special: false,
            emoji: "🌄",
            nodeDelay: "1.5s",
            badge: "ese día tan bonito",
            date: "20 de marzo 2026",
            title: "El paisaje, ese vestido, esa sonrisa uffff",
            preview: "Hay amor ese diaaaa huuuy tenia los ojos en otro ladoooo ufff",
            desc: "Desde que la vi de lejitos esperandome me cambia el estado de animos la sonrisa todoooooo",
            photo: "mano.jpg",
            photoEmoji: "🌄",
            photoLabel: "ese día tan especial",
            msg: "Ese día lo disfrute muchoteeee"
        },
        {
            side: "left",
            special: false,
            emoji: "🍽️",
            nodeDelay: "1.8s",
            badge: "nuestra mejor cita o bueno la primeraaaaa",
            date: "27 de marzo 2026",
            title: "Verte tan feliz conmigo no tiene precio ❤️",
            preview: "Comimos juntos, reímos, estuvimos los dos solos ufff lo mejooooor",
            desc: "El 27 de marzo fue uno de mis momentos más favoritos a tu lado amor, estar contigo disfrutando despues de que tuvo una semana pesada realmente me gusto pasarlo con usted mi reina",
            photo: "comida.jpg",
            photoEmoji: "🍽️",
            photoLabel: "nuestra cita juntitos",
            msg: "Ese día me enamoré aún más de ti, mi amorcito ❤️"
        },
        {
            side: "right",
            special: true,
            emoji: "🎉",
            nodeDelay: "2.1s",
            badge: "2 MESES JUNTOOOOOS AMOOOOR",
            date: "9 de abril 2026",
            title: "Hoy cumplimos 2 meses contigo",
            preview: "Dos meses siendo el hombre más afortunado del mundo y creeme que si amooor",
            desc: "Hoy, 9 de abril, cumplimos 2 meses juntos. Dos meses de verte, de escucharte, de admirarte, de reírme contigo, de querer estar siempre cerca tuyo. Dos meses siendo el hombre más afortunado del mundo por tenerte a mi lado, mi princesa preciosa.",
            photo: "rebe4.jpeg",
            photoEmoji: "🎉",
            photoLabel: "hoy, 2 meses juntos y los que no faltaaaaan",
            msg: "Felices 2 meses, mi psicóloga preciosa la quiero muchoteeeeee ❤️"
        },
        {
            side: "left",
            special: false,
            emoji: "✨",
            nodeDelay: "2.4s",
            badge: "cada día",
            date: "Todos los días",
            title: "Cada vez que hablamos y me alegras el día",
            preview: "No hay un día que no piense en ti creeme cada foto que me mandas me enamora mas y mas de ti",
            desc: "Cada mensaje cada llamada cada vez que te veo me alegra el corazón ❤️",
            photo: "c4.jpeg",
            photoEmoji: "✨",
            photoLabel: "No cambies asi  me encantaaaas",
            msg: "Gracias por existir y por estar en mi vida mi amorcito de mi vidaaaaaa."
        },


        {
            side: "left",
            special: false,
            emoji: "✨",
            nodeDelay: "2.4s",
            badge: "El dia oficial mi amorcito",
            date: "17 de abril del 2026",
            title: "Cada detalle de tu servidor te encanto esos ojitos brillaban de alegria",
            preview: "No puedo explicar aveces lo que siento por ti y cuando te pedi que fueras mi novia esos ojitos te brillaron de una forma UFF supe en ese momento que contigo quiero estar siempre mi cielito te quierooooo❤️",
            photo: "pr2.jpeg",
            photoEmoji: "✨",
            photoLabel: "Verte salir esas lágrimas de la emoción uff ",
            msg: "Gracias por existir y formar parte de mi vida mi amor ❤️"
        },
        {
            side: "right",
            special: false,
            emoji: "🌍",
            nodeDelay: "2.7s",
            badge: "lo que nos queda",
            date: "El futuro",
            title: "Todo lo que aún nos queda por vivir",
            preview: "Más citas, más risas, más momentos, más nosotros juntitoooos y enamoradoooos",
            desc: "Esta linea de tiempo es corta amor pero representa nuestra historia y donde comenzo todo y tiene que seguir asi confiando siempre en Dios nuestro FUTURO ❤️.",
            photo: "rebe1.jpeg",
            photoEmoji: "🌍",
            photoLabel: "nuestra próxima foto juntos",
            msg: "Te elegiría mil veces más, con los ojos cerrados TU SABES ❤️"
        }
    ];

    const container = document.getElementById("tlItems");
    if (!container) return;

    let openCard = null;

    MOMENTS.forEach((m, i) => {
        const isLeft = m.side === "left";
        const item = document.createElement("div");
        item.className = `tl-item ${isLeft ? "from-left" : "from-right"}${m.special ? " special" : ""}`;

        const photoHTML = m.photo
            ? `<img src="${m.photo}" alt="${m.title}"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
               <div class="tl-card-photo-fallback" style="display:none;">${m.photoEmoji}</div>`
            : `<div class="tl-card-photo-fallback">${m.photoEmoji}</div>`;

        const cardHTML = `
            <div class="tl-card" data-idx="${i}">
                <div class="tl-card-bar"></div>
                <div class="tl-card-body">
                    <div class="tl-card-badge">${m.badge}</div>
                    <div class="tl-card-title">${m.title}</div>
                    <div class="tl-card-preview">${m.preview}</div>
                </div>
                <div class="tl-card-toggle">
                    <span>ver más</span>
                    <span class="tl-card-toggle-arrow"></span>
                </div>
                <div class="tl-card-expand">
                    <div class="tl-card-divider"></div>
                    <div class="tl-card-desc">${m.desc}</div>
                    <div class="tl-card-photo-wrap">
                        ${photoHTML}
                        <div class="tl-card-photo-label">${m.photoLabel}</div>
                    </div>
                    <div class="tl-card-msg">${m.msg}</div>
                </div>
            </div>`;

        const nodeHTML = `
            <div class="tl-node-col">
                <div class="tl-node" style="--node-delay:${m.nodeDelay}">${m.emoji}</div>
                <div class="tl-node-date">${m.date}</div>
            </div>`;

        if (isLeft) {
            item.innerHTML = `
                <div class="tl-cell-left">${cardHTML}</div>
                ${nodeHTML}
                <div class="tl-cell-empty"></div>`;
        } else {
            item.innerHTML = `
                <div class="tl-cell-empty"></div>
                ${nodeHTML}
                <div class="tl-cell-right">${cardHTML}</div>`;
        }

        container.appendChild(item);

        // Click para expandir/cerrar
        const card = item.querySelector(".tl-card");
        card.addEventListener("click", () => {
            const isOpen = card.classList.contains("open");
            if (openCard && openCard !== card) {
                openCard.classList.remove("open");
                openCard.querySelector(".tl-card-toggle span:first-child").textContent = "ver más";
            }
            card.classList.toggle("open", !isOpen);
            card.querySelector(".tl-card-toggle span:first-child").textContent = !isOpen ? "cerrar" : "ver más";
            openCard = !isOpen ? card : null;

            if (!isOpen) {
                setTimeout(() => {
                    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }, 300);
            }
        });
    });

    // Scroll reveal con IntersectionObserver
    const items = container.querySelectorAll(".tl-item");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    items.forEach((el, i) => {
        el.style.transitionDelay = (i * 0.08) + "s";
        observer.observe(el);
    });

})();


/* ══════════════════════════════════════════
   LLUVIA DE PÉTALOS Y CORAZONES 🌸💜
   ══════════════════════════════════════════ */
(function initLluviaPetalos() {
  const items = ['🌸','💜','🌷','❤️','💗','🌺','💕','💖','🌸','💜'];

  const style = document.createElement('style');
  style.textContent = `
    .petalo-rain {
      position: fixed;
      top: -50px;
      pointer-events: none;
      user-select: none;
      z-index: 99998;
      animation: petaloCaer linear forwards;
    }
    @keyframes petaloCaer {
      0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
      80%  { opacity: 1; }
      100% { transform: translateY(110vh) rotate(720deg) scale(0.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function crearPetalo() {
    const el = document.createElement('div');
    el.className = 'petalo-rain';
    el.textContent = items[Math.floor(Math.random() * items.length)];
    const size = 20 + Math.random() * 22;
    el.style.cssText = `
      font-size: ${size}px;
      left: ${Math.random() * 98}vw;
      animation-duration: ${3 + Math.random() * 4}s;
      animation-delay: ${Math.random() * 1.5}s;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 7000);
  }

  /* Primera oleada al cargar */
  for (let i = 0; i < 35; i++) {
    setTimeout(crearPetalo, i * 120);
  }

  /* Lluvia continua durante 12 segundos */
  let count = 0;
  const interval = setInterval(() => {
    crearPetalo();
    count++;
    if (count > 60) clearInterval(interval);
  }, 200);
})();

(function() {
    const CAJAS = [
        {
            icono: "💌",
            tituloGrid: "Mensaje secreto",
            titulo: "Para cuando te sientas sola o desanimada mi amor",
            msg: "Aunque estemos lejos siempre, yo siempre estaré para ti dandote la prioridad que te mereces mi REINA acá hay alguien a quien le importas MUCHISIMO ❤️."
        },
        {
            icono: "🌸",
            tituloGrid: "Nuestras Tardes",
            titulo: "Momentos que no olvidaré nunca",
            msg: "Disfrutar cada momento contigo, no tiene precio, verte , sentirte y hablar noo tiene precio y nunca lo tendrá es la mejor parte de mi SEMANA 💖."
        },
        {
            icono: "🧠",
            tituloGrid: "Futura psicóloga",
            titulo: "Serás una gran psicologa mi amor",
            msg: "Hay mi niña, usted tiene futuro en la psicologia se le nota a leguas mi amor, enfoquesé en usted y todo lo que va lograr yo CONFÍO en ti Y SIEMPRE PERO SIEMPRE ORGULLO DE TI ❤️"
        },
        {
            icono: "😤",
            tituloGrid: "Tu carita de enojoooona",
            titulo: "Me mataaaaaa",
            msg: "No sé cómo explicarlo pero cuando te enojas y pones esa carita me muero jeje Me dan ganas de abrazarte y no soltarte ya que eres demasiado linda hasta cuando estás molesta, mujer 💕."
        },
        {
            icono: "🌺",
            tituloGrid: "Lo que admiro de ti",
            titulo: "Lo que más admiro de ti",
            msg: "Admiro tu fuerza para seguir adelante aunque las cosas estén difíciles la presion constante no es fácil y Admiro tu mente fuerte y como resuelves las cosas, tu sensibilidad con todo , tu forma de ver el mundo y de pensar mi amor. Eres una persona extraordinaria que quiero pasar el resto de mi vida CONTIGO. 💌"
        },
        {
            icono: "🎯",
            tituloGrid: "Nuestra promesa",
            titulo: "Te lo prometo de corazon",
            msg: "No me voy a rendir nunca mi rebe luucharé y lucharé por ti y por lo nuestro porque lo que tenemos vale todo lo bueno de este mundo y tu Te mereces a alguien que se quede, que luche, que te elija todos los días, que te escuche, que te quiera que te valore todo lo que usted vale mi CIELO 💌 . Ese soy yo  mi amor."
        },
        {
            icono: "🌟",
            tituloGrid: "Lo que me diste",
            titulo: "Lo que me diste sin saber y cambiaria mi vida",
            msg: "Me diste paz cuando mi mente estaba revuelta de tantos problemas personales , me diste razones para sonreír cada dia por un lindo motivo y ademas me diste una oportunidad de robarte el corazón y me diste todo tu amoooooor y hasta el momento eso es lo mejor que alguien me ha dado en la vida. 💕"
        },
        {
            icono: "👁️",
            tituloGrid: "Tus ojos",
            titulo: "Esos ojos, Dios mío",
            msg: "Tus ojos tienen algo que no puedo explicar, solo sentir en mi cuerpo y corazón una sensación de sentirme querido que ufff. Con solo verme me ablandas el corazón uff y no hay  ningún lugar en el mundo donde preferiría estar que perdiéndome en esa mirada tuya, mujer preciosa. ME ENCANTASSS 💕" 
        },
        {
            icono: "∞",
            tituloGrid: "Lo que viene PARA NOSOTROS",
            titulo: "Lo que nos queda por vivir  y compartir JUNTOS",
            msg: "Esto que vivimos es solo el comienzo y es un lindo comienzooooo yo de mi parte quiero seguir escribiendo momentos contigo, mi amor. Buenos días siempre, nuestras aventuras, risas, y hasta las peleas que se arreglan con un beso o muchos besitoooos como ayer HUUUUY. Todo eso, contigo. 💕"
        }
    ];
 
    let abiertos = 0;
    const grid = document.getElementById('cofreGrid');
    const modalBg = document.getElementById('cofreModalBg');
    const modalEmoji = document.getElementById('cofreModalEmoji');
    const modalTitulo = document.getElementById('cofreModalTitulo');
    const modalMsg = document.getElementById('cofreModalMsg');
    const modalBtn = document.getElementById('cofreModalBtn');
    const progresoTexto = document.getElementById('cofreProgresoTexto');
    const barraFill = document.getElementById('cofreBarraFill');
    const finalMsg = document.getElementById('cofreFinal');
 
    CAJAS.forEach(function(c, i) {
        var div = document.createElement('div');
        div.className = 'caja';
        div.innerHTML =
            '<span class="caja-lock">\uD83D\uDD12</span>' +
            '<span class="caja-icono">' + c.icono + '</span>' +
            '<span class="caja-num">Cajita ' + (i + 1) + '</span>' +
            '<span class="caja-titulo-mini">' + c.tituloGrid + '</span>';
 
        div.addEventListener('click', function() {
            if (div.classList.contains('abierta')) return;
            div.classList.add('abierta');
            div.querySelector('.caja-lock').textContent = '\uD83D\uDC9D';
            abiertos++;
            progresoTexto.textContent = abiertos + ' de 9 descubiertas';
            barraFill.style.width = (abiertos / 9 * 100) + '%';
 
            if (abiertos === 9) {
                setTimeout(function() {
                    lanzarConfeti(200);
                    finalMsg.classList.add('visible');
                }, 600);
            } else {
                lanzarConfeti(60);
            }
 
            modalEmoji.textContent = c.icono;
            modalTitulo.textContent = c.titulo;
            modalMsg.textContent = c.msg;
            modalBg.classList.add('visible');
        });
 
        grid.appendChild(div);
    });
 
    modalBtn.addEventListener('click', function() { modalBg.classList.remove('visible'); });
    modalBg.addEventListener('click', function(e) { if (e.target === modalBg) modalBg.classList.remove('visible'); });
 
    /* ── Confeti ── */
    var canvas = document.getElementById('cofre-confeti-canvas');
    var ctx = canvas.getContext('2d');
    var particles = [];
    var animId = null;
    var colors = ['#f9a8b8','#f4c2c2','#ffd6e0','#c9b8f4','#b8d4f4','#b8f4c9','#f4e0b8'];
 
    function lanzarConfeti(n) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        for (var i = 0; i < n; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rot: Math.random() * 360,
                rv: (Math.random() - 0.5) * 6,
                life: 1
            });
        }
        if (!animId) tick();
    }
 
    function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function(p) {
            p.x += p.vx; p.y += p.vy;
            p.rot += p.rv; p.vy += 0.05;
            p.life -= 0.008;
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            ctx.restore();
        });
        particles = particles.filter(function(p) { return p.life > 0 && p.y < canvas.height + 20; });
        if (particles.length > 0) {
            animId = requestAnimationFrame(tick);
        } else {
            animId = null;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
})();

(function initAnilloSection() {
 
    /* ── Scroll reveal para las promesas (aparecen una a una) ── */
    const section = document.getElementById('anilloSection');
    const items   = document.querySelectorAll('.anillo-promesa-item');
    if (!section || !items.length) return;
 
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                items.forEach((item, i) => {
                    setTimeout(() => item.classList.add('visible'), i * 130);
                });
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.25 });
 
    observer.observe(section);
 
    /* ── Click en el anillo: mini lluvia de corazones ── */
    const ringSvg = document.querySelector('.anillo-ring-svg');
    if (ringSvg) {
        ringSvg.addEventListener('click', () => {
            const rain = document.getElementById('heartsRain');
            if (!rain) return;
            const emojis = ['❤️','💍','💗','✨','💖','🌹'];
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const h = document.createElement('div');
                    h.className = 'h-drop';
                    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                    h.style.left = Math.random() * 100 + 'vw';
                    h.style.animationDuration = (1.4 + Math.random() * 1.8) + 's';
                    h.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
                    rain.appendChild(h);
                    setTimeout(() => h.remove(), 3200);
                }, i * 80);
            }
        });
    }
 
})();

// ─── Estrellas de fondo sección videos ───
(function initVbfStars() {
    const container = document.getElementById('vbfStars');
    if (!container) return;
    for (let i = 0; i < 40; i++) {
        const star = document.createElement('div');
        star.className = 'vbf-star';
        const size = 1.5 + Math.random() * 3;
        star.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random()*100}%;
            top:${Math.random()*100}%;
            animation-duration:${2+Math.random()*4}s;
            animation-delay:${Math.random()*4}s;
        `;
        container.appendChild(star);
    }
})();


/* ════════════════════════════════════════════════
   EXPEDIENTE CLÍNICO CONFIDENCIAL
   ════════════════════════════════════════════════ */
(function initExpedienteClinico() {
    const input = document.getElementById('expInput');
    const btn = document.getElementById('expBtn');
    const errorMsg = document.getElementById('expError');
    const lockScreen = document.getElementById('expLock');
    const reportScreen = document.getElementById('expReport');

    if (!btn || !input) return;

    // 👇 PON AQUÍ LA FRASE EXACTA QUE ELLA DEBE ESCRIBIR 👇
    const FRASE_SECRETA = "MI"; 

    // Función para limpiar texto (quita tildes y lo hace minúscula para evitar fallos)
    function limpiarTexto(texto) {
        return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    function verificarFrase() {
        const fraseIngresada = limpiarTexto(input.value);
        const fraseCorrecta = limpiarTexto(FRASE_SECRETA);

        if (fraseIngresada === fraseCorrecta) {
            // ¡Frase correcta! Ocultar candado y mostrar reporte
            errorMsg.classList.remove('show');
            lockScreen.style.display = 'none';
            reportScreen.style.display = 'block';

            // Lanzar los corazones si existe la función global que creaste
            if (typeof launchHeartsRain === 'function') {
                launchHeartsRain();
            }
        } else {
            // Frase incorrecta, mostrar error
            errorMsg.classList.add('show');
            input.value = ''; // Limpia el input para que lo intente de nuevo
            input.focus();

            // Ocultar el mensaje de error después de 3 segundos
            setTimeout(() => {
                errorMsg.classList.remove('show');
            }, 3000);
        }
    }

    // Verificar al darle clic al botón
    btn.addEventListener('click', verificarFrase);

    // Verificar si presiona la tecla "Enter" en el teclado
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verificarFrase();
        }
    });
})();