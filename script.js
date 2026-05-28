// ══════════════════════════════════════
//  PANTALLA DE BIENVENIDA
// ══════════════════════════════════════
(function initWelcome() {
  const ws = document.getElementById('welcome-screen');
  const heartsContainer = document.getElementById('wsHearts');
  if (!ws || !heartsContainer) return;

  // Generar corazoncitos flotantes
  const emojis = ['❤️','🌹','💛','✨','🌊','💕','🌸','💫'];
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('span');
    h.className = 'ws-heart';
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = Math.random() * 100 + '%';
    h.style.animationDelay = (Math.random() * 5) + 's';
    h.style.animationDuration = (4 + Math.random() * 4) + 's';
    h.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
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

const labels = ['Nosotros','Nuestro amor','Corazón','Recuerdos','Nuestra historia','Carta de amor','Para siempre'];

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
  panelLabel.textContent = labels[current] || 'Momento especial';
  arrowHint.style.opacity = current === panels.length - 1 ? '0' : '1';

  panels.forEach((p,i) => p.classList.toggle('active', i === current));

  // Cuando entramos al panel 4 (timeline), resetear su scroll
  if (n === 4) {
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
    for (let i = 0; i < 18; i++) {
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

    ctx.fillStyle = '#0a1628';
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
    vg.addColorStop(0,    'rgba(10,22,40,0)');
    vg.addColorStop(0.65, 'rgba(10,22,40,0.08)');
    vg.addColorStop(1,    'rgba(10,22,40,0.50)');
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

  const COLORS = ['#d4697a','#9b89b8','#2d6a8f','#c8723a','#1a5c7a','#a06070'];
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
    for (let i = 0; i < 60; i++) {
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
    for (let i = 0; i < 14; i++) {
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