let content = document.querySelector('#content');
let logWrapper = document.querySelector('.log-wrapper');
let logBlock = document.querySelector('.log-block');
let regWrapper = document.querySelector('.reg-wrapper');
let regBlock = document.querySelector('.reg-block');
let cards = document.querySelector('.cards');
let headCat = document.querySelector('#head-cat');
let wrapper = document.querySelector('.wrapper');
let submenu = document.querySelector('.submenu');
let popUpBg = document.querySelector('.popup-bg');
let searchInp = document.querySelector('#search-input');
let amountGoods = document.querySelectorAll('.amount-goods');
let basketButtons = document.querySelectorAll('.basket-img');
let basketBlock = document.querySelector('.basket-block');
let basketWrapper = document.querySelector('.basket-wrapper');
let totalBlock = document.querySelector('.total-block');
let categoryList = document.querySelectorAll('.category-sub');
let profileImg = document.querySelectorAll('.profile-img');
let profileLog = document.querySelectorAll('.profile-log');
let backBtn = document.querySelector('.back');
let backRegBtn = document.querySelector('#back-log');
let accWrapper = document.querySelector('.account-wrapper');
let accBlock = document.querySelector('.account-block');
let profileDesk = document.querySelector('.profile-desk');
let errorBlock = document.querySelector('.error-block-reg');

let currentCategory = "";
let basketAmount = 0;
let basket = [];
let flag = false;
let userIdForBasket = 1;


