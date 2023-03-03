"use strict";

function amountInBasket(){
    for(let amount of amountGoods){
        let countBasket = basket.length;
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
        id: basketId,
        quantity: 1
    }
    basket.push(basketObj);
    amountInBasket();
}

function openBasket(){
    for(let li of categoryList){
        li.classList.remove('active-link');
    }

    fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 1,
            products: basket
        })
    })
    .then(res => res.json())
    .then(res => drawBasket(res));
}

function drawBasket(basketArr){
    let basketHTML = '';
    let storage_keys = Object.keys(basket);
    console.log(storage_keys);
    if (storage_keys.length == 0){
        basketHTML = "Oops! Basket is empty";
    } else {
        for(let key of storage_keys){
            let product = basketArr.products[key];
            basketHTML += `
                <div class="basket-elem" id="basket-elem-${key}">
                    <div class="basket-elem-main">
                    <p class="basket-elem-title">${product.title}</p>
                    </div>
                    <div class="basket-elem-other">
                        <div class="basket-elem-second">
                            <p class="basket-elem-price">$${product.price}</p>
                            <div class="amount-block">
                                <input type="button" class="minus-btn" value="-"></input>
                                <input type="number" class="basket-elem-amount" value="${product.quantity}"></input>
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

    /*let deleteButtons = document.querySelectorAll('.delete-btn');
    for(let btn of deleteButtons){
        btn.addEventListener('click', deleteProduct);
    }*/

    let clearBasket = document.querySelector('.clear-btn');
    clearBasket.addEventListener('click', clearBasketItem);

    /*let basketAmountInp = document.querySelectorAll('.basket-elem-amount');
    for(let inp of basketAmountInp){
        inp.addEventListener('blur', changeAmount(basketArr));
    }

    let plusBtns = document.querySelectorAll('.plus-btn');
    for(let plus of plusBtns){
        plus.addEventListener('click', plusProduct(basketArr));
    }

    let minusBtns = document.querySelectorAll('.minus-btn');
    for(let minus of minusBtns){
        minus.addEventListener('click', minusProduct(basketArr));
    }*/

    amountInBasket();
    totalCost(basketArr);
}

function deleteProduct(){
    let id = this.parentElement.parentElement.getAttribute('id').match(/\d+/);
    delete basket[id];
    openBasket();
    amountInBasket();
};

function clearBasketItem(){
    fetch('https://dummyjson.com/carts/1', {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(console.log);
    openBasket();
    amountInBasket();
}

function changeAmount(basketArr){
    let id = this.parentElement.parentElement.parentElement.getAttribute('id').match(/\d+/);
    if(this.value > 0){
        basketArr.products[id] = this.value;
    }
    openBasket();
}

function plusProduct(basketArr){
    let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('id').match(/\d+/);
    basketArr.products[id]++;
    openBasket();
}

function minusProduct(basketArr){
    let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('id').match(/\d+/);
    if(amount == 1){
        this.disabled = true;
    } else {
        this.disabled = false;
        basketArr.products[id]--;
        openBasket();
    }
}

function totalCost(basketArr){
    let storage_keys = Object.keys(basket);
    let total = 0;
    for(let key of storage_keys){
        let product = basketArr.products[key];
        let cost = product.price * product.quantity;
        total += cost;
    }
    totalBlock.innerHTML = `<p class="total-txt">Total cost - $${total}</p>`;
}