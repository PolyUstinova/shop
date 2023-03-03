"use strict";

function amountInBasket(){
    for(let amount of amountGoods){
        let keys = Object.keys(basket);
        let countBasket = 0;
        for(let key of keys){
            let product = basket[key];
            countBasket += Number(product.amount);
        }
        amount.textContent = countBasket;
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
                                <input type="number" class="basket-elem-amount" value="${product.amount}"></input>
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

    let basketAmountInp = document.querySelectorAll('.basket-elem-amount');
    for(let inp of basketAmountInp){
        inp.addEventListener('blur', changeAmount);
    }

    let plusBtns = document.querySelectorAll('.plus-btn');
    for(let plus of plusBtns){
        plus.addEventListener('click', plusProduct);
    }

    let minusBtns = document.querySelectorAll('.minus-btn');
    for(let minus of minusBtns){
        minus.addEventListener('click', minusProduct);
    }

    amountInBasket();
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

function changeAmount(){
    let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('id').match(/\d+/);
    let amount = basket[id].amount;
    if(this.value > 0){
        amount = this.value;
    }
    basket[id].amount = amount;
    openBasket();
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