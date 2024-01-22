// хедер скролл
const headerEl = document.getElementById('header');
window.addEventListener("scroll", function () {
    const scrollPos = window.scrollY

    if (scrollPos > 100) {
        headerEl.classList.add('header_mini')
    } else {
        headerEl.classList.remove('header_mini')
    }
})

// модальное окно
document.getElementById('open-modal-btn').addEventListener("click", function () {
    document.getElementById('my-modal').classList.add('open')
})
document.getElementById('close-my-modal-btn').addEventListener("click", function () {
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
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click", function () {
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


// loader

var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
    loader.style.display = "none"
})

// modal send
var btn = document.getElementById("btn");
btn.addEventListener("click", function (e) {
    e.preventDefault()
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var msg = document.getElementById("message").value;
    var body = 'name: ' + name + '<br/> phone: ' + phone + '<br/> message: ' + msg;

    var errorName = document.getElementById("errorName");
    var errorPhone = document.getElementById("errorPhone");

    if (name.trim() === '') {
        errorName.innerHTML = 'Введите имя';
        return; // Prevent further execution if validation fails
    } else if (name.length < 2) {
        errorName.innerHTML = 'Имя должно содержать как минимум 2 символа';
        return; // Prevent further execution if validation fails
    }
    if (phone.trim() === '') {
        errorPhone.innerHTML = 'Введите телефон номер';
        return; // Prevent further execution if validation fails
    } else if (name.length < 12) {
        errorPhone.innerHTML = 'Номер телефона должен содержится 12 символа';
        return; // Prevent further execution if validation fails
    }

    Email.send({
        SecureToken: "18823e6e-3016-4aa2-9424-b77cf0bf4931",
        To: 'shuxriddinsolixov2023@gmail.com',
        From: "shuxriddinsolixov2023@gmail.com",
        Subject: "contact message",
        Body: body
    }).then(
        message => {
            if (message == 'OK') {
                swal("Спасибо!", "Сообщение отправлено!", "success");
            } else {
                swal("Ошибка", "Сообщение не отправлено!", "error");
            }
        }
    );

})