const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 8;
  header.classList.toggle('is-scrolled', scrolled);
});



const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('primary-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = header.classList.contains('nav-open');

    if (!isOpen) {
      
      header.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('no-scroll');
    } else {

      header.classList.add('nav-closing');
      toggle.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('no-scroll');
      
      const onAnimEnd = () => {
        header.classList.remove('nav-open', 'nav-closing');
        nav.removeEventListener('animationend', onAnimEnd);
      };
      nav.addEventListener('animationend', onAnimEnd, { once: true });
    }
  });
}

const revealables = document.querySelectorAll('.reveal-on-scroll');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  revealables.forEach(el => {
    el.style.animationPlayState = 'paused';
    io.observe(el);
  });
}

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const nombre = form.nombre;
    const email = form.email;
    const mensaje = form.mensaje;
    let ok = true;

    const showErr = (input, show) => {
      const small = input.parentElement.querySelector('.error');
      if (small) small.style.display = show ? 'block' : 'none';
      input.setAttribute('aria-invalid', show ? 'true' : 'false');
      input.style.borderColor = show ? '#ef4444' : '';
    };

    if (!nombre.value.trim()) { showErr(nombre, true); ok = false; } else showErr(nombre, false);
    if (!mensaje.value.trim()) { showErr(mensaje, true); ok = false; } else showErr(mensaje, false);
    if (!email.validity.valid) { showErr(email, true); ok = false; } else showErr(email, false);

    if (ok) {
      alert('¡Gracias! Hemos recibido tu mensaje.');
      form.reset();
    }
  });
}

const numeroWhatsApp = '573232927692'; 
const mensajeWhatsApp = 'Hola, quiero más información sobre sus servicios.'; // <--- cambiar el mensaje predeterminado de WhatsApp :D

const botonWhatsApp = document.createElement('a');
botonWhatsApp.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
botonWhatsApp.className = 'whatsapp-button';
botonWhatsApp.target = '_blank';
botonWhatsApp.setAttribute('aria-label', 'Chatear por WhatsApp');

const img = document.createElement('img');
img.src = 'assets/images/whatsapp.webp';
img.alt = 'WhatsApp';
img.width = 28;
img.height = 28;
img.loading = 'lazy';

botonWhatsApp.appendChild(img);
document.body.appendChild(botonWhatsApp);
