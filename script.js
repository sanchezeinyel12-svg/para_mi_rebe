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

const labels = ['Nosotros','Nuestro amor','Galería','Momentos','Razones','Para siempre'];

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
  current = n;

  track.style.transform = `translateX(-${current * 100}vw)`;
  dots.forEach((d,i) => d.classList.toggle('active', i === current));
  progress.style.width = `${(current / (panels.length - 1)) * 100}%`;
  scrollInfo.textContent = `0${current+1} / 0${panels.length}`;
  panelLabel.textContent = labels[current];
  arrowHint.style.opacity = current === panels.length - 1 ? '0' : '1';

  panels.forEach((p,i) => p.classList.toggle('active', i === current));

  // Cuando entramos al panel 4 (timeline), resetear su scroll
  if (n === 3) {
    const inner = document.getElementById('tlAxisWrap');
    if (inner) inner.scrollLeft = 0;
  }

  setTimeout(() => { isScrolling = false; }, 950);
}

panels[0].classList.add('active');

const SCROLL_PANEL_IDX = 3; // p4 = índice 3

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (lightboxOpen) return;

  // Si estamos en el panel con scroll interno
  if (current === SCROLL_PANEL_IDX) {
    const inner = document.getElementById('tlAxisWrap');
    if (inner) {
      const atLeft  = inner.scrollLeft <= 0;
      const atRight = inner.scrollLeft + inner.clientWidth >= inner.scrollWidth - 4;

      // Si no estamos en los límites, hacer scroll interno horizontal
      if (!(e.deltaY > 0 && atRight) && !(e.deltaY < 0 && atLeft)) {
        inner.scrollBy({ left: e.deltaY * 1.2, behavior: 'auto' });
        return;
      }
    }
  }

  // Scroll horizontal entre paneles (con acumulador anti-pegado)
  wheelAccum += e.deltaY;
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => { wheelAccum = 0; }, 300);

  if (wheelAccum > 60)       { wheelAccum = 0; goTo(current + 1); }
  else if (wheelAccum < -60) { wheelAccum = 0; goTo(current - 1); }
}, { passive: false });

let touchX = null;
let touchY = null;
window.addEventListener('touchstart', (e) => {
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  // Solo navegar horizontalmente si el swipe es más horizontal que vertical
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
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

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + 'px';
  ring.style.top  = ry - 18 + 'px';
  requestAnimationFrame(animRing);
})();

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
for (let i = 0; i < 6; i++) setTimeout(spawnPhrase, i * 600);
setInterval(spawnPhrase, 3500);

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
for (let i = 0; i < 60; i++) particles_arr.push(createParticle());

function animParticles() {
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
animParticles();

// Hearts & Birds (Panel 6)
const heartsContainer = document.getElementById('hearts-container');
const heartEmojis = ['💙','🤍','✨','💫','🌊'];
setInterval(() => {
  if (current === 5) {
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
//  GALERÍA LIGHTBOX (PANEL 3)
// ══════════════════════════════════════

let galleryItems = [];
let lbCurrentIdx = 0;

window.openGalleryLightbox = function(el) {
    galleryItems = Array.from(document.querySelectorAll('#p3 .g-item img, #p3 .g-item-extra img'));
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

// ══════════════════════════════════════
//  POLAROIDS (PANEL 5)
// ══════════════════════════════════════
(() => {
    const POLAROIDS = [
        { photo:"gato.jpeg",   emoji:"", caption:"la primera vez que nos encontramos 😂", note:"Ese día lo cambió todo ❤️" },
        { photo:"beso.jpeg",   emoji:"", caption:"nuestro primer besitooo 🥹",           note:"Me dejaste sin palabras" },
        { photo:"paisaje.jpeg",emoji:"", caption:"Huyy ese dia ese vestidoooo huuuuuy",   note:"No la miré mucho a los ojos ese dia huuuy" },
        { photo:"mano.jpg",    emoji:"", caption:"Amoooor esa cinturitaaaa 😤",           note:"Siempre quiero abrazarte así" },
        { photo:"comida.jpg",  emoji:"", caption:"nuestra cita juntitos comiendo felices 🥺",note:"Verte feliz no tiene precio ❤️" },
        { photo:"rebe4.jpeg",  emoji:"", caption:"Esos ojitos 🥺",                       note:"Me encanta ❤️" },
        { photo:"c3.jpeg",     emoji:"", caption:"Lo preciosa que estás 🥺 Tan feliz contigo ❤️", note:"WOW" },
        { photo:"c1.jpeg",     emoji:"", caption:"Esos besitos ufff",                     note:"Más fotitos así por favor 😅" },
        { photo:"c2.jpeg",     emoji:"", caption:"Nosotros juntitos como debe ser",      note:"Esa foto me encantó" },
        { photo:"c4.jpeg",     emoji:"", caption:"Qué me veas así me deja uff ❤️",      note:"Me enamora esa miradaaa ❤️" },
        { photo:"ayer2.jpeg",  emoji:"", caption:"A TU LADO SIEMPRE SERÉ FELIZ ❤️",      note:"Cada día es inolvidable" },
        { photo:"caderas.jpeg",emoji:"", caption:"ESA MANOOOO ❤️",                       note:"No puedo dejar de enamorarme cada vez que te veo ❤️" },
        { photo:"tesoro.jpeg", emoji:"", caption:" Otro recuerdo con el AMOR DE MI VIDA ❤️",note:"Cada foto la guardo con todo mi amor" },
        { photo:"pr2.jpeg",    emoji:"", caption:"NUNCA DEJES DE SONREÍR AMOR ❤️",      note:"Yo me encargaré de ese brillo tan bonito que tienes" },
    ];

    const section = document.getElementById("polaroidSection");
    if (!section) return;

    section.innerHTML = `
        <div class="polaroid-section-label">✦ Galería de recuerdos</div>
        <div class="polaroid-section-title">Nuestros momentos ❤️</div>
        <div class="polaroid-section-sub">Toca cada foto para verla mejor, mi amor</div>
        <div class="polaroid-shelf" id="polaroidShelf"></div>
    `;

    const shelf = document.getElementById("polaroidShelf");

    POLAROIDS.forEach((p, i) => {
        const wrap = document.createElement("div");
        wrap.className = "polaroid-wrap";
        wrap.style.transitionDelay = `${i * 0.045}s`;

        wrap.innerHTML = `
            <div class="polaroid">
                <div class="polaroid-img-box">
                    <img src="${p.photo}" alt="${p.caption}" onerror="this.style.display='none'">
                    <span class="polaroid-emoji-fallback">${p.emoji}</span>
                </div>
                <div class="polaroid-caption">${p.caption}</div>
                <div class="polaroid-num">${String(i+1).padStart(2,'0')}</div>
                <div class="polaroid-sheen"></div>
            </div>`;

        wrap.addEventListener("click", () => openPolLightbox(p));
        shelf.appendChild(wrap);
    });

    function triggerPolaroidEntrance() {
        const wraps = shelf.querySelectorAll('.polaroid-wrap');
        wraps.forEach((w, i) => {
            setTimeout(() => w.classList.add('visible'), i * 45);
        });
    }

    const observer = new MutationObserver(() => {
        const panel = document.getElementById('p5');
        if (panel && panel.classList.contains('active')) {
            triggerPolaroidEntrance();
        }
    });
    const panelP5 = document.getElementById('p5');
    if (panelP5) observer.observe(panelP5, { attributes: true, attributeFilter: ['class'] });

    const overlay   = document.getElementById("lbOverlay");
    const lbImgWrap = document.getElementById("lbImgWrap");
    const lbEmoji   = document.getElementById("lbEmoji");
    const lbPhoto   = document.getElementById("lbPhotoImg");
    const lbCap     = document.getElementById("lbCaptionPol");
    const lbNote    = document.getElementById("lbNote");
    const lbClose   = document.getElementById("lbClose");

    function openPolLightbox(p) {
        if (!overlay) return;
        if (lbImgWrap) lbImgWrap.style.background = 'linear-gradient(145deg, #0e1a28, #060c16)';

        lbEmoji.textContent = p.emoji;
        lbPhoto.style.display = "none";
        lbEmoji.style.display = "inline";

        lbPhoto.src = p.photo;
        lbPhoto.onload  = () => { lbPhoto.style.display = "block"; lbEmoji.style.display = "none"; };
        lbPhoto.onerror = () => { lbPhoto.style.display = "none";  lbEmoji.style.display = "inline"; };

        if (lbCap) lbCap.textContent = p.caption;
        if (lbNote) lbNote.textContent = p.note;

        overlay.classList.add("open");
        setLightboxOpen(true);
    }

    if (lbClose) lbClose.addEventListener("click", () => { overlay.classList.remove("open"); setLightboxOpen(false); });
    if (overlay) overlay.addEventListener("click", e => { if (e.target === overlay) { overlay.classList.remove("open"); setLightboxOpen(false); } });
})();

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
//  LÍNEA DEL TIEMPO — timeline.js (PANEL 4 ACORDEÓN)
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

        // Ajuste inteligente: si nos das un nombre como "beso.jpeg", 
        // automáticamente le pone la carpeta "img/" para que funcione.
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

        // Click para expandir/cerrar
        const card = item.querySelector(".tl-card");
        card.addEventListener("click", () => {
            const isOpen = card.classList.contains("open");
            
            // Cerrar la tarjeta anterior si hay otra abierta
            if (openCard && openCard !== card) {
                openCard.classList.remove("open");
                openCard.querySelector(".tl-card-toggle span:first-child").textContent = "ver más";
            }
            
            // Alternar estado de la tarjeta actual
            card.classList.toggle("open", !isOpen);
            card.querySelector(".tl-card-toggle span:first-child").textContent = !isOpen ? "cerrar" : "ver más";
            openCard = !isOpen ? card : null;

            // Scroll suave cuando se abre para asegurar que la foto se vea
            if (!isOpen) {
                setTimeout(() => {
                    card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
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
