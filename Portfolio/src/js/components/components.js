const tabsBtn = document.querySelectorAll(".tabs__nav-btn");
const tabsItems = document.querySelectorAll(".tabs__item"); 

tabsBtn.forEach(function(item) {
    item.addEventListener("click", function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");
        let currentTab = document.querySelector(tabId);

        tabsBtn.forEach(function(item) {
            item.classList.remove("tabs__nav-btn--active");
        });

        tabsItems.forEach(function(item) {
            item.classList.remove("tabs__item--active");
        });

        currentBtn.classList.add('tabs__btn--active');
        currentTab.classList.add('tabs__item--active');
    });
});


document.querySelector('.tabs__nav-btn').click();