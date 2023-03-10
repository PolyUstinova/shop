"use strict";

function showProduct(data){
    sortGoods('', data.products);
    optionsSort.addEventListener('change', (event) => {
        let select = event.target.value;
        sortGoods(select, data.products);
    });
}

function sortGoods(sortType, products){
    let compareElem;
    if(sortType == 'id' || sortType == ''){
        compareElem = function (a, b){
            return a.id-b.id
        }
    }
    if(sortType == 'inexpensive'){
        compareElem = function (a, b){
            return a.price-b.price
        }
    }
    if(sortType == 'expensive'){
        compareElem = function (a, b){
            return b.price-a.price
        }
    }
    if(sortType == 'top-rated'){
        compareElem = function (a, b){
            return b.rating-a.rating
        }
    }
    products.sort(compareElem);
    let productList = "";
    for (const product of products) {
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
    getIdForPop(products);  
    let buyButtons = document.querySelectorAll('.buy-btn');
    for(const button of buyButtons){
        button.addEventListener('click', addToBasket);
    }
}

function getProductsByCategory(category){
    content.style.display = "flex";
    basketWrapper.style.display = "none";
    regWrapper.style.display = 'none';
    accWrapper.style.display = "none";
    logWrapper.style.display = "none";
    let resp;
    if(category == "all"){
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => showProduct(data));
    } else {
        fetch('https://dummyjson.com/products/category/' + category)
        .then(res => res.json())
        .then(data => showProduct(data));
    }
    optionsSort.value = 'id';
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
                .then(data => showInfoAboutProduct(data));
                e.preventDefault();
            }
        });
    }
}

function showInfoAboutProduct(product){
    let pop = `
    <div class="product-popup">
        <svg class="close-popup" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#8D2FF7" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
        <div class="main-info">
            <img src="${product["images"][0]}" alt="" class="photo-pop">
            <div class="main-txt" id="card-${product.id}">  
                <div>
                <p class="title-pop">${product.title}</p>
                <div class="rating-pop">
                    <img src="styles/img/Star 1.png" alt="" class="star-img">
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
            <div class="comments-wrapper">
                <p class="comment-head">Comments</p>
                <div class="comments-block"></div>
                <div class="add-comment">
                    <input type="text" class="add-comment-input">
                    <input type="button" value="Add comment" class="add-comment-btn">
                </div>
                <p class="comment-added">Your comment successfully added</p>
             </div>
        </div>
    </div>`;

    popUpBg.innerHTML = pop;
    let productPopUp = document.querySelector('.product-popup');
    let closePopUpBtn = document.querySelector('.close-popup');
    popUpBg.classList.add('active');
    productPopUp.classList.add('active');

    let addCommentBlock = document.querySelector('.add-comment');
    addCommentBlock.style.display = "none";
    let messageComment = document.querySelector('.comment-added');
    messageComment.style.display = "none";

    getComments(product);

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