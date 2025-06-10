console.log("JS geladen!");

// Cursor-Shadow
document.addEventListener('mousemove', function(e) {
    const cursorShadow = document.querySelector('.cursor-shadow');
    cursorShadow.style.left = `${e.pageX}px`;
    cursorShadow.style.top = `${e.pageY}px`;
  });
  
  // Color Picker Preview
  for (let i = 1; i <= 3; i++) {
    const picker = document.getElementById('colorPicker' + i);
    const preview = document.getElementById('colorPreview' + i);
    picker.addEventListener('input', () => {
      preview.style.backgroundColor = picker.value;
    });
  }
  
  // GSAP Scroll Animation
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray('.fade-in-on-scroll').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });
  
  gsap.registerPlugin(ScrollTrigger);

const scrollContainer = document.querySelector(".scroll-wrapper");
const cards = gsap.utils.toArray(".card");

gsap.to(cards, {
  xPercent: -100 * (cards.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-scroll",
    pin: true,
    scrub: 1,
    snap: 1 / (cards.length - 1),
    end: () => "+=" + scrollContainer.offsetWidth
  }
});
