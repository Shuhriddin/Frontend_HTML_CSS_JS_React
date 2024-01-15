// хедер скролл
const headerEl = document.getElementById('header');
window.addEventListener("scroll", function(){
    const scrollPos = window.scrollY
    
    if (scrollPos > 100) {
        headerEl.classList.add('header_mini')
    }else{
        headerEl.classList.remove('header_mini')
    }
})

// модальное окно
document.getElementById('open-modal-btn').addEventListener("click", function(){
    document.getElementById('my-modal').classList.add('open')
})
document.getElementById('close-my-modal-btn').addEventListener("click", function(){
    document.getElementById('my-modal').classList.remove('open')
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.getElementById('my-modal').classList.remove('open')
    }
})

// Закрыть модальное окно при клике вне его
document.querySelector("#my-modal .modal__box").addEventListener("click", event => {
    event._isClickWithInModal = true;
})
document.getElementById("my-modal").addEventListener("click", event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove("open")
});

// Бургер меню====
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("burger").addEventListener("click", function() {
        document.querySelector(".header").classList.toggle("open")
    })
})

// Закрыть модальное окно при клике вне его
document.getElementById("menu").addEventListener("click", event => {
    event._isClickWithInMenu = true;
})
document.getElementById("burger").addEventListener("click", event => {
    event._isClickWithInMenu = true;
});
document.body.addEventListener("click", event => {
    if (event._isClickWithInMenu) return;
    document.querySelector(".header").classList.remove("open")
})

// skills block animation=========================================
const ratings = document.querySelectorAll('.skills__rating');

ratings.forEach((rating) => {
    const block = rating.querySelector('.block');
    for (let i = 1; i < 100; i++) {
        rating.innerHTML += "<div class='block'></div>";
        const blocks = rating.querySelectorAll('.block');
        blocks[i].style.transform = 'rotate(' + 3.6 * i + 'deg)';
        blocks[i].style.animationDelay = `${i / 40}s`;
    }

    const counter = rating.querySelector('.counter');
    counter.innerText = 0;

    const target = +counter.getAttribute('data-target');

    const numberCount = () => {
        const value = +counter.innerText;
        if (value < target) {
            counter.innerText = Math.ceil(value + 1);
            setTimeout(numberCount, 5);
        }
    }
    numberCount();
});


