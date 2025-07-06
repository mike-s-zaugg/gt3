gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.fade-in-on-scroll').forEach(elem => {
  gsap.fromTo(elem, 
    {opacity: 0, y: 20}, 
    {
      opacity: 1, 
      y: 0, 
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
});

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('mouseenter', () => {
  document.querySelector('.cursor-shadow').style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  document.querySelector('.cursor-shadow').style.opacity = '0';
});

function animateCursor() {
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;

  cursorX += dx * 0.1;
  cursorY += dy * 0.1;

  const cursorShadow = document.querySelector('.cursor-shadow');
  if (cursorShadow) {
    cursorShadow.style.left = cursorX + 'px';
    cursorShadow.style.top = cursorY + 'px';
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
  observer.observe(el);
});

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      animateCounter(counter, target);
      statsObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
  statsObserver.observe(counter);
});

let lastScrollY = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 100) {
    header.style.backgroundColor = 'rgba(33, 39, 61, 0.95)';
    header.style.backdropFilter = 'blur(15px)';
  } else {
    header.style.backgroundColor = 'rgba(33, 39, 61, 0.9)';
    header.style.backdropFilter = 'blur(10px)';
  }

  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }

  lastScrollY = currentScrollY;
});

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.zIndex = '10';
  });

  card.addEventListener('mouseleave', () => {
    card.style.zIndex = '1';
  });
});

document.body.style.opacity = '0';
window.addEventListener('load', () => {
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '1';
});

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btn.style.setProperty('--x', x + 'px');
    btn.style.setProperty('--y', y + 'px');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

function createFloatingElements() {
  const container = document.body;

  for (let i = 0; i < 20; i++) {
    const element = document.createElement('div');
    element.style.cssText = `
      position: fixed;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: rgba(185, 212, 241, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      animation: float ${Math.random() * 20 + 10}s linear infinite;
    `;
    container.appendChild(element);
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
  
  .btn {
    --x: 0px;
    --y: 0px;
  }
  
  .btn::after {
    content: '';
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
    pointer-events: none;
  }
  
  .btn:hover::after {
    width: 200px;
    height: 200px;
  }
`;
document.head.appendChild(style);

createFloatingElements();

let ticking = false;

function updateAnimations() {
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimations);
    ticking = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hamburger-btn");
  const menu = document.getElementById("mobile-menu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("d-none");
  });
});

window.addEventListener('scroll', requestTick);
