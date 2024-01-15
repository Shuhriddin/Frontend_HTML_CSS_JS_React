// Burger menu

let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let menuLinks = menu.querySelectorAll('.menu__link');


burger.addEventListener('click',

  function () {

    burger.classList.toggle('burger--active');

    menu.classList.toggle('header__nav--active');

    document.body.toggle('stop-scroll');
  })

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {


    burger.classList.remove('burger--active');

    menu.classList.remove('header__nav--active');

    document.body.classList.remove('stop-scroll')
  })
})


// Search part

const headerBtnLoop = document.querySelector('.loop');
const headerFormOpen = document.querySelector('.header__form');
const headerBtnLoopClose = document.querySelector('.loop-close');

headerBtnLoop.addEventListener('click', () => {
  headerFormOpen.classList.add('is-active');
});

headerBtnLoopClose.addEventListener('click', () => {
  headerFormOpen.classList.remove('is-active');
});



// Swiper parts

const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});



// tabs

const tabsBtn = document.querySelectorAll(".tabs__nav-btn");
const tabsItems = document.querySelectorAll(".tabs__item");

tabsBtn.forEach(function (item) {
  item.addEventListener("click", function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);

    tabsBtn.forEach(function () {
      item.classList.add('active')
    });

    tabsBtn.forEach(function (item) {
      item.classList.remove("active");
    });

    tabsItems.forEach(function (item) {
      item.classList.remove("tabs__item--active");
    });

    currentBtn.classList.add('active');
    currentTab.classList.add('tabs__item--active');
  });
});


document.querySelector('.tabs__nav-btn').click();



// accordion

// const accordion = document.getElementsByClassName('contentBx');

// for (i = 0; i<accordion.length; i++){
//     accordion[i].addEventListener('click', function(){
//         this.classList.toggle('active');
// })
// };

new Accordion('.accordion-list', {
  elementClass: 'accordion',
  triggerClass: 'accordion__control',
  panelClass: 'accordion__content',
  activeClass: 'accordion--active'
});
