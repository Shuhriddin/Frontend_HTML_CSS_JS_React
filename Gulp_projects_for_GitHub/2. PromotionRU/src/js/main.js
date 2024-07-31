// SCROLLL
const headerEl = document.getElementById('header');
window.addEventListener("scroll", function () {
  const scrollPos = window.scrollY
  if (scrollPos > 100){
    headerEl.classList.add('header_mini')
  }else {
    headerEl.classList.remove("header_mini")
  }
})



gsap.from(".title-one", {
  duration: 1,
  y: 50,
  scale: 0.5,
  opacity: 0,
  delay: 0.1,
  stagger: 0.2,
  ease: "slow",
  force3D: true
});

document.querySelectorAll(".hero__title").forEach(function (box) {
  box.addEventListener("click", function () {
    gsap.to(".title-one", {
      duration: 0.5,
      opacity: 0,
      y: -100,
      stagger: 0.1,
      ease: "back.in"
    });
  });
});

gsap.from(".title-two", {
  duration: 1,
  y: 50,
  scale: 0.5,
  opacity: 0,
  delay: 0.1,
  stagger: 0.2,
  ease: "slow",
  force3D: true
});

document.querySelectorAll(".title-two").forEach(function (box) {
  box.addEventListener("click", function () {
    gsap.to(".title-two", {
      duration: 0.5,
      opacity: 0,
      y: -100,
      stagger: 0.1,
      ease: "back.in"
    });
  });
});

gsap.to(".hero__container", {
  duration: 1,
  scale: 1,
  y: 40,
  ease: "power1.inOut",
  stagger: {
    grid: [7, 15],
    from: "center",
    axis: "y",
    amount: 1.5
  }
});


let tween = gsap.to(".header__title", {
  rotation: 360,
  duration: 2,
  ease: "elastic"
});

//now we can control it!
tween.pause();
tween.seek(2);
tween.progress(1);
tween.play();


// ============================================================slider=================================================

var swiper = new Swiper(".mySwiper", {
  effect: "cube",
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
// ============================================================slider=================================================

const carusel = document.querySelector(".merch__list")
const arrowsBtn = document.querySelectorAll(".merch__box i")
const firstCardWidth = carusel.querySelector('.merch__item').offsetWidth;

let isDragging = false, startX, startScrollLeft;

arrowsBtn.forEach(btn => {
  btn.addEventListener('click', ()=> {
    carusel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
  })
})

const dragStart = (e) => {
  isDragging = true;
  carusel.classList.add("dragging")
  startX = e.pageX;
  startScrollLeft = carusel.scrollLeft
}


const dragging = (e) => {
  if(!isDragging) return;
  carusel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = ()=>{
  isDragging = false;
  carusel.classList.remove('dragging')
}


carusel.addEventListener("mousedown", dragStart);
carusel.addEventListener("mousemove", dragging);
carusel.addEventListener("mouseup", dragStop);



// ------------------------------------------------------------Scroll Reveal------------------------------------------------------------------
const sr = ScrollReveal({
  origin: 'top',
  distance: '100px',
  duration: 2000,
  reset: true,
});

sr.reveal(".hero_text--one", { delay: 100 });
sr.reveal(".title-this", { delay: 200 })
sr.reveal(".hero-4--title", { delay: 200 })
sr.reveal(".hero-seven--title", { delay: 200 })
sr.reveal(".command-title", { delay: 200 })
sr.reveal(".carier__title", { delay: 200 })
sr.reveal(".merch__title", { delay: 200 })

sr.reveal(".hero-seven--box", { interval: 200 })

const srBottom = ScrollReveal({
  origin: 'bottom',
  distance: '100px',
  duration: 2000,
  reset: true,
});

sr.reveal(".hero-thrid--text", { delay: 100 });
sr.reveal(".title-this", { delay: 200 })
sr.reveal(".hero-five--caption", { delay: 200 })
sr.reveal(".hero-five--text", { delay: 200 })
sr.reveal(".hero-seven--text", { delay: 200 })
sr.reveal(".carier__list", { delay: 200 })
sr.reveal(".map__mail", { delay: 200 })
sr.reveal(".cards-list", { delay: 200 })
sr.reveal(".hero-six--title", { delay: 200 })





const srLeft = ScrollReveal({
  origin: 'left',
  distance: '100px',
  duration: 2000,
  reset: true,
})

srLeft.reveal(".hero-3--title", { delay: 100 })
srLeft.reveal(".button-link", { delay: 100 })
srLeft.reveal(".ball-blck--link", { delay: 100 })
srLeft.reveal(".button-content", { delay: 100 })
srLeft.reveal(".tx-2", { delay: 100 })
srLeft.reveal(".map__title", { delay: 100 })

const srRight = ScrollReveal({
  origin: 'right',
  distance: '100px',
  duration: 2000,
  reset: true,
});

srRight.reveal(".ball-block--link", { delay: 100 })
srRight.reveal(".button-content--second", { delay: 100 })
sr.reveal(".hero__text--right", { delay: 200 })
sr.reveal(".tx-1", { delay: 200 })
sr.reveal(".map__phone", { delay: 200 })
sr.reveal(".hero__down--span", { delay: 200 })
// sr.reveal(".svg-map-dims", { delay: 200 })