// ══════════════════════════════════════
//  DETECCIÓN DE MÓVIL (optimización performance)
// ══════════════════════════════════════
const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ══════════════════════════════════════
//  PANTALLA DE BIENVENIDA
// ══════════════════════════════════════
(function initWelcome() {
  const ws = document.getElementById('welcome-screen');
  const heartsContainer = document.getElementById('wsHearts');
  if (!ws || !heartsContainer) return;

  // Generar corazoncitos flotantes — reducidos en móvil para no generar lag
  const emojis = ['❤️','💛','✨','💕'];
  const heartCount = IS_MOBILE ? 4 : 14;
  for (let i = 0; i < heartCount; i++) {
    const h = document.createElement('span');
    h.className = 'ws-heart';
    h.textContent = emojis[i % emojis.length];
    h.style.left = (i / heartCount * 100) + '%';
    h.style.animationDelay = (i * 0.8) + 's';
    h.style.animationDuration = (5 + (i % 3)) + 's';
    h.style.fontSize = '1rem';
    heartsContainer.appendChild(h);
  }
})();

function enterSite() {
  const ws = document.getElementById('welcome-screen');
  if (!ws) return;
  ws.classList.add('hiding');
  setTimeout(() => { ws.style.display = 'none'; }, 850);
}

// ══════════════════════════════════════
//  CONFIG — edita aquí
// ══════════════════════════════════════
const startDate  = new Date(2026, 1, 12, 0, 0, 0); // 12 febrero 2026
const startLabel = "12 de febrero, 2026";

const floatingPhrases = [
  "eres mi lugar favorito", "te amo más que al mar", "mi angelito",
  "eres tan bonita", "me encantan tus ojos", "gracias por existir",
  "tú eres mi calma", "te pienso siempre", "eres todo mi mundo",
  "me haces tan feliz", "eres mi atardecer", "te amo, Rebe",
  "contigo todo es mejor", "eres mi razón favorita", "mi psicóloga favorita",
  "te elegiría mil veces", "eres tan especial", "mi amor eterno",
  "nunca me canso de ti", "eres mi sol y mi mar",
];

// ══════════════════════════════════════
//  COUNTER
// ══════════════════════════════════════
document.getElementById('start-label').textContent = startLabel;
let lastSec = -1;

function updateCounter() {
  const now  = new Date();
  const diff = now - startDate;
  const days    = Math.floor(diff / (1000*60*60*24));
  const hours   = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((diff % (1000*60)) / 1000);

  document.getElementById('cnt-days').textContent    = days.toLocaleString();
  document.getElementById('cnt-hours').textContent   = String(hours).padStart(2,'0');
  document.getElementById('cnt-minutes').textContent = String(minutes).padStart(2,'0');

  const secEl = document.getElementById('cnt-seconds');
  if (secEl) {
    secEl.textContent = String(seconds).padStart(2,'0');
    if (seconds !== lastSec) {
      secEl.classList.remove('bump');
      void secEl.offsetWidth;
      secEl.classList.add('bump');
      lastSec = seconds;
    }
  }
}
updateCounter();
setInterval(updateCounter, 1000);

// ══════════════════════════════════════
//  HORIZONTAL SCROLL
// ══════════════════════════════════════
const track      = document.getElementById('track');
const panels     = document.querySelectorAll('.panel');
const dots       = document.querySelectorAll('.dot');
const progress   = document.getElementById('progress');
const scrollInfo = document.getElementById('scroll-info');
const panelLabel = document.getElementById('panel-label');
const arrowHint  = document.getElementById('arrow-hint');

const labels = ['Nosotros','Nuestro amor','Mi Psicóloga ❤️','Mis promesas 💌','Corazón','Recuerdos','Nuestra historia','Nuestros sueños 💛','Carta de amor','Para siempre'];

let current = 0;
let isScrolling = false;
let lightboxOpen = false;
let wheelAccum = 0;
let wheelTimer = null;

function setLightboxOpen(val) {
  lightboxOpen = val;
  if (!val) { wheelAccum = 0; clearTimeout(wheelTimer); }
}

function goTo(n) {
  if (n < 0 || n >= panels.length || isScrolling) return;
  isScrolling = true;

  // Resetear scroll del panel anterior al cambiar
  if (panels[current] && panels[current].scrollTop > 0) {
    panels[current].scrollTop = 0;
  }

  current = n;
  track.style.transform = `translateX(-${current * 100}vw)`;
  dots.forEach((d,i) => d.classList.toggle('active', i === current));
  progress.style.width = `${(current / (panels.length - 1)) * 100}%`;
  const fmt = n => n < 10 ? `0${n}` : `${n}`;
  scrollInfo.textContent = `${fmt(current+1)} / ${fmt(panels.length)}`;
  panelLabel.textContent = labels[current] || 'Momento especial';
  arrowHint.style.opacity = current === panels.length - 1 ? '0' : '1';

  panels.forEach((p,i) => p.classList.toggle('active', i === current));

  // Cuando entramos al panel 4 (timeline), resetear su scroll
  if (n === 5) {
    const inner = document.getElementById('tlAxisWrap');
    if (inner) inner.scrollLeft = 0;
  }

  setTimeout(() => { isScrolling = false; }, 950);
}

panels[0].classList.add('active');

window.addEventListener('wheel', (e) => {
  if (lightboxOpen) return;

  // 1. EXCEPCIÓN PARA LA CARTA (Para que puedas leerla completa)
  const cartaPapel = document.getElementById('cartaPapel');
  if (cartaPapel && cartaPapel.classList.contains('abierta') && e.target.closest('#cartaPapel')) {
    const atTop = cartaPapel.scrollTop <= 0;
    const atBottom = cartaPapel.scrollTop + cartaPapel.clientHeight >= cartaPapel.scrollHeight - 1;

    if (!(e.deltaY < 0 && atTop) && !(e.deltaY > 0 && atBottom)) {
       return; 
    }
  }

  // 2. EXCEPCIÓN PARA LA LÍNEA DE TIEMPO
  const SCROLL_PANEL_IDX_NUEVO = 4; 
  
  if (current === SCROLL_PANEL_IDX_NUEVO) {
    const inner = document.getElementById('tlAxisWrap');
    if (inner && e.target.closest('#tlAxisWrap')) {
      const atLeft  = inner.scrollLeft <= 0;
      const atRight = inner.scrollLeft + inner.clientWidth >= inner.scrollWidth - 4;

      if (!(e.deltaY > 0 && atRight) && !(e.deltaY < 0 && atLeft)) {
        e.preventDefault();
        inner.scrollBy({ left: e.deltaY * 1.2, behavior: 'auto' });
        return;
      }
    }
  }

  // 3. COMPORTAMIENTO NORMAL: SCROLL GLOBAL HORIZONTAL ENTRE PANELES
  e.preventDefault(); 
  wheelAccum += e.deltaY;
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => { wheelAccum = 0; }, 300);

  if (wheelAccum > 60)       { wheelAccum = 0; goTo(current + 1); }
  else if (wheelAccum < -60) { wheelAccum = 0; goTo(current - 1); }
}, { passive: false });

let touchX = null;
let touchY = null;
let touchStartScrollTop = 0;

window.addEventListener('touchstart', (e) => {
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
  // Guardar posición de scroll del panel activo para saber si está en el borde
  const activePanel = panels[current];
  touchStartScrollTop = activePanel ? activePanel.scrollTop : 0;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;

  // Solo navegar si el swipe es claramente horizontal (dx > dy) y supera umbral
  const isHorizontalSwipe = Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 60;

  if (isHorizontalSwipe) {
    // En swipe horizontal hacia panel siguiente: verificar que el panel no esté scrolleando
    const activePanel = panels[current];
    const scrollTop = activePanel ? activePanel.scrollTop : 0;
    const scrollHeight = activePanel ? activePanel.scrollHeight : 0;
    const clientHeight = activePanel ? activePanel.clientHeight : 0;
    const atTop = scrollTop <= 2;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 2;

    // Si el panel tiene scroll interno y no está en el borde, no navegar
    if (scrollHeight > clientHeight + 10) {
      if (dy > 0 && !atTop) { touchX = null; touchY = null; return; }
      if (dy < 0 && !atBottom) { touchX = null; touchY = null; return; }
    }

    goTo(dx < 0 ? current + 1 : current - 1);
  }
  touchX = null; touchY = null;
}, { passive: true });

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
});

dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.panel)));
function scrollToTop() { goTo(0); }

// ══════════════════════════════════════
//  CUSTOM CURSOR
// ══════════════════════════════════════
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top  = my - 6 + 'px';
});

// Cursor ring animation: solo en desktop
if (!IS_MOBILE && !PREFERS_REDUCED_MOTION) {
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx - 18 + 'px';
    ring.style.top  = ry - 18 + 'px';
    requestAnimationFrame(animRing);
  })();
}



/* ══════════════════════════════════════
   CAJITAS SORPRESA
══════════════════════════════════════ */
// (function() {

//   const MENSAJES = [
//     { icon: '💌', emoji: '💌', title: 'Carta de amor', msg: 'Cada mañana que me despierto pienso en ti mi amor y me alegro mucho la gran mujer que tengo en mi vida.<br><em>Eres todo lo que siempre quise mi niña chiquita.</em><span class="sb-msg-firma">— Tu angelito ❤️</span>' },
//     { icon: '🌹', emoji: '🌹', title: 'Para siempre', msg: 'Si me dieran a elegirte en otra vida<br><em>te elegiria con los ojos cerrados mi amor 1000 veces a ti mi niña</em><span class="sb-msg-firma">— Tu nando ❤️</span>' },
//     { icon: '✨', emoji: '✨', title: 'Lo que admiro', msg: 'Admiro tu fortaleza para abordar las cosas<br>y esa forma tan bonita que tienes de quererme y demostrar todo tu amor hacia mi <br><em>Eres muy especial para mi amorcito.</em><span class="sb-msg-firma">— Siempre tuyo ❤️</span>' },
//     { icon: '🌊', emoji: '🌊', title: 'Juntos siempre', msg: 'Contigo mi vida es más bonita<br>mis dias son mejores<br><em> y me siento muy feliz desde que estamos juntos mi niña</em><span class="sb-msg-firma">— Tu angelito ❤️</span>' },
//     { icon: '🫀', emoji: '🫀', title: 'Mi corazón', msg: 'Mi corazón te pertenece mi amor nada de nadie va cambiar eso<br><em>Eres  el motivo por el que late mi vida.</em><span class="sb-msg-firma">— Te quiero infinito ❤️</span>' },
//     { icon: '💍', emoji: '💍', title: 'Mi sueño', msg: 'Mi sueño más bonito  es que estes conmigo toda mi vida,<br>tu sonrisa y tus ojos preciosos.<br><em>Quiero verlos toda mi vida mi amor</em><span class="sb-msg-firma">— Te quiero muchote ❤️</span>' },
//   ];

//   const grid = document.getElementById('sbGrid');
//   const modal = document.getElementById('sbModal');
//   const modalEmoji = document.getElementById('sbModalEmoji');
//   const modalMsg   = document.getElementById('sbModalMsg');
//   const modalClose = document.getElementById('sbModalClose');
//   const modalSparkles = document.getElementById('sbModalSparkles');

//   if (!grid) return;

//   let openedCount = 0;
//   let nextToOpen = 0; // solo se puede abrir en orden

//   // Crear cajitas
//   MENSAJES.forEach(function(m, i) {
//     const box = document.createElement('div');
//     box.className = 'sb-box';
//     box.dataset.idx = i;
//     box.style.animationDelay = (i * 0.08) + 's';

//     box.innerHTML = `
//       <div class="sb-box-front">
//         <div class="sb-box-icon">${m.icon}</div>
//         <div class="sb-box-label">${m.title}</div>
//         <div class="sb-box-hint">✦ toca para abrir</div>
//       </div>
//       <div class="sb-box-opened">
//         <div class="sb-box-check">💝</div>
//         <div class="sb-box-opened-label">¡Abierta!</div>
//       </div>
//     `;

//     box.addEventListener('click', function() {
//       if (box.classList.contains('sb-opened')) {
//         // Permite re-ver el mensaje si ya está abierta
//         showModal(m);
//         return;
//       }
//       if (i !== nextToOpen) {
//         // Sacude un poco la caja indicando que debe ir en orden
//         box.style.animation = 'none';
//         box.style.transform = 'translateX(-6px)';
//         setTimeout(function(){ box.style.transform = 'translateX(6px)'; }, 80);
//         setTimeout(function(){ box.style.transform = 'translateX(-4px)'; }, 160);
//         setTimeout(function(){ box.style.transform = 'translateX(0)'; }, 240);
//         return;
//       }
//       openBox(box, m, i);
//     });

//     grid.appendChild(box);
//   });

//   // Añadir indicador de progreso
//   const progressWrap = document.createElement('div');
//   progressWrap.className = 'sb-progress-wrap';
//   progressWrap.innerHTML = `
//     <span id="sbOpenedCount">0</span> / <span>${MENSAJES.length}</span> abiertas
//     <div class="sb-progress-bar-track">
//       <div class="sb-progress-bar-fill" id="sbProgressFill" style="width:0%"></div>
//     </div>
//   `;
//   grid.after(progressWrap);

//   function openBox(box, m, i) {
//     box.classList.add('sb-opened');
//     nextToOpen++;
//     openedCount++;

//     // Actualizar progreso
//     const countEl = document.getElementById('sbOpenedCount');
//     const fillEl  = document.getElementById('sbProgressFill');
//     if (countEl) countEl.textContent = openedCount;
//     if (fillEl)  fillEl.style.width = (openedCount / MENSAJES.length * 100) + '%';

//     // Confetti
//     spawnConfetti(box);

//     // Mostrar modal con pequeño delay para ver la animación
//     setTimeout(function(){ showModal(m); }, 350);
//   }

//   function spawnConfetti(box) {
//     const colors = ['#e8a857','#d4697a','#9b89b8','#f0c97a','#fff'];
//     const rect = box.getBoundingClientRect();
//     for (var c = 0; c < 14; c++) {
//       const piece = document.createElement('div');
//       piece.className = 'sb-confetti-piece';
//       piece.style.cssText = `
//         left: 50%; top: 50%;
//         background: ${colors[Math.floor(Math.random() * colors.length)]};
//         border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
//         --tx: ${(Math.random()-0.5)*90}px;
//         --ty: ${(Math.random()-1.2)*80}px;
//         --tr: ${(Math.random()-0.5)*360}deg;
//         animation-duration: ${0.6 + Math.random()*0.5}s;
//         animation-delay: ${Math.random()*0.1}s;
//       `;
//       box.appendChild(piece);
//       setTimeout(function(){ piece.remove(); }, 1200);
//     }
//   }

//   function showModal(m) {
//     // Limpiar sparkles anteriores
//     modalSparkles.innerHTML = '';
//     // Agregar sparkles nuevos
//     const sparks = ['✦','❤','✿','★','♥','🌸'];
//     for (var s = 0; s < 10; s++) {
//       const sp = document.createElement('div');
//       sp.className = 'sb-modal-spark';
//       sp.textContent = sparks[Math.floor(Math.random() * sparks.length)];
//       sp.style.cssText = `
//         left:${10 + Math.random()*80}%;
//         top:${10 + Math.random()*80}%;
//         --tx:${(Math.random()-0.5)*80}px;
//         --ty:${(Math.random()-0.5)*80}px;
//         animation-delay:${Math.random()*0.3}s;
//         color:${['#e8a857','#d4697a','#9b89b8','#fff'][Math.floor(Math.random()*4)]};
//       `;
//       modalSparkles.appendChild(sp);
//     }

//     modalEmoji.textContent = m.emoji;
//     modalMsg.innerHTML = m.msg;
//     modal.classList.add('sb-modal--visible');
//   }

//   function hideModal() {
//     modal.classList.remove('sb-modal--visible');
//   }

//   modalClose.addEventListener('click', hideModal);
//   modal.addEventListener('click', function(e){ if (e.target === modal) hideModal(); });

//   // Corazones flotantes de fondo
//   const heartsEl = document.getElementById('sbHeartsFloat');
//   if (heartsEl) {
//     const hEmojis = ['❤','💕','🌸','✦','💛'];
//     for (var h = 0; h < 12; h++) {
//       const hh = document.createElement('span');
//       hh.textContent = hEmojis[Math.floor(Math.random() * hEmojis.length)];
//       hh.style.cssText = `
//         position:absolute;
//         left:${Math.random()*100}%;
//         top:${Math.random()*100}%;
//         font-size:${0.7 + Math.random()*0.8}rem;
//         opacity:${0.04 + Math.random()*0.08};
//         animation: floatHeart ${5 + Math.random()*6}s ease-in-out infinite alternate;
//         animation-delay:${Math.random()*6}s;
//       `;
//       heartsEl.appendChild(hh);
//     }
//   }

// })();

// ══════════════════════════════════════
//  CARRUSEL (PANEL 2)
// ══════════════════════════════════════
(function initCarousel() {
    const track   = document.getElementById("carouselTrack");
    const dotsEl  = document.getElementById("carouselDots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const indCurrent = document.getElementById("indCurrent");
    if (!track) return;

    const slides = Array.from(track.querySelectorAll(".slide"));
    const total  = slides.length;
    let currSlide  = 0;
    let autoplayTimer = null;

    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsEl.appendChild(dot);
    });

    function updateDots() {
        dotsEl.querySelectorAll(".dot").forEach((d, i) =>
            d.classList.toggle("active", i === currSlide));
        if (indCurrent) indCurrent.textContent = String(currSlide + 1).padStart(2, '0');
    }

    function goToSlide(index) {
        currSlide = (index + total) % total;
        track.style.transform = `translateX(-${currSlide * 100}%)`;
        updateDots();
    }

    function next() { goToSlide(currSlide + 1); }
    function prev() { goToSlide(currSlide - 1); }

    prevBtn?.addEventListener("click", () => { resetAutoplay(); prev(); });
    nextBtn?.addEventListener("click", () => { resetAutoplay(); next(); });

    function startAutoplay() { autoplayTimer = setInterval(next, 5500); }
    function resetAutoplay() { clearInterval(autoplayTimer); startAutoplay(); }
    startAutoplay();
})();

// ══════════════════════════════════════
//  FLOATING PHRASES & PARTICLES
// ══════════════════════════════════════
const phrasesContainer = document.getElementById('floating-phrases');
function spawnPhrase() {
  // Limitar en móviles para que no se trabe
  if (window.innerWidth <= 768 && document.querySelectorAll('.float-phrase').length >= 2) return;

  const text = floatingPhrases[Math.floor(Math.random() * floatingPhrases.length)];
  const el   = document.createElement('div');
  el.className = 'float-phrase';
  el.textContent = '✦ ' + text + ' ✦';
  const left     = 5 + Math.random() * 85;
  const duration = 18 + Math.random() * 20;
  el.style.left = left + 'vw';
  el.style.animationDuration = duration + 's';
  el.style.fontSize = (11 * (0.8 + Math.random() * 0.6)) + 'px';
  el.style.opacity = (0.12 + Math.random() * 0.18).toString();
  phrasesContainer.appendChild(el);
  setTimeout(() => el.remove(), (duration + 1) * 1000);
}
for (let i = 0; i < 3; i++) setTimeout(spawnPhrase, i * 1200);
setInterval(spawnPhrase, IS_MOBILE ? 15000 : 4000);

const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
let W, H, particles_arr = [];
function resizeCanvas() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resizeCanvas(); window.addEventListener('resize', resizeCanvas);

function createParticle() {
  return {
    x: Math.random() * W, y: Math.random() * H,
    r: 0.5 + Math.random() * 1.5,
    vx: (Math.random() - 0.5) * 0.3, vy: -0.1 - Math.random() * 0.3,
    alpha: 0.1 + Math.random() * 0.4,
    color: Math.random() > 0.5 ? '232,168,87' : '155,137,184',
    maxLife: 200 + Math.random() * 300, age: Math.random() * 300,
  };
}
// Reducir partículas en móvil significativamente
const numParticles = IS_MOBILE ? 10 : 50;
if (!PREFERS_REDUCED_MOTION) {
  for (let i = 0; i < numParticles; i++) particles_arr.push(createParticle());
}

// Throttle particles en móvil: solo 1 de cada 3 frames
let _particleFrame = 0;
function animParticles() {
  _particleFrame++;
  if (IS_MOBILE && _particleFrame % 3 !== 0) { requestAnimationFrame(animParticles); return; }
  ctx.clearRect(0, 0, W, H);
  particles_arr.forEach((p, i) => {
    p.age++; p.x += p.vx; p.y += p.vy;
    const fade = p.age < 30 ? p.age/30 : p.age > p.maxLife - 30 ? (p.maxLife - p.age)/30 : 1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha * fade})`; ctx.fill();
    if (p.age >= p.maxLife || p.y < -10 || p.x < -10 || p.x > W + 10) particles_arr[i] = createParticle();
  });
  requestAnimationFrame(animParticles);
}
if (!PREFERS_REDUCED_MOTION) animParticles();

// Hearts & Birds (Panel 6)
const heartsContainer = document.getElementById('hearts-container');
const heartEmojis = ['💙','🤍','✨','💫','🌊'];
setInterval(() => {
  if (window.innerWidth <= 768) return; // Optimización en móvil
  if (current === 5 || current === 6) {
    const el = document.createElement('div'); el.className = 'heart-anim';
    el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    el.style.left = (10 + Math.random() * 80) + '%'; el.style.bottom = (20 + Math.random() * 20) + '%';
    el.style.animationDuration = (5 + Math.random() * 4) + 's';
    el.style.fontSize = (10 + Math.random() * 10) + 'px';
    heartsContainer.appendChild(el);
    setTimeout(() => el.remove(), 12000);
  }
}, 1200);

// ── GALERÍA: botón "Ver más fotos" ──
const addMoreBtn = document.getElementById('addMoreBtn');
const galleryExtraEl = document.getElementById('galleryExtra');
if (addMoreBtn && galleryExtraEl) {
  addMoreBtn.addEventListener('click', () => {
    const visible = galleryExtraEl.classList.toggle('visible');
    addMoreBtn.textContent = visible ? '− Ver menos' : '+ Ver más fotos';
  });
}

// ══════════════════════════════════════
//  GALERÍA LIGHTBOX
// ══════════════════════════════════════

let galleryItems = [];
let lbCurrentIdx = 0;

window.openGalleryLightbox = function(el) {
    galleryItems = Array.from(document.querySelectorAll('.g-item img, .g-item-extra img'));
    const imgElement = el.querySelector('img');
    if (!imgElement) return;
    lbCurrentIdx = galleryItems.indexOf(imgElement);
    showLightboxAt(lbCurrentIdx);
};

function showLightboxAt(idx) {
    if (idx < 0 || idx >= galleryItems.length) return;
    const lb = document.getElementById('lightbox');
    const currentImg = galleryItems[idx];
    
    document.getElementById('lbImg').src = currentImg.src;
    document.getElementById('lbCaption').textContent = currentImg.alt || '';
    
    const descEl = document.getElementById('lbDesc');
    if (descEl) {
        descEl.textContent = currentImg.getAttribute('data-desc') || '';
    }

    lb.classList.add('open');
    document.body.classList.add('lightbox-open');
    setLightboxOpen(true);
}

window.closeLightbox = function() {
    const lb = document.getElementById('lightbox');
    lb.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    setLightboxOpen(false);
};

window.lbNav = function(dir) {
    let next = lbCurrentIdx + dir;
    if (next < 0) next = galleryItems.length - 1;
    if (next >= galleryItems.length) next = 0;
    lbCurrentIdx = next;
    showLightboxAt(next);
};

// CERRAR CON CLICK EN FONDO
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
});

// TECLAS
document.addEventListener('keydown', (e) => {
    if (!lightboxOpen) return;
    e.stopPropagation();
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') { e.preventDefault(); lbNav(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); lbNav(-1); }
});

progress.style.width = '0%';

// ══════════════════════════════════════
//  REPRODUCTOR DE MÚSICA (PANEL 6)
// ══════════════════════════════════════
const audio = document.getElementById('myAudio');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const playerVinyl = document.querySelector('.player-vinyl');

window.togglePlay = function() {
    if (!audio) return;
    
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸'; 
        playerVinyl.classList.add('playing'); 
    } else {
        audio.pause();
        playBtn.textContent = '▶'; 
        playerVinyl.classList.remove('playing'); 
    }
};

window.skipAudio = function(seconds) {
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, audio.duration));
};

if (audio) {
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }
    });
    
    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶'; 
        playerVinyl.classList.remove('playing');
        progressBar.style.width = '0%';
    });
}

window.setProgress = function(e) {
    if (!audio) return;
    const container = document.getElementById('progressContainer');
    const width = container.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    if (duration) {
        audio.currentTime = (clickX / width) * duration;
    }
};

// ══════════════════════════════════════════════════════════
//  LÍNEA DEL TIEMPO (PANEL 4 ACORDEÓN)
// ══════════════════════════════════════════════════════════
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
            ? `<img src="img/${m.photo}" alt="${m.title}"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
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
                    card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }, 300);
            }
        });
    });

