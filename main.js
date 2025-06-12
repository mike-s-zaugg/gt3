// Einfache Cursor-Animation ohne requestAnimationFrame
let mouseX = 0;
let mouseY = 0;
let cursorShadow = document.querySelector('.cursor-shadow');

function moveCursor() {
  let diffX = mouseX - cursorShadow.offsetLeft;
  let diffY = mouseY - cursorShadow.offsetTop;
  cursorShadow.style.left = (cursorShadow.offsetLeft + diffX / 10) + 'px';
  cursorShadow.style.top = (cursorShadow.offsetTop + diffY / 10) + 'px';
  setTimeout(moveCursor, 16); // etwa 60fps
}

moveCursor();

document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('mouseenter', function() {
  cursorShadow.style.opacity = '1';
});

document.addEventListener('mouseleave', function() {
  cursorShadow.style.opacity = '0';
});

  // Fade-in beim Scrollen (einfach ohne IntersectionObserver)
  window.addEventListener('scroll', function() {
    let fadeEls = document.querySelectorAll('.fade-in-on-scroll');
    fadeEls.forEach(function(el) {
      let rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('visible');
      }
    });
  });

  // Einfacher Counter
  let counters = document.querySelectorAll('.counter');
  counters.forEach(function(counter) {
    let target = parseInt(counter.getAttribute('data-target'));
    let count = 0;
    let step = target / 100;
    let interval = setInterval(function() {
      count += step;
      if (count >= target) {
        counter.textContent = target;
        clearInterval(interval);
      } else {
        counter.textContent = Math.floor(count);
      }
    }, 20);
  });

  // Header-Verhalten beim Scrollen
  let lastScrollY = 0;
  let header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    let currentScrollY = window.scrollY;
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

  // Karten Hover-Effekt
  document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      card.style.zIndex = '10';
    });
    card.addEventListener('mouseleave', function() {
      card.style.zIndex = '1';
    });
  });

  // Parallax Effekt
  let heroImage = document.querySelector('.emo-img');
  let heroText = document.querySelector('.emo-text');
  window.addEventListener('scroll', function() {
    let y = window.pageYOffset;
    if (heroImage) heroImage.style.transform = 'translateY(' + (y * -0.5) + 'px)';
    if (heroText) heroText.style.transform = 'translateY(' + (y * 0.3) + 'px) skewX(-8deg)';
  });

  // Smooth Scroll Links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      let target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Seite einblenden beim Laden
  document.body.style.opacity = '0';
  window.addEventListener('load', function() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });

