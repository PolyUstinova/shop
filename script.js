"use strict";

getProductsByCategory("all");
amountInBasket();

for(let button of basketButtons){
    button.addEventListener('click', openBasket);
}

for(let li of categoryList){
    li.addEventListener('click', function(e){
        categoryList.forEach(el => {
            el.classList.remove('active-link')
        });
        currentCategory = li.dataset.category;
        getProductsByCategory(currentCategory);
        li.classList.add('active-link')
    });
};

searchInp.addEventListener('input', function(){
    fetch('https://dummyjson.com/products/search?q=' + searchInp.value)
    .then(res => res.json())
    .then(data => showProduct(data));
    content.style.display = "flex";
    basketWrapper.style.display = "none";
}); 

function amountInBasket(){
    for(let amount of amountGoods){
        amount.textContent = String(Object.keys(basket).length);
    }
}

function showProduct(data){
    let allProducts = data.products;
    let productList = "";
    for (const product of allProducts) {
        productList += `
        <div class="product-card" id="card-${product.id}">
            <div class="info">
            <img src="${product["images"][0]}" alt="" class="img-product">
                <div class="info-card">
                <p class="title-product">${product.title}</p>
                <p class="price-product">$${product.price}</p>
                </div>
            </div>
            <input type="button" value="Buy" class="buy-btn buy-card-btn"></input>
        </div>`;
    }
    cards.innerHTML = productList;
    getIdForPop(allProducts);  
    let buyButtons = document.querySelectorAll('.buy-btn');
    for(const button of buyButtons){
        button.addEventListener('click', addToBasket);
    }
}

function getIdForPop(products){
    let productCards = document.querySelectorAll('.product-card');
    for(let card of productCards){
        card.addEventListener('click', function (e){
            if(e.target.type != "button"){
                let productId;
                for(const product of products){
                    if (product.id == card.id.match(/\d+/)){
                        productId = product.id;
                    }
                }
                fetch('https://dummyjson.com/products/' + productId)
                .then(res => res.json())
                .then(res => showInfoAboutProduct(res));
                e.preventDefault();
            }
        });
    }
}

function getProductsByCategory(category){
    content.style.display = "flex";
    basketWrapper.style.display = "none";
    if(category == "all"){
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(res => showProduct(res));
    } else {
        fetch('https://dummyjson.com/products/category/' + category)
        .then(res => res.json())
        .then(data => showProduct(data));
    }
}

function showInfoAboutProduct(product){
    let pop = `<div class="product-popup">
        <svg class="close-popup" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#8D2FF7" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
        <div class="main-info">
            <img src="${product["images"][0]}" alt="" class="photo-pop">
            <div class="main-txt" id="card-${product.id}">  
                <div>
                <p class="title-pop">${product.title}</p>
                <div class="rating-pop">
                    <img src="img/Star 1.png" alt="" class="star-img">
                    <p class="rating-pop-txt">${product.rating}</p>
                </div>
                <p class="price">$<span class="price-pop">${product.price}</span></p>
                </div>
                <input type="button" value="Buy" class="buy-btn pop-btn"></input>
            </div>
        </div>
        <div class="about-product">
            <p class="head-about">About product</p>
            <p class="desc-pop">${product.description}</p>
            <p>Brand: <span class="brand-pop"></span>${product.brand}</p>
        </div>
    </div>`;

    popUpBg.innerHTML = pop;
    let productPopUp = document.querySelector('.product-popup');
    let closePopUpBtn = document.querySelector('.close-popup');
    popUpBg.classList.add('active');
    productPopUp.classList.add('active');

    closePopUpBtn.addEventListener('click', function(){
        popUpBg.classList.remove('active');
        productPopUp.classList.remove('active');
    });

    document.addEventListener('click', function(e){
        if(e.target == popUpBg){
            popUpBg.classList.remove('active');
            productPopUp.classList.remove('active');
        }
    });

    let buyButtons = document.querySelectorAll('.buy-btn');
    for(const button of buyButtons){
        button.addEventListener('click', addToBasket);
    }
}

function addToBasket(){
    let id = this.parentNode.getAttribute("id");
    let idProduct = id.match(/\d+/);
    fetch('https://dummyjson.com/products/' + idProduct[0])
    .then(res => res.json())
    .then(res => elemToBasket(res));
}

function elemToBasket(product){
    let basketId = product.id;
    let basketObj = {
        'photo' : product["images"][0],
        'title' : product.title,
        'price' : product.price,
        'amount' : 1
    }
    basket[basketId] = basketObj;
    amountInBasket();
}

function openBasket(){
    for(let li of categoryList){
        li.classList.remove('active-link');
    }
    let basketHTML = '';
    let storage_keys = Object.keys(basket);
    if(storage_keys.length == 0){
        basketHTML = "Oops! Basket is empty";
    } else {
        for(let key of storage_keys){
            let product = basket[key];
            basketHTML += `
                <div class="basket-elem" id="basket-elem-${key}">
                    <div class="basket-elem-main">
                        <img src="${product.photo}" class="basket-elem-photo">
                        <p class="basket-elem-title">${product.title}</p>
                    </div>
                    <div class="basket-elem-other">
                        <div class="basket-elem-second">
                            <p class="basket-elem-price">$${product.price}</p>
                            <div class="amount-block">
                                <input type="button" class="minus-btn" value="-"></input>
                                <input type="text" class="basket-elem-amount" value="${product.amount}"></input>
                                <input type="button" class="plus-btn" value="+"></input>
                            </div>
                        </div>
                        <input type="button" class="delete-btn" value="Delete"></input>
                    </div>
                </div>`;
        }
    }
    basketBlock.innerHTML = basketHTML;
    basketWrapper.style.display = "block";
    content.style.display = "none";

    let deleteButtons = document.querySelectorAll('.delete-btn');
    for(let btn of deleteButtons){
        btn.addEventListener('click', deleteProduct);
    }
    let clearBasket = document.querySelector('.clear-btn');
    clearBasket.addEventListener('click', clearBasketItem);

    let plusBtns = document.querySelectorAll('.plus-btn');
    for(let plus of plusBtns){
        plus.addEventListener('click', plusProduct);
    }

    let minusBtns = document.querySelectorAll('.minus-btn');
    for(let minus of minusBtns){
        minus.addEventListener('click', minusProduct);
    }

    totalCost();
}

function deleteProduct(){
    let id = this.parentElement.parentElement.getAttribute('id').match(/\d+/);
    delete basket[id];
    openBasket();
    amountInBasket();
};

function clearBasketItem(){
    basket = {};
    openBasket();
    amountInBasket();
}

function plusProduct(){
    let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('id').match(/\d+/);
    let amount = basket[id].amount;
    amount++;
    basket[id].amount = amount;
    openBasket();
}

function minusProduct(){
    let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('id').match(/\d+/);
    let amount = basket[id].amount;
    if(amount == 1){
        this.disabled = true;
    } else {
        this.disabled = false;
        amount--;
        basket[id].amount = amount;
        openBasket();
    }
}

function totalCost(){
    let storage_keys = Object.keys(basket);
    let total = 0;
    for(let key of storage_keys){
        let product = basket[key];
        let cost = product.price * product.amount;
        total += cost;
    }
    totalBlock.innerHTML = `<p class="total-txt">Total cost - $${total}</p>`;
}