/* ══════════════════════════════════════
   LIBRO DE RECUERDOS — initBook()
══════════════════════════════════════ */
(function initBook() {

  const pagesContainer = document.getElementById('bookPages');
  if (!pagesContainer) return;

  const pages = [
    {
      front: { src: 'novia1.jpeg', msg: '"Con mi princesita hermosa, la más bonita de todas"', sub: 'MI AMOR ETERNO ❤️' },
      back:  { src: 'novia2.jpeg', msg: '"Esa sonrisa me alegra todos los días, amor"',        sub: 'ENCANTADO CONTIGO ❤️' },
    },
    {
      front: { src: 'hy.jpeg',     msg: '"A tu lado soy el hombre más feliz del mundo"',       sub: 'SIEMPRE CONTIGO ❤️' },
      back:  { src: 'hy2.jpeg',    msg: '"Tus caricias son mi lugar favorito en este mundo"',  sub: 'MI LUGAR SEGURO ❤️' },
    },
    {
      front: { src: 'cita.jpeg',   msg: '"Cada salida contigo es una aventura que amo con todo mi corazón"',   sub: 'JUNTITOS SIEMPRE ❤️' },
      back:  { src: '7.jpeg',      msg: '"Eres la razón más bonita de todos mis días"',        sub: 'CADA MOMENTO CONTIGO ❤️' },
    },
    {
      front: { src: 'rebe4.jpeg',  msg: '"Esos ojitos me matan solo con verlos, amor"',        sub: 'ME ENAMORAN CADA DÍA ❤️' },
      back:  { src: 'rebe5.jpeg',  msg: '"Te quiero para toda la vida, mi psicologa preciosa"', sub: 'PARA SIEMPRE ❤️' },
    },
    {
      front: { src: 'j2.jpeg',     msg: '"Verte sonreír es el regalo más grande que me das"', sub: 'MI TODO ❤️' },
      back:  { src: 'j5.jpeg',     msg: '"Siempre serás mi lugar seguro, mi princesita"',     sub: 'CON TODO MI AMOR ❤️' },
    },
    { special: 'song' },
  ];

  const TOTAL = pages.length;
  let currentPage = 0; 

  pages.forEach((data, i) => {
    const page = document.createElement('div');
    page.className = 'book-page';
    page.style.zIndex = TOTAL - i;

    if (data.special === 'song') {
      page.innerHTML = `
        <div class="book-page-front book-page-song-front">
          <div class="page-content page-content-song">
            <div class="page-song-eyebrow">✦ dedicada para ti ✦</div>
            <div class="page-song-title">Una persona tan especial para mi se merece algo asi de especial</div>
            <div class="page-song-artist">— tu canción, mi amor ❤️</div>
            <div class="page-song-vinyl" id="bookVinyl">
              <div class="page-song-vinyl-hole"></div>
            </div>
            <audio id="bookAudio" src="perfect.mp3" preload="none"></audio>
            <div class="page-song-controls">
              <button class="page-song-skip" onclick="bookSkip(-10)" title="⏪ 10s">⏪</button>
              <button class="page-song-play" id="bookPlayBtn" onclick="bookTogglePlay()">▶</button>
              <button class="page-song-skip" onclick="bookSkip(10)" title="⏩ 10s">⏩</button>
            </div>
            <div class="page-song-progress-wrap" id="bookProgressWrap" onclick="bookSetProgress(event)">
              <div class="page-song-progress-bar" id="bookProgressBar"></div>
            </div>
            <div class="page-song-time" id="bookTimeDisplay">0:00 / 0:00</div>
            <div class="page-photo-wrap page-photo-song">
              <img src="rebe5.jpeg" alt="Mi amor ❤️" onerror="this.style.opacity='0'">
            </div>
            <div class="page-ornament">❤</div>
          </div>
        </div>
        <div class="book-page-back">
          <div class="page-content">
            <div class="page-number">${String(i*2+2).padStart(2,'0')}</div>
            <div class="page-message" style="margin-top:auto">
              <div class="page-msg-main">"Cada nota de esta canción te la dedico a ti, mi preciosa"</div>
              <div class="page-msg-sub">SIEMPRE EN MI CORAZÓN ❤️</div>
            </div>
            <div class="page-ornament">❤</div>
          </div>
        </div>
      `;
      pagesContainer.appendChild(page);

      const bookAudio  = page.querySelector('#bookAudio');
      const bookPlayBtn = page.querySelector('#bookPlayBtn');
      const bookProgressBar = page.querySelector('#bookProgressBar');
      const bookVinyl  = page.querySelector('#bookVinyl');
      const bookTimeDisplay = page.querySelector('#bookTimeDisplay');

      function fmtTime(s) {
        if (!s || isNaN(s)) return '0:00';
        const m = Math.floor(s/60);
        const sec = Math.floor(s%60);
        return m + ':' + String(sec).padStart(2,'0');
      }

      window.bookTogglePlay = function() {
        if (!bookAudio) return;
        if (bookAudio.paused) {
          bookAudio.play();
          bookPlayBtn.textContent = '⏸';
          bookVinyl.classList.add('book-vinyl-spin');
        } else {
          bookAudio.pause();
          bookPlayBtn.textContent = '▶';
          bookVinyl.classList.remove('book-vinyl-spin');
        }
      };

      window.bookSkip = function(sec) {
        if (!bookAudio) return;
        bookAudio.currentTime = Math.max(0, Math.min(bookAudio.currentTime + sec, bookAudio.duration || 0));
      };

      window.bookSetProgress = function(e) {
        if (!bookAudio || !bookAudio.duration) return;
        const wrap = page.querySelector('#bookProgressWrap');
        bookAudio.currentTime = (e.offsetX / wrap.clientWidth) * bookAudio.duration;
      };

      bookAudio.addEventListener('timeupdate', () => {
        if (bookAudio.duration) {
          bookProgressBar.style.width = (bookAudio.currentTime / bookAudio.duration * 100) + '%';
          bookTimeDisplay.textContent = fmtTime(bookAudio.currentTime) + ' / ' + fmtTime(bookAudio.duration);
        }
      });

      bookAudio.addEventListener('ended', () => {
        bookPlayBtn.textContent = '▶';
        bookVinyl.classList.remove('book-vinyl-spin');
        bookProgressBar.style.width = '0%';
      });

      return; 
    }

    page.innerHTML = `
      <div class="book-page-front">
        <div class="page-content">
          <div class="page-photo-wrap">
            <img src="${data.front.src}" alt="" onerror="this.style.opacity='0'">
          </div>
          <div class="page-number">${String(i*2+1).padStart(2,'0')}</div>
          <div class="page-message">
            <div class="page-msg-main">${data.front.msg}</div>
            <div class="page-msg-sub">${data.front.sub}</div>
          </div>
          <div class="page-ornament">❤</div>
        </div>
      </div>
      <div class="book-page-back">
        <div class="page-content">
          <div class="page-photo-wrap">
            <img src="${data.back.src}" alt="" onerror="this.style.opacity='0'">
          </div>
          <div class="page-number">${String(i*2+2).padStart(2,'0')}</div>
          <div class="page-message">
            <div class="page-msg-main">${data.back.msg}</div>
            <div class="page-msg-sub">${data.back.sub}</div>
          </div>
          <div class="page-ornament">❤</div>
        </div>
      </div>
    `;

    pagesContainer.appendChild(page);
  });

  const pageEls = Array.from(pagesContainer.querySelectorAll('.book-page'));
  const prevBtn = document.getElementById('bookPrev');
  const nextBtn = document.getElementById('bookNext');
  const bookCurrentEl = document.getElementById('bookCurrent');
  const bookTotalEl   = document.getElementById('bookTotal');

  if (bookTotalEl) bookTotalEl.textContent = TOTAL;

  function updateUI() {
    if (bookCurrentEl) bookCurrentEl.textContent = currentPage + 1;
    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage === TOTAL;
  }

  function flipNext() {
    if (currentPage >= TOTAL) return;
    const page = pageEls[currentPage];
    page.style.zIndex = TOTAL + currentPage;
    page.classList.add('flipped');
    currentPage++;
    updateUI();
  }

  function flipPrev() {
    if (currentPage <= 0) return;
    currentPage--;
    const page = pageEls[currentPage];
    page.style.zIndex = TOTAL - currentPage;
    page.classList.remove('flipped');
    updateUI();
  }

  if (nextBtn) nextBtn.addEventListener('click', flipNext);
  if (prevBtn) prevBtn.addEventListener('click', flipPrev);

  pageEls.forEach(p => p.addEventListener('click', flipNext));

  const dustContainer = document.getElementById('bookDust');
  if (dustContainer) {
    const heartCount = IS_MOBILE ? 8 : 18;
  for (let i = 0; i < heartCount; i++) {
      const d = document.createElement('div');
      d.className = 'book-dust-particle';
      const size = 1.5 + Math.random() * 3;
      d.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        bottom:${-size}px;
        animation-duration:${8 + Math.random()*10}s;
        animation-delay:${Math.random()*8}s;
        opacity:${0.2 + Math.random()*0.5};
      `;
      dustContainer.appendChild(d);
    }
  }

  updateUI();

})();

/* ══════════════════════════════════════
   CORAZÓN DE FOTOS
══════════════════════════════════════ */

(function initHeartCanvas() {

  const HEART_PHOTOS = [
    'novia1.jpeg','novia2.jpeg','bebe.jpeg','lb.jpeg',
    'hy.jpeg','hy2.jpeg','cita.jpeg','7.jpeg',
    'rebe4.jpeg','j2.jpeg','j5.jpeg','ojazos.jpeg',
    'rebe5.jpeg',
  ];

  const canvas = document.getElementById('heartCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const SIZE = Math.min(window.innerWidth * 0.92, 660);
  canvas.width  = SIZE;
  canvas.height = SIZE * 0.96;
  const W = canvas.width;
  const H = canvas.height;

  function heartPoint(t) {
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t));
    const pad = W * 0.04;
    return {
      x: pad + ((hx + 16) / 32) * (W - 2*pad),
      y: pad + ((hy + 17) / 34) * (H - 2*pad),
    };
  }

  function buildPath() {
    ctx.beginPath();
    for (let i = 0; i <= 400; i++) {
      const t = (i / 400) * Math.PI * 2;
      const p = heartPoint(t);
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
  }

  function insideHeart(px, py) {
    const pad = W * 0.04;
    const nx =  ((px - pad) / (W - 2*pad) * 2 - 1) * 1.2;
    const ny = -((py - pad) / (H - 2*pad) * 2 - 1) * 1.15 - 0.1;
    const val = Math.pow(nx*nx + ny*ny - 1, 3) - nx*nx * ny*ny*ny;
    return val <= 0.01;
  }

  const COLS = 5;
  const ROWS = 6;
  const cellW = W / COLS;
  const cellH = H / ROWS;

  const cells = []; 
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cx = (c + 0.5) * cellW;
      const cy = (r + 0.5) * cellH;
      cells.push({ col: c, row: r, cx, cy, inside: insideHeart(cx, cy) });
    }
  }
  const insideCells = cells.filter(c => c.inside);

  const loadedImgs = new Array(HEART_PHOTOS.length).fill(null);
  let loaded = 0;

  function tryDraw() {
    loaded++;
    if (loaded >= HEART_PHOTOS.length) draw();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    buildPath();
    ctx.save();
    ctx.clip();

    ctx.fillStyle = '#20082a';
    ctx.fillRect(0, 0, W, H);

    const gap = 2;
    insideCells.forEach((cell, idx) => {
      const img = loadedImgs[idx % loadedImgs.length];
      if (!img) return;

      const x = cell.col * cellW;
      const y = cell.row * cellH;

      const dw = cellW - gap * 2;
      const dh = cellH - gap * 2;
      const iw = img.width  || img.naturalWidth  || 80;
      const ih = img.height || img.naturalHeight || 80;
      const scale = Math.max(dw / iw, dh / ih);
      const sw = dw / scale;
      const sh = dh / scale;
      const sx = (iw - sw) / 2;
      const sy = (ih - sh) / 2;

      ctx.drawImage(img, sx, sy, sw, sh, x + gap, y + gap, dw, dh);
    });

    const vg = ctx.createRadialGradient(W/2, H*0.42, W*0.05, W/2, H*0.45, W*0.62);
    vg.addColorStop(0,    'rgba(32,8,42,0)');
    vg.addColorStop(0.65, 'rgba(32,8,42,0.08)');
    vg.addColorStop(1,    'rgba(32,8,42,0.50)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    ctx.restore();

    for (let pass = 0; pass < 2; pass++) {
      buildPath();
      ctx.strokeStyle = pass === 0
        ? 'rgba(212,105,122,0.25)'
        : 'rgba(212,105,122,0.80)';
      ctx.lineWidth   = pass === 0 ? 8 : 2;
      ctx.shadowColor = 'rgba(212,105,122,0.6)';
      ctx.shadowBlur  = pass === 0 ? 20 : 10;
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    const glowPoints = [0, 0.25, 0.5, 0.75].map(f => heartPoint(f * Math.PI * 2));
    glowPoints.push({ x: W/2, y: H*0.03 }); 
    glowPoints.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      sparkle(ctx, 9, 'rgba(232,180,90,0.9)');
      ctx.restore();
    });
  }

  function sparkle(ctx, r, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.4;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    [-1,1].forEach(flip => {
      for (let a = 0; a < 4; a++) {
        const ang = (a * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang)*r*0.25*flip, Math.sin(ang)*r*0.25);
        ctx.lineTo(Math.cos(ang)*r*flip, Math.sin(ang)*r);
        ctx.stroke();
      }
    });
    ctx.shadowBlur = 0;
  }

  const COLORS = ['#d4697a','#9b89b8','#5c2795','#c8723a','#411480','#a06070'];
  HEART_PHOTOS.forEach((src, i) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => { loadedImgs[i] = img; tryDraw(); };
    img.onerror = () => {
      const fb = document.createElement('canvas');
      fb.width = fb.height = 120;
      const fc = fb.getContext('2d');
      fc.fillStyle = COLORS[i % COLORS.length];
      fc.fillRect(0, 0, 120, 120);
      fc.font = '36px serif';
      fc.textAlign = 'center';
      fc.textBaseline = 'middle';
      fc.fillText('❤️', 60, 60);
      loadedImgs[i] = fb;
      tryDraw();
    };
    img.src = src;
  });

})();

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

// ══════════════════════════════════════
//  SECCIÓN CARTA DE AMOR
// ══════════════════════════════════════
(function initCarta() {

  const starsEl = document.getElementById('cartaStars');
  if (starsEl) {
    const cartaStarCount = IS_MOBILE ? 0 : 40;
    for (let i = 0; i < cartaStarCount; i++) {
      const s = document.createElement('div');
      s.style.cssText = `
        position:absolute;
        width:${1 + Math.random() * 2}px;
        height:${1 + Math.random() * 2}px;
        background:rgba(255,255,255,${0.3 + Math.random() * 0.6});
        border-radius:50%;
        top:${Math.random() * 100}%;
        left:${Math.random() * 100}%;
        animation:twinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate;
        animation-delay:${Math.random() * 3}s;
      `;
      starsEl.appendChild(s);
    }
  }

  const petalsEl = document.getElementById('cartaPetals');
  if (petalsEl) {
    const emojis = ['🌸', '🌹', '✨', '💛', '🌺', '💕'];
    const petalCount = IS_MOBILE ? 0 : 10;
    for (let i = 0; i < petalCount; i++) {
      const p = document.createElement('span');
      p.className = 'carta-petal';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left = (Math.random() * 100) + '%';
      p.style.fontSize = (0.7 + Math.random() * 0.8) + 'rem';
      p.style.animationDuration = (8 + Math.random() * 8) + 's';
      p.style.animationDelay = (Math.random() * 6) + 's';
      petalsEl.appendChild(p);
    }
  }

})();

function abrirCarta() {
  const flap   = document.getElementById('sobreFlap');
  const papel  = document.getElementById('cartaPapel');
  const btn    = document.getElementById('cartaAbrirBtn');
  const sobre  = document.getElementById('cartaSobre');

  if (!flap || !papel) return;

  flap.classList.add('abierto');

  if (btn) btn.classList.add('oculto');

  setTimeout(() => {
    if (sobre) sobre.style.transform = 'translateY(-20px) scale(0.92)';
    if (sobre) sobre.style.opacity = '0.6';
    papel.classList.add('abierta');
  }, 500);
}
/* ══════════════════════════════════════
   CONSTELACIONES
══════════════════════════════════════ */
(function() {
  const momentos = [
 {
      id: 1,
      title: "Nuestra primera foto juntitossss ❤️",
      date: "", 
      msg: "No olvidaré esos besitos mi  rebe💛",
      emoji: "✨",
      img: "primera.jpeg",
      x: 22, y: 28
    },
    {
      id: 2,
      title: "La primera vez que visite a mis suegros, esta muertoooo de nervios jijiji",
      date: "",
      msg: "Pero fui feliz viendo a mis suegros y conocerlos me encantoooo",
      emoji: "🌊",
      img: "sr.jpeg",
      x: 42, y: 18
    },
    {
      id: 3,
      title: "La vez que te pedi que fueras mi novia y fui dichoso de ser el primer en pedirtelo en persona ❤️",
      date: "17/05/2026",
      msg: "Ese momento donde todo cambió para siempre ❤️",
      emoji: "💌",
      img: "pr1.jpeg",
      x: 65, y: 24
    },
    {
      id: 4,
      title: "Un día a tu lado  y poder tomarme una foto y tu con esa sonrisotaaaaa",
      date: "",
      msg: "Verte sonreir siempre será mi regalo más bonito🌸",
      emoji: "🎇",
      img: "cita.jpeg",
      x: 80, y: 42
    },
    {
      id: 5,
      title: "Algo más bonito aun, fue verte cumplir su sueño con su  bata mi amor, ver esa felicidad en su rostro me encantó",
      date: "",
      msg: "Orgulloso de mi gran mujer que tengo en mi corazón💫",
      emoji: "🌙",
      img: "sueño.jpeg",
      x: 72, y: 62
    },
    {
      id: 6,
      title: "Una cita más juntos comiendo al lado del amor de mi vida 🌸",
      date: "",
      msg: "No importa el lugar , si estás a mi lado yo ya gane en esta vida ",
      emoji: "🌈",
      img: "nv4.jpeg",
      x: 50, y: 72
    },
    {
      id: 7,
      title: "Poder verte usando las cosas que te regalo me alegran el corazón grandemente ❤️",
      date: "",
      msg: "Y siempre que pueda seguiré regalandóle cosas a mi niña consentida 💛",
      emoji: "🕊️",
      img: "j2.jpeg",
      x: 28, y: 65
    },
    {
      id: 8,
      title: "Nuestro futuro, como siempre mi amor JUNTITOS , felices asi la quiero ver siempre ❤️",
      date: "Pronto...",
      msg: "Todo lo que viene por delante, juntos, paso a paso, tu y yo 🌟",
      emoji: "🌟",
      img: "fr.jpeg",
      x: 14, y: 48
    }
  ];

  // Líneas entre estrellas (conexiones)
  const conexiones = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[1,4],[2,6]
  ];

  const wrap      = document.getElementById('constStarsWrap');
  const canvas    = document.getElementById('constCanvas');
  const modal     = document.getElementById('constModal');
  const modalCard = document.getElementById('constModalCard');
  const modalClose= document.getElementById('constModalClose');
  const modalIcon = document.getElementById('constModalIcon');
  const modalTitle= document.getElementById('constModalTitle');
  const modalDate = document.getElementById('constModalDate');
  const modalMsg  = document.getElementById('constModalMsg');
  const modalImg  = document.getElementById('constModalImg');
  const imgPlaceholder = document.getElementById('constImgPlaceholder');
  const imgEmoji  = document.getElementById('constImgEmoji');
  const sparklesEl= document.getElementById('constModalSparkles');
  const foundEl   = document.getElementById('constFound');
  const totalEl   = document.getElementById('constTotal');
  const hintEl    = document.getElementById('constHint');

  if (!wrap || !canvas) return;

  const section = document.getElementById('p-constelaciones');
  let revealed = new Set();
  let starEls = [];

  // Render stars
  momentos.forEach((m, i) => {
    const star = document.createElement('div');
    star.className = 'const-star';
    star.style.left = m.x + '%';
    star.style.top  = m.y + '%';
    star.dataset.idx = i;

    const dot = document.createElement('div');
    dot.className = 'const-star-dot';
    // stagger twinkle
    dot.style.animationDelay = (i * 0.3) + 's';

    const ring = document.createElement('div');
    ring.className = 'const-star-ring';
    ring.style.animationDelay = (i * 0.4) + 's';

    const label = document.createElement('div');
    label.className = 'const-star-label';
    label.textContent = m.emoji;

    star.appendChild(ring);
    star.appendChild(dot);
    star.appendChild(label);
    wrap.appendChild(star);
    starEls.push(star);

    star.addEventListener('click', () => openMomento(i, star));
    star.addEventListener('mouseenter', () => drawLines(true));
    star.addEventListener('mouseleave', () => drawLines(false));
  });

  totalEl.textContent = momentos.length;
  foundEl.textContent = 0;

  // Draw connection lines on canvas
  function drawLines(highlight) {
    const rect = section.getBoundingClientRect();
    canvas.width  = rect.width  || window.innerWidth;
    canvas.height = rect.height || window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    conexiones.forEach(([a, b]) => {
      const ma = momentos[a], mb = momentos[b];
      const x1 = (ma.x / 100) * canvas.width;
      const y1 = (ma.y / 100) * canvas.height;
      const x2 = (mb.x / 100) * canvas.width;
      const y2 = (mb.y / 100) * canvas.height;

      const bothRevealed = revealed.has(a) && revealed.has(b);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = bothRevealed
        ? 'rgba(232,195,122,0.35)'
        : highlight
          ? 'rgba(245,237,224,0.12)'
          : 'rgba(245,237,224,0.07)';
      ctx.lineWidth = bothRevealed ? 1.2 : 0.8;
      ctx.stroke();
    });
  }

  // Burst animation
  function spawnBurst(el) {
    const burst = document.createElement('div');
    burst.className = 'const-burst';
    const r = el.getBoundingClientRect();
    const sr = section.getBoundingClientRect();
    burst.style.left = (r.left - sr.left + r.width/2) + 'px';
    burst.style.top  = (r.top  - sr.top  + r.height/2) + 'px';
    section.appendChild(burst);
    setTimeout(() => burst.remove(), 700);
  }

  // Open modal
  function openMomento(idx, el) {
    const m = momentos[idx];
    spawnBurst(el);

    // Mark revealed
    if (!revealed.has(idx)) {
      revealed.add(idx);
      el.classList.add('revealed');
      foundEl.textContent = revealed.size;
      drawLines(false);
      if (revealed.size === 1) hintEl.classList.add('hidden');
    }

    // Fill modal
    modalIcon.textContent = m.emoji;
    modalTitle.textContent = m.title;
    modalDate.textContent  = m.date;
    modalMsg.textContent   = m.msg;

    if (m.img) {
      modalImg.src = m.img;
      modalImg.style.display = 'block';
      imgPlaceholder.style.display = 'none';
    } else {
      modalImg.style.display = 'none';
      imgPlaceholder.style.display = 'flex';
      imgEmoji.textContent = m.emoji;
    }

    // Sparkles
    sparklesEl.innerHTML = '';
    [0,1,2].forEach(i => {
      const sp = document.createElement('div');
      sp.className = 'const-sparkle';
      sparklesEl.appendChild(sp);
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // Draw lines when section comes into view
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(() => drawLines(false), 200);
    }
  }, { threshold: 0.1 });
  if (section) observer.observe(section);

  window.addEventListener('resize', () => drawLines(false));

  // Also draw when navigated to
  drawLines(false);
})();/* ═══════════════════════════════════════════════════════════
   AMOR EXTRAS — Script de animaciones especiales para Rebeca
   Agrega este archivo ANTES de </body> en el HTML
   (después de script.js)
═══════════════════════════════════════════════════════════ */

(function() {
'use strict';

// ══════════════════════════════════════════════════════════════
//  FRASES FLOTANTES MEJORADAS (más variedad, más poesía, psicología)
// ══════════════════════════════════════════════════════════════

const FRASES_PLAYA = [
  "el mar siempre me recuerda a ti",
  "como las olas, mi amor por ti no para",
  "eres mi horizonte",
  "quiero ver atardeceres contigo siempre",
  "tu nombre suena como el mar",
  "cada ola trae un pensamiento tuyo",
  "el cielo a la hora del atardecer tiene tus colores",
  "quiero caminar contigo en la arena",
  "eres más bonita que cualquier puesta de sol",
  "el mar sabe que te quiero",
];

const FRASES_PSICO = [
  "el amor seguro es el que construimos juntos",
  "eres mi teoría del apego favorita",
  "contigo activo mi sistema de calma",
  "la psicología del amor te tiene nombre: Rebeca",
  "regulación emocional: tenerte cerca",
  "vinculación afectiva: lo nuestro",
  "eres mi zona de confort más bonita",
  "la neurociencia del amor habla de ti",
  "oxitocina al máximo cuando estás cerca",
  "mi hemisferio derecho siempre piensa en ti",
];

const FRASES_AMOR = [
  "eres mi razón más bonita",
  "para siempre no me alcanza para amarte",
  "gracias por existir en mi vida",
  "eres todo lo que pedí sin saber pedir",
  "te elegiría en cualquier universo",
  "mi corazón ya tiene dueña",
  "eres mi respuesta favorita",
  "contigo ya gané en la vida",
  "amor, eres increíble",
  "cada día me enamoro más de ti",
];

const TODAS_LAS_FRASES = [...FRASES_PLAYA, ...FRASES_PSICO, ...FRASES_AMOR];

// Reemplaza el sistema de frases flotantes existente con versión mejorada
const phrasesContainer = document.getElementById('floating-phrases');

function spawnFraseEspecial() {
  if (!phrasesContainer) return;
  // Optimización móvil
  if (window.innerWidth <= 768 && document.querySelectorAll('.float-phrase').length >= 2) return;

  const texto = TODAS_LAS_FRASES[Math.floor(Math.random() * TODAS_LAS_FRASES.length)];
  const el = document.createElement('div');

  // Categoría aleatoria para estilos diferentes
  const tipo = Math.random();
  let claseExtra = '';
  if (tipo < 0.2)       claseExtra = 'phrase-big';
  else if (tipo < 0.4)  claseExtra = 'phrase-small';
  else if (tipo < 0.6)  claseExtra = 'phrase-sea';

  el.className = 'float-phrase ' + claseExtra;

  // Prefijos decorativos variados
  const prefijos = ['✦', '🌊', '❤️', '✿', '⋆', '🌅', '💛', ''];
  const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
  el.textContent = prefijo ? prefijo + ' ' + texto + ' ' + prefijo : texto;

  const dur = 18 + Math.random() * 14;
  el.style.setProperty('--dur', dur + 's');
  el.style.left = (3 + Math.random() * 88) + 'vw';
  el.style.bottom = '-60px';
  el.style.animationDuration = dur + 's';

  phrasesContainer.appendChild(el);
  setTimeout(() => el.remove(), (dur + 2) * 1000);
}

// Iniciar con algunas frases — muy pocas en móvil
const initPhraseCount = IS_MOBILE ? 1 : 6;
for (let i = 0; i < initPhraseCount; i++) {
  setTimeout(spawnFraseEspecial, i * 1500);
}
// Seguir spawneando (mucho menos frecuente en móvil)
setInterval(spawnFraseEspecial, IS_MOBILE ? 12000 : 2500);


// ══════════════════════════════════════════════════════════════
//  FRASES DE PSICOLOGÍA EN LA PANTALLA (más sutiles, arriba)
// ══════════════════════════════════════════════════════════════
function spawnPsicoFrase() {
  if (window.innerWidth <= 768) return; // Optimización móvil

  const el = document.createElement('div');
  el.className = 'psico-phrase';
  const frase = FRASES_PSICO[Math.floor(Math.random() * FRASES_PSICO.length)];
  el.textContent = '— ' + frase + ' —';
  const dur = 20 + Math.random() * 15;
  el.style.setProperty('--pdur', dur + 's');
  el.style.left = (5 + Math.random() * 70) + 'vw';
  el.style.bottom = '-40px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), (dur + 2) * 1000);
}
// Frases de psicología más lentas y sutiles
setTimeout(spawnPsicoFrase, 3000);
setInterval(spawnPsicoFrase, 8000);


// ══════════════════════════════════════════════════════════════
//  CORAZONES AL CLICK / TAP (cualquier lugar)
// ══════════════════════════════════════════════════════════════
const HEART_EMOJIS = ['❤️','💛','🌊','✨','💕','🌸','💫','🌹','💖','🫧'];

function spawnGlowHeart(x, y) {
  // En móvil solo 1 corazón por toque para no saturar el DOM
  const count = IS_MOBILE ? 1 : (2 + Math.floor(Math.random() * 2));
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'glow-heart';
      el.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
      const offsetX = (Math.random() - 0.5) * 30;
      el.style.left = (x + offsetX) + 'px';
      el.style.top  = y + 'px';
      el.style.fontSize = '1rem';
      el.style.zIndex = '9998';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    }, i * 100);
  }
}

document.addEventListener('click', (e) => {
  // No hacer en botones o elementos interactivos
  if (e.target.closest('button, a, input, select, .carousel-btn, .dot')) return;
  spawnGlowHeart(e.clientX, e.clientY);
});

// Para touch - con throttle para no dispararse en cada swipe
let _lastHeartTouch = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - _lastHeartTouch < 500) return; // máx 1 corazón cada 500ms en móvil
  _lastHeartTouch = now;
  const t = e.changedTouches[0];
  if (e.target.closest('button, a, input, select')) return;
  spawnGlowHeart(t.clientX, t.clientY);
}, { passive: true });


// ══════════════════════════════════════════════════════════════
//  PARTÍCULAS DE ATARDECER (destellos de luz flotando)
// ══════════════════════════════════════════════════════════════
const SUNSET_COLORS = [
  '#e8a857', '#d4697a', '#f5c97a', '#c8723a',
  '#9b89b8', '#5c2795', '#e8c37a', '#ffffff'
];

function createSunsetParticle() {
  if (window.innerWidth <= 768) return; // Optimización móvil

  const el = document.createElement('div');
  el.className = 'sunset-particle';
  const color = SUNSET_COLORS[Math.floor(Math.random() * SUNSET_COLORS.length)];
  el.style.background = color;
  el.style.boxShadow = `0 0 4px ${color}, 0 0 8px ${color}`;
  el.style.left = Math.random() * 100 + 'vw';
  el.style.top  = (60 + Math.random() * 40) + 'vh';
  const dur = 15 + Math.random() * 20;
  el.style.setProperty('--sdur', dur + 's');
  el.style.setProperty('--sdx',  (Math.random() - 0.5) * 60 + 'px');
  el.style.setProperty('--sdx2', (Math.random() - 0.5) * 40 + 'px');
  el.style.animationDelay = Math.random() * dur + 's';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), (dur * 2 + 5) * 1000);
}

for (let i = 0; i < 25; i++) createSunsetParticle();
setInterval(createSunsetParticle, 2000);


// ══════════════════════════════════════════════════════════════
//  ELEMENTOS DEL MAR FLOTANDO (conchas, estrellas de mar, olas)
// ══════════════════════════════════════════════════════════════
const SEA_EMOJIS = ['🐚', '⭐', '🫧', '🐠', '🌊', '🪸', '✨'];

function createSeaElement() {
  if (window.innerWidth <= 768) return; // Optimización móvil

  const el = document.createElement('div');
  el.className = 'sea-element';
  el.textContent = SEA_EMOJIS[Math.floor(Math.random() * SEA_EMOJIS.length)];
  const dur = 25 + Math.random() * 20;
  el.style.setProperty('--sdrift', dur + 's');
  el.style.setProperty('--sx',  (Math.random() - 0.5) * 100 + 'px');
  el.style.setProperty('--sy',  (-40 - Math.random() * 60) + 'px');
  el.style.setProperty('--sx2', (Math.random() - 0.5) * 80 + 'px');
  el.style.setProperty('--sy2', (Math.random() - 0.5) * 40 + 'px');
  el.style.left = Math.random() * 95 + 'vw';
  el.style.top  = (30 + Math.random() * 60) + 'vh';
  el.style.animationDelay = Math.random() * dur + 's';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), (dur * 3) * 1000);
}

for (let i = 0; i < 8; i++) setTimeout(createSeaElement, i * 1500);
setInterval(createSeaElement, 5000);


// ══════════════════════════════════════════════════════════════
//  AURORA / BANDAS DE LUZ EN FONDOS DE PANELES
// ══════════════════════════════════════════════════════════════
// Aurora solo en desktop — en móvil omitir para no saturar
if (!IS_MOBILE) {
  document.querySelectorAll('.panel').forEach(panel => {
    const aurora = document.createElement('div');
    aurora.className = 'aurora-bg';
    aurora.innerHTML = `
      <div class="aurora-band"></div>
      <div class="aurora-band"></div>
    `;
    aurora.querySelectorAll('.aurora-band').forEach((b, i) => {
      b.style.setProperty('--adur', (14 + i * 6) + 's');
    });
    panel.insertBefore(aurora, panel.firstChild);
  });
}


// ══════════════════════════════════════════════════════════════
//  PLUMAS CAYENDO (para el panel de la carta / psicología)
// ══════════════════════════════════════════════════════════════
const FEATHERS = ['🪶', '✦', '❦', '✿'];

function spawnFeather() {
  if (window.innerWidth <= 768) return; // Optimización móvil

  const panel = document.getElementById('p-carta');
  if (!panel) return;
  const el = document.createElement('div');
  el.className = 'falling-feather';
  el.textContent = FEATHERS[Math.floor(Math.random() * FEATHERS.length)];
  const dur = 10 + Math.random() * 10;
  el.style.setProperty('--ffdur', dur + 's');
  el.style.left = (Math.random() * 90) + 'vw';
  el.style.top  = '-30px';
  el.style.fontSize = (0.6 + Math.random() * 0.6) + 'rem';
  el.style.opacity = '0';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), (dur + 2) * 1000);
}

setTimeout(spawnFeather, 2000);
setInterval(spawnFeather, 3500);


// ══════════════════════════════════════════════════════════════
//  TOOLTIP ROMÁNTICO AL PASAR POR FOTOS
// ══════════════════════════════════════════════════════════════
const PHOTO_TOOLTIPS = [
  "cada foto tuya es mi favorita 💛",
  "esos ojos, esa sonrisa… huy 🥺",
  "te ves increíble amor ❤️",
  "mi psicóloga preciosa 🌊",
  "cada vez más hermosa ✨",
  "tu sonrisa me hace todo más bonito",
];

const tooltip = document.createElement('div');
tooltip.className = 'psico-tooltip';
document.body.appendChild(tooltip);

let tooltipTimeout;
document.querySelectorAll('.photo-frame img, .ws-photo, .p1-photo-frame img').forEach(img => {
  img.addEventListener('mouseenter', (e) => {
    clearTimeout(tooltipTimeout);
    tooltip.textContent = PHOTO_TOOLTIPS[Math.floor(Math.random() * PHOTO_TOOLTIPS.length)];
    tooltip.style.left = (e.clientX + 15) + 'px';
    tooltip.style.top  = (e.clientY - 40) + 'px';
    tooltip.classList.add('visible');
  });
  img.addEventListener('mousemove', (e) => {
    tooltip.style.left = (e.clientX + 15) + 'px';
    tooltip.style.top  = (e.clientY - 40) + 'px';
  });
  img.addEventListener('mouseleave', () => {
    tooltipTimeout = setTimeout(() => tooltip.classList.remove('visible'), 200);
  });
});


// ══════════════════════════════════════════════════════════════
//  TÍTULO DE PESTAÑA ANIMADO (le da vida al tab del navegador)
// ══════════════════════════════════════════════════════════════
const TAB_TITLES = [
  '❤️ Para mi Rebe...',
  '🌊 Te quiero mucho...',
  '💛 Mi preciosa...',
  '✨ Mi psicóloga favorita...',
  '🌅 Eres mi atardecer...',
  '❤️ Para mi Rebe...',
];
let tabIdx = 0;
setInterval(() => {
  document.title = TAB_TITLES[tabIdx % TAB_TITLES.length];
  tabIdx++;
}, 3000);


// ══════════════════════════════════════════════════════════════
//  EASTER EGG: LLUVIA DE CORAZONES AL INACTIVIDAD
// ══════════════════════════════════════════════════════════════
let inactivityTimer;

function resetInactivity() {
  if (IS_MOBILE) return; // En móvil no hay easter egg para evitar lag
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    // Lluvia de corazones después de 30s sin interacción (solo desktop)
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        spawnGlowHeart(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight * 0.5
        );
      }, i * 200);
    }
  }, 30000);
}

['mousemove', 'touchstart', 'keydown', 'scroll'].forEach(evt =>
  document.addEventListener(evt, resetInactivity, { passive: true })
);
resetInactivity();


// ══════════════════════════════════════════════════════════════
//  OLAS SVG ANIMADAS EN PANELES (agregar olas decorativas)
// ══════════════════════════════════════════════════════════════
function addWaveToPanel(panelId, colorTop, colorBot, opacity = 0.6) {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  const wrapExist = panel.querySelector('.wave-overlay');
  if (wrapExist) return;

  const wrap = document.createElement('div');
  wrap.className = 'wave-overlay';
  wrap.style.opacity = opacity;

  wrap.innerHTML = `
    <svg viewBox="0 0 2880 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 C1680,100 1920,20 2160,60 C2400,100 2640,30 2880,60 L2880,120 L0,120 Z" fill="${colorTop}"/>
    </svg>
    <svg viewBox="0 0 2880 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0,80 C360,40 720,120 1080,80 C1440,40 1800,120 2160,80 C2520,40 2720,90 2880,80 L2880,120 L0,120 Z" fill="${colorBot}"/>
    </svg>
  `;
  panel.appendChild(wrap);
}

// Agregar olas a diferentes paneles con colores temáticos
addWaveToPanel('p2',          'rgba(40,10,58,0.5)',  'rgba(40,10,58,0.8)',   0.7);
addWaveToPanel('p-heart',     'rgba(40,10,58,0.4)',  'rgba(10,8,18,0.7)',    0.5);
addWaveToPanel('p-constelaciones', 'rgba(40,10,58,0.3)', 'rgba(40,10,58,0.6)', 0.4);
addWaveToPanel('p4',          'rgba(40,10,58,0.4)',  'rgba(40,10,58,0.7)',   0.6);


// ══════════════════════════════════════════════════════════════
//  EFECTO PARALLAX SUAVE EN EL TEXTO DEL PANEL 1
// ══════════════════════════════════════════════════════════════
if (!IS_MOBILE) document.addEventListener('mousemove', (e) => {
  const p1 = document.getElementById('p1');
  if (!p1 || !p1.classList.contains('active')) return;

  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  const heroTitle = p1.querySelector('.hero-title');
  const photoFrame = p1.querySelector('.p1-photo-frame');

  if (heroTitle) {
    heroTitle.style.transform = `translate(${dx * -8}px, ${dy * -5}px)`;
  }
  if (photoFrame) {
    photoFrame.style.transform = `translate(${dx * 6}px, ${dy * 4}px) rotate(${dx * 0.5}deg)`;
  }
}, { passive: true }); // fin if !IS_MOBILE


// ══════════════════════════════════════════════════════════════
//  ESTRELLAS TWINKLE EXTRA (más estrellas en los paneles)
// ══════════════════════════════════════════════════════════════
function addExtraStars(panelEl, count = 15) {
  if (!panelEl) return;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.style.cssText = `
      position: absolute;
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
      background: rgba(255,255,255,${0.3 + Math.random() * 0.6});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 60}%;
      pointer-events: none;
      z-index: 0;
      animation: twinkleStar ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 4}s infinite;
      box-shadow: 0 0 ${2 + Math.random() * 4}px rgba(255,255,255,0.5);
    `;
    panelEl.insertBefore(star, panelEl.firstChild);
  }
}

// Agregar estrellas extra a paneles oscuros — reducidas en móvil
addExtraStars(document.getElementById('p1'), IS_MOBILE ? 0 : 15);
addExtraStars(document.getElementById('p-carta'), IS_MOBILE ? 0 : 10);
addExtraStars(document.getElementById('p-book'), IS_MOBILE ? 0 : 8);
addExtraStars(document.getElementById('p4'), IS_MOBILE ? 0 : 8);


// ══════════════════════════════════════════════════════════════
//  ANIMACIÓN ESPECIAL: "TE AMO" ESCRITO EN LUZ AL INICIO
// ══════════════════════════════════════════════════════════════
function showTeAmoIntro() {
  const ws = document.getElementById('welcome-screen');
  if (!ws) return;

  // Verificar si el welcome screen está visible
  const observer = new MutationObserver(() => {
    if (ws.style.display === 'none') {
      showFirstPanelParticles();
      observer.disconnect();
    }
  });
  observer.observe(ws, { attributes: true, attributeFilter: ['style', 'class'] });
}

function showFirstPanelParticles() {
  // Desactivado en móvil para evitar lag al entrar al sitio
  if (IS_MOBILE) return;
  const count = 15;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      spawnGlowHeart(
        Math.random() * window.innerWidth,
        0.3 * window.innerHeight + Math.random() * 0.4 * window.innerHeight
      );
    }, i * 150);
  }
}

showTeAmoIntro();


// ══════════════════════════════════════════════════════════════
//  RIPPLE EN BOTONES (efecto de onda al click)
// ══════════════════════════════════════════════════════════════
document.querySelectorAll('.ws-btn, .p6-btn, .carta-abrir-btn, .book-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(232,195,122,0.3);
      transform: scale(0);
      animation: rippleAnim 0.6s ease-out forwards;
      left: ${e.clientX - rect.left - 20}px;
      top:  ${e.clientY - rect.top  - 20}px;
      width: 40px;
      height: 40px;
      pointer-events: none;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// CSS del ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(6); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);


console.log(
  '%c❤️ Este sitio fue hecho con todo el amor del mundo para Rebeca ❤️',
  'color: #e8c37a; font-size: 14px; font-family: serif; font-style: italic;'
);

})();
// ══════════════════════════════════════════════════════════
//  CARRUSEL MUSICAL  #p-music-carousel
// ══════════════════════════════════════════════════════════
(function initMusicCarousel() {

  /* ── AUDIO ── */
  const mcAudio      = document.getElementById('mcAudio');
  const mcPlayBtn    = document.getElementById('mcPlayBtn');
  const mcPlayIcon   = document.getElementById('mcPlayIcon');
  const mcProgressBar  = document.getElementById('mcProgressBar');
  const mcProgressThumb = document.getElementById('mcProgressThumb');
  const mcProgressWrap  = document.getElementById('mcProgressWrap');
  const mcTimeCurrent  = document.getElementById('mcTimeCurrent');
  const mcTimeTotal    = document.getElementById('mcTimeTotal');
  const mcVinyl        = document.getElementById('mcVinyl');
  const mcEq           = document.getElementById('mcEq');

  /* ── CARRUSEL ── */
  const mcTrack   = document.getElementById('mcTrack');
  const mcDots    = document.getElementById('mcDots');
  const mcCurrent = document.getElementById('mcCurrent');
  const mcTotal   = document.getElementById('mcTotal');

  if (!mcAudio || !mcTrack) return;

  const slides = mcTrack.querySelectorAll('.mc-slide');
  const total  = slides.length;
  let   idx    = 0;
  let   autoTimer = null;

  /* ── generar dots ── */
  mcTotal.textContent = total;
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'mc-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    mcDots.appendChild(d);
  });

  function goTo(n) {
    idx = (n + total) % total;
    mcTrack.style.transform = `translateX(-${idx * 100}%)`;
    mcCurrent.textContent   = idx + 1;
    mcDots.querySelectorAll('.mc-dot').forEach((d, i) =>
      d.classList.toggle('active', i === idx)
    );
  }

  window.mcSlide = function(dir) { goTo(idx + dir); resetAuto(); };

  /* ── auto-avance cada 6s solo cuando suena música ── */
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(idx + 1), 6000);
  }
  function stopAuto()  { clearInterval(autoTimer); autoTimer = null; }
  function resetAuto() { if (!mcAudio.paused) startAuto(); }

  /* ── FORMATO TIEMPO ── */
  function fmtTime(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  }

  /* ── PLAY / PAUSE ── */
  window.mcTogglePlay = function() {
    if (!mcAudio) return;
    if (mcAudio.paused) {
      mcAudio.play().then(() => {
        mcPlayIcon.textContent = '⏸';
        mcVinyl.classList.add('spinning');
        mcEq.classList.remove('paused');
        document.querySelector('#p-music-carousel').classList.add('mc-playing');
        startAuto();
      }).catch(() => {});
    } else {
      mcAudio.pause();
      mcPlayIcon.textContent = '▶';
      mcVinyl.classList.remove('spinning');
      mcEq.classList.add('paused');
      document.querySelector('#p-music-carousel').classList.remove('mc-playing');
      stopAuto();
    }
  };

  window.mcSkip = function(s) {
    if (!mcAudio) return;
    mcAudio.currentTime = Math.max(0, Math.min(mcAudio.currentTime + s, mcAudio.duration || 0));
  };

  window.mcSetProgress = function(e) {
    if (!mcAudio || !mcAudio.duration) return;
    const rect = mcProgressWrap.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    mcAudio.currentTime = pct * mcAudio.duration;
  };

  /* ── ACTUALIZAR BARRA DE PROGRESO ── */
  mcAudio.addEventListener('timeupdate', () => {
    if (!mcAudio.duration) return;
    const pct = (mcAudio.currentTime / mcAudio.duration) * 100;
    mcProgressBar.style.width = pct + '%';
    mcProgressThumb.style.left = pct + '%';
    mcTimeCurrent.textContent = fmtTime(mcAudio.currentTime);
  });

  mcAudio.addEventListener('loadedmetadata', () => {
    mcTimeTotal.textContent = fmtTime(mcAudio.duration);
  });

  mcAudio.addEventListener('ended', () => {
    mcPlayIcon.textContent = '▶';
    mcVinyl.classList.remove('spinning');
    mcEq.classList.add('paused');
    document.querySelector('#p-music-carousel').classList.remove('mc-playing');
    mcProgressBar.style.width = '0%';
    mcProgressThumb.style.left = '0%';
    stopAuto();
  });

  /* ── CORAZONES FLOTANTES DE FONDO ── */
  const heartsContainer = document.getElementById('mcHeartsFloat');
  if (heartsContainer) {
    const emojis = ['❤️','💕','💖','🌹','💗','💝','✨','💞'];
    for (let i = 0; i < 18; i++) {
      const h = document.createElement('div');
      h.className = 'mc-heart-particle';
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.left  = Math.random() * 100 + '%';
      h.style.animationDelay    = (Math.random() * 8) + 's';
      h.style.animationDuration = (5 + Math.random() * 5) + 's';
      h.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
      heartsContainer.appendChild(h);
    }
  }

  /* ── NUESTROS SUEÑOS — confetti al entrar ── */
  (function initSuenos() {
    const panel = document.getElementById('p-suenos');
    const confettiWrap = document.getElementById('suenosConfetti');
    if (!panel || !confettiWrap) return;

    const colors = ['#f0c97a','#e8697c','#c4b5d8','#f5a882','#ffffff','#fdf0e3'];
    let spawned = false;

    function spawnConfetti() {
      if (spawned) return;
      spawned = true;
      for (let i = 0; i < 38; i++) {
        const p = document.createElement('div');
        p.className = 'sn-confetti-piece';
        p.style.left = Math.random() * 100 + '%';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = (4 + Math.random() * 6) + 'px';
        p.style.height = (8 + Math.random() * 10) + 'px';
        p.style.animationDelay = (Math.random() * 3) + 's';
        p.style.animationDuration = (4 + Math.random() * 5) + 's';
        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confettiWrap.appendChild(p);
        // remove after animation
        setTimeout(() => p.remove(), 9000);
      }
      setTimeout(() => { spawned = false; }, 10000);
    }

    // Observe when panel becomes active
    const observer = new MutationObserver(() => {
      if (panel.classList.contains('active')) spawnConfetti();
    });
    observer.observe(panel, { attributes: true, attributeFilter: ['class'] });

    // Card entrance animation
    const cards = panel.querySelectorAll('.sn-card');
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = e.target.style.transform || '';
        }
      });
    }, { threshold: 0.1 });
    cards.forEach((c, i) => {
      c.style.opacity = '0';
      c.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.35s cubic-bezier(.22,.68,0,1.4), box-shadow 0.3s ease`;
      cardObserver.observe(c);
    });
  })();

})();
// ============================================================
//  PANEL PROMESAS — typewriter + card animations
// ============================================================
(function initPromesas() {
  const panel = document.getElementById('p-promesas');
  if (!panel) return;

  // --- Typewriter ---
  const typeEl = document.getElementById('prTypeText');
  const phrases = [
    "Te quiero con todo mi corazón, mi psicóloga preciosa ❤️",
    "Eres lo mejor que me pasó en la vida...",
    "Nunca voy a cansarme de estar a tu lado...",
    "Eres mi lugar favorito en el mundo entero 🌊",
    "Te elegiría mil veces más, mi niña bonita ❤️",
  ];
  let phraseIdx = 0, charIdx = 0, typing = true, twTimer = null, twStarted = false;

  function typeStep() {
    if (!typeEl) return;
    if (typing) {
      if (charIdx < phrases[phraseIdx].length) {
        typeEl.textContent += phrases[phraseIdx][charIdx++];
        twTimer = setTimeout(typeStep, 55);
      } else {
        twTimer = setTimeout(() => { typing = false; typeStep(); }, 2200);
      }
    } else {
      if (charIdx > 0) {
        typeEl.textContent = phrases[phraseIdx].slice(0, --charIdx);
        twTimer = setTimeout(typeStep, 28);
      } else {
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typing = true;
        twTimer = setTimeout(typeStep, 400);
      }
    }
  }

  // --- Floating particles ---
  function spawnParticles() {
    const cont = document.getElementById('prParticles');
    if (!cont) return;
    const symbols = ['❤️','✦','💕','🌸','✿','♡'];
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('div');
      el.className = 'pr-particle';
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.cssText = `
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        animation-delay:${Math.random()*6}s;
        animation-duration:${5 + Math.random()*6}s;
        font-size:${0.7 + Math.random()*0.9}rem;
        opacity:${0.12 + Math.random()*0.18};
      `;
      cont.appendChild(el);
    }
  }

  // --- Card reveal on enter ---
  const cards = panel.querySelectorAll('.pr-card');
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const d = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('pr-card--visible'), d);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(c => cardObs.observe(c));

  // --- Start when panel becomes active ---
  const panelObs = new MutationObserver(() => {
    const isActive = panel.classList.contains('active');
    if (isActive && !twStarted) {
      twStarted = true;
      spawnParticles();
      typeStep();
    }
  });
  panelObs.observe(panel, { attributes: true, attributeFilter: ['class'] });
})();

// ============================================================
//  BOTON ALIENTO -- mensaje escondido para los dias dificiles
// ============================================================
(function initAliento() {
  const btn = document.getElementById('alientoBtn');
  const hint = document.getElementById('alientoHint');
  const modal = document.getElementById('alientoModal');
  const modalClose = document.getElementById('alientoModalClose');
  const modalMsg = document.getElementById('alientoModalMsg');
  if (!btn || !modal || !modalMsg) return;

  const MENSAJES_ALIENTO = [
    "Está bien sentirse mal o desanimado pero eso no cambia nada mi amor yo te querré igual ❤️.",
    "Aunque no esté ahí físicamente a tu lado mi corazon late por el mismo sentimiento hacia ti mi amor ❤️.",
    "Eres muchísimo más fuerte de lo que hoy crees eres una gran persona te admiro mucho mi niña ❤️",
    "No necesitas tener todo resuelto para que yo te admire ya lo hago me lo has demostrado con cada una de tus acciones lo valiosa que eres corazon ❤️.",
    "Mandame siempre mensaje de lo que te pase lo bueno y lo malo tu angelito siempre estará para ti ❤️",
    "De todos los días que nos quedan por vivir juntos no pienso irme a ningun lado estaré ahi siempre ❤️",
    "Estoy orgulloso de ti incluso en los días en que tú no lo estás de ti misma ❤️.",
    "Cierra los ojos un segundo e imagina que estamos juntitos felices y abrazadooooos ❤️",
    "No pasa nada si hoy solo alcanzas lo mínimo en algo amor, mañna sera otro dia y lo alcanzaremos juntos ❤️",
    "Vas a cuidar a tanta gente algún día mi licencidada en psicóloga preciosa pero hasta que eso llegue dejame cuidarte ami ❤️",
    "Te quiero siempre mi amor en momentos buenos y malos ❤️",
    "No estás sola en esto recuerda siempre mi amor ahora ESTAS CONMIGO ❤️",
  ];

  let lastIdx = -1;
  function mensajeAleatorio() {
    if (MENSAJES_ALIENTO.length === 1) return MENSAJES_ALIENTO[0];
    let idx;
    do { idx = Math.floor(Math.random() * MENSAJES_ALIENTO.length); } while (idx === lastIdx);
    lastIdx = idx;
    return MENSAJES_ALIENTO[idx];
  }

  function abrirAliento() {
    modalMsg.textContent = mensajeAleatorio();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (hint) hint.classList.remove('show');
  }

  function cerrarAliento() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', abrirAliento);
  if (modalClose) modalClose.addEventListener('click', cerrarAliento);
  modal.addEventListener('click', function (e) { if (e.target === modal) cerrarAliento(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) cerrarAliento();
  });

  // Pista de una sola vez, para que la descubra la primera vez que entra
  if (hint && !localStorage.getItem('alientoHintVisto')) {
    setTimeout(function () {
      hint.classList.add('show');
      setTimeout(function () { hint.classList.remove('show'); }, 5000);
      localStorage.setItem('alientoHintVisto', '1');
    }, 3500);
  }
})();