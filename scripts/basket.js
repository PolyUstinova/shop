"use strict";

function amountInBasket(){
    for(let amount of amountGoods){
        let basketKeys = Object.keys(basket);
        let amountBask = 0;
        for(let key of basketKeys){
            amountBask += Number(basket[key].quantity);
        }
        amount.textContent = amountBask;
    }
}

function addToBasket(){
    let idP = this.parentNode.getAttribute("id");
    let idProduct = idP.match(/\d+/);
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
    if(checkID(basketId) == false){
        basket.push(basketObj);
        amountInBasket();
    }
}

function checkID(bId){
    for(let key of Object.keys(basket)){
        if(basket[key].id == bId){
            flag = true;
        } else {
            flag = false;
        }
    }
    return flag;
}

function openBasket(){
    for(let li of categoryList){
        li.classList.remove('active-link');
    }
    fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userIdForBasket,
            products: basket
        })
    })
    .then(res => res.json())
    .then(res => drawBasket(res));
    console.log(basket);
    console.log(userIdForBasket);
}

function deleteProduct(){
    let id = this.parentElement.parentElement.getAttribute('id').match(/\d+/);
    basket.splice(basket.indexOf(id), 1);
    openBasket();
    amountInBasket();
};

function drawBasket(basketArr){
    let basketHTML = '';
    let storage_keys = Object.keys(basket);
    if (storage_keys.length == 0){
        basketHTML = "Oops! Basket is empty";
    } else {
        for(let key of storage_keys){
            let product = basketArr.products[key];
            basketHTML += `
                <div class="basket-elem" id="basket-elem-${key}">
                    <p class="basket-elem-title">${product.title}</p>
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
    logWrapper.style.display = "none";
    regWrapper.style.display = 'none';
    content.style.display = "none";
    accWrapper.style.display = "none";

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
    totalCost(basketArr);
}

function clearBasketItem(){
    basket = [];
    openBasket();
    amountInBasket();
}

function changeAmount(){
    let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('id').match(/\d+/);
    if(this.value > 0){
        basket[id].quantity = this.value;
    }
    openBasket();
    amountInBasket();
}

function plusProduct(){
    let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('id').match(/\d+/);
    basket[id].quantity += 1;
    openBasket();
    amountInBasket();
}

function minusProduct(){
    let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('id').match(/\d+/);
    if(basket[id].quantity == 1){
        this.disabled = true;
    } else {
        this.disabled = false;
        basket[id].quantity -= 1;
        openBasket();
        amountInBasket();
    }
}

function totalCost(basketArr){
    totalBlock.innerHTML = `<p class="total-txt">Total cost - $${basketArr.total}</p>`;
}