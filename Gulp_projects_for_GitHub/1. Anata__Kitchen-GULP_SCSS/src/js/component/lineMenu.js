let headerBtn = document.getElementById('header__btn')
let lineList = document.querySelector('.line-list')

headerBtn.addEventListener('click', () => {
    lineList.classList.toggle('open')
})