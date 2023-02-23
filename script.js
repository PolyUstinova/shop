"use strict";

let content = document.querySelector('#content');
let cards = document.querySelector('.cards');
let headCat = document.querySelector('#head-cat');
let wrapper = document.querySelector('.wrapper');

let categoryList = document.querySelectorAll('.category-sub');
let currentCategory = "";
let headCatText = "";
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
        <div class="product-card" id="${product.id}">
            <div class="info">
            <img src="${product["images"][0]}" alt="" class="img-product">
            <div class="info-card">
            <p class="title-product">${product.title}</p>
            <p class="price-product">$${product.price}</p>
            </div>
            <p class="desc-product">${product.description}</p>
            </div>
            <input type="button" value="Купить" class="buy-btn"></input>
        </div>`;
    }
    cards.innerHTML = productList;
    let productCards = document.querySelectorAll('.product-card');
    let popUpBg = document.querySelector('.popup-bg');
    let popup = document.querySelector('.product-popup');
    for(let card of productCards){
        card.addEventListener('click', function(e){
            let productId;
            for(const pr of allProducts){
                if (pr.id == card.id){
                    productId = pr.id;
                }
            }
            console.log(productId);
            fetch('https://dummyjson.com/products/' + productId)
            .then(res => res.json())
            .then(res => showInfoAboutProduct(res));
            e.preventDefault();
            popUpBg.classList.add('active');
            popup.classList.add('active');
        });
    }
    let closePopUpBtn = document.querySelector('.close-popup');
    closePopUpBtn.addEventListener('click', function(){
        popUpBg.classList.remove('active');
        popup.classList.remove('active');
    });

    document.addEventListener('click', function(e){
        if(e.target == popUpBg){
            popUpBg.classList.remove('active');
            popup.classList.remove('active');
        }
    })
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
    let photoPop = document.querySelector('.photo-pop');
    let titlePop = document.querySelector('.title-pop');
    let pricePop = document.querySelector('.price-pop');
    let descPop = document.querySelector('.desc-pop');
    photoPop.src = product["images"][0];
    titlePop.textContent = product.title;
    pricePop.textContent = product.price;
    descPop.textContent = product.description;
}