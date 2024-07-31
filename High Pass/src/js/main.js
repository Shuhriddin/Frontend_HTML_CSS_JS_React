// burger
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("burger").addEventListener("click", function () {
    document.querySelector(".header__media").classList.toggle("open")
  })
})



// search HEADER
document.addEventListener('DOMContentLoaded', (e) => {
  document.getElementById('open-search-from').addEventListener('click', (e) => {
    document.getElementById('search-form').classList.add('search-form-show')
  });
  document.getElementById('close-search-from').addEventListener('click', (e) => {
    document.getElementById('search-form').classList.remove('search-form-show')
  });
})
