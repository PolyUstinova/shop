"use strict";

for(let li of categoryList){
    li.addEventListener('click', function(){
        currentCategory = li.dataset.category;
        headCatText = li.textContent;
        getProductsByCategory(currentCategory);
    }
)};

function showProduct(data){
    let allProducts = data.products;
    headCat.textContent = headCatText;
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
}

function getIdForPop(all){
    let productCards = document.querySelectorAll('.product-card');
    for(let card of productCards){
        card.addEventListener('click', function (e){
            if(e.target.type == "button"){
                console.log('buy');
            } else {
                let productId;
                for(const product of all){
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
            <div class="main-txt">  
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
}
