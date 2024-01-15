const form = document.getElementById('form');
const ageInput = document.getElementById('ageInput');
const password = document.getElementById('password');
const errorName = document.getElementById('errorName');
const errorSurName = document.getElementById('errorSurName');
const errorLastName = document.getElementById('errorLastName');
const errorAge = document.getElementById('errorAge');
const errorPassword = document.getElementById('errorPassword');
const button = document.getElementById('button');


form.addEventListener('submit', (e)=>{
    e.preventDefault()

    let nameInput = document.getElementById('nameInput').value;
    if (nameInput.length == 0) {
        errorName.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
        errorName.style.color = 'red';
        setTimeout(function() {
            errorName.innerHTML = ' ';
        }, 1500);

    } else {
        errorName.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>'
        errorName.style.color = 'green'
    }

    let surnameInput = document.getElementById('surnameInput').value;
    if (surnameInput.length == 0) {
        errorSurName.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
        errorSurName.style.color = 'red';
        setTimeout(function() {
            errorSurName.innerHTML = ' ';
        }, 2000);
    } else {
        errorSurName.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>'
        errorSurName.style.color = 'green'
    }

    let lastnameInput = document.getElementById('lastnameInput').value;
    if (lastnameInput.length == 0) {
        errorLastName.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
        errorLastName.style.color = 'red';
        setTimeout(function() {
            errorLastName.innerHTML = ' ';
        }, 2500);
    } else {
        errorLastName.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>'
        errorLastName.style.color = 'green'
    }

    let ageInput = document.getElementById('ageInput').value;
    if (ageInput.length == 0) {
        errorAge.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
        errorAge.style.color = 'red';
        setTimeout(function() {
            errorAge.innerHTML = ' ';
        }, 3000);
    } else {
        errorAge.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>'
        errorAge.style.color = 'green'
    }

    let password = document.getElementById('password').value;
    if (password.length == 0) {
        errorPassword.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
        errorPassword.style.color = 'red';
        setTimeout(function() {
            errorPassword.innerHTML = ' ';
        }, 3500);
    } else {
        errorPassword.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>'
        errorPassword.style.color = 'green'
    }
})

const nameInput = document.getElementById('nameInput');
nameInput.addEventListener('keyup', (e) => {
    nameInput.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase()
});

const surnameInput = document.getElementById('surnameInput');
surnameInput.addEventListener('keyup', (e)=>{
    surnameInput.value = e.target.value.charAt(0).toUpperCase()+ e.target.value.slice(1);
});

const lastnameInput = document.getElementById('lastnameInput');
lastnameInput.addEventListener('keyup', (e)=>{
    lastnameInput.value = e.target.value.charAt(0).toUpperCase()+ e.target.value.slice(1);
});





var typed = new Typed('.type', {
    strings: [
        'Developer',
        'Hacker'
    ],
    typeSpeed: 60,
    backSpeed: 60,
    loop: true
});




































// let text = document.querySelector('.input');

// const textLoad = () => {
//     setTimeout(() => {
//         text.innerHTML = 'Loading'
//     }, 0);
//     setTimeout(() => {
//         text.innerHTML = 'Validation'
//     }, 4000);
//     setTimeout(() => {
//         text.innerHTML = 'Shuxriddin'
//     }, 8000);
// }
// textLoad()