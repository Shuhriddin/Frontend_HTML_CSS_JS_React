let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard")
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", ()=>{
    body.classList.toggle("active")
})

closeShopping.addEventListener("click", ()=>{
    body.classList.remove("active")
})

let products = [
    {
        id: 1,
        name: "PIZZA",
        image: "1.png",
        price: 75000
    },
    {
        id: 2,
        name: "Hot Dog",
        image: "2.png",
        price: 25000
    },
    {
        id: 3,
        name: "Lavash",
        image: "3.png",
        price: 35000
    },
    {
        id: 4,
        name: "Chizburger",
        image: "4.png",
        price: 35000
    },
    {
        id: 5,
        name: "Ice Cream",
        image: "5.png",
        price: 25000
    },
    {
        id: 6,
        name: "Coffe",
        image: "6.png",
        price: 20000
    },
];

let listCards = []

function initApp(){
    products.forEach((value, key)=>{
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
        <img src="img/${value.image}"/>
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Добавить в корзинку</button>
        `;
        list.appendChild(newDiv)
    })
}
initApp();

function addToCard(key){
    if(listCards[key]==null){
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>x ${value.quantity}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `
            listCard.appendChild(newDiv)
        }
    })
    total.innerHTML = totalPrice.toLocaleString();
    quantity.innerText = count
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}