let slide = document.querySelector('#slide');
let items = document.querySelectorAll('nav a');

function marker(e){
    slide.style.left = e.offsetLeft+"px";
    slide.style.width = e.offsetWidth+"px";
}

items.forEach(link => {
    link.addEventListener("click", (e)=> {
        marker(e.target);
    })
})