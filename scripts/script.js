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
    for(let li of categoryList){
        li.classList.remove('active-link');
    }
}); 