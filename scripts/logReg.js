"use strict";

function openLog(){
    for(let li of categoryList){
        li.classList.remove('active-link');
    }
    let log = `
        <form action="">
            <label for="log_input" class="label">Login</label>
            <br>
            <input type="text" id="log_input" required placeholder="Enter login..." pattern="[^ а-яёА-ЯЁ ]+">
            <br>
            <label for="pass_input" class="label">Password</label>
            <br>
            <input type="password" id="pass_input" required placeholder="Enter password..." pattern="[^ а-яёА-ЯЁ ]+">
            <br>
            <input type="button" value="Log in" class="btn-form log_btn">
            <input type="reset" value="Cancel" class="cancel btn-form">
            </br>
            <a href="#" class="open-reg-btn">Registration</a>
        </form>
    `;
    logWrapper.style.display = 'block';
    content.style.display = "none";
    errorBlock.style.display = "none";
    basketWrapper.style.display = "none";
    regWrapper.style.display = 'none';
    accWrapper.style.display = "none";
    logBlock.innerHTML = log;

    let openRegBtn = document.querySelector('.open-reg-btn');
    openRegBtn.addEventListener('click', openReg);

    let logBtn = document.querySelector('.log_btn');
    logBtn.addEventListener('click', getUserForLog);

    backBtn.addEventListener('click', function(){
        content.style.display = "flex";
        logWrapper.style.display = "none";
    });
}

function getUserForLog(){
    let logInput = document.querySelector('#log_input').value;
    let passInput = document.querySelector('#pass_input').value;
    if(logInput != "" && passInput != ""){
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                
                username: logInput,
                password: passInput,
            })
        })
        .then(res => res.json())
        .then(data => logInUser(data));
    } else {
        errorBlock.style.display = "block";
    }
}

function logInUser(responce){
    if(responce.hasOwnProperty('id')){
        fetch('https://dummyjson.com/users/' + responce.id)
        .then(res => res.json())
        .then(data => checkLoginAndPassword(data));
    } else {
        errorBlock.style.display = "block";
    }
}

function checkLoginAndPassword(responce){
    let logInput = document.querySelector('#log_input').value;
    let passInput = document.querySelector('#pass_input').value;
    
    if(logInput == responce.username && passInput == responce.password){
        basket = [];
        amountInBasket();
        errorBlock.style.display = "none";
        logBlock.innerHTML = `<p>Welcome, ${responce.username}</p>`
        userIdForBasket = responce.id;
        localStorage.setItem(responce.id, responce.token);

        for(let p of profileImg){
            p.removeEventListener('click', openLog);
            p.addEventListener('click', function openAcc(){
                for(let li of categoryList){
                    li.classList.remove('active-link');
                }
                errorBlock.style.display = "none";
                logWrapper.style.display = "none";
                basketWrapper.style.display = "none";
                content.style.display = "none";
                accWrapper.style.display = "block";
                accBlock.innerHTML = `
                    <div class="user-info">
                        <img src="${responce.image}" class="user-image">
                        <p>This is account ${responce.username}</p>
                    </div>
                    <a href="#" class="log-out-btn">Log out</a>`;
                let logOutBtn = document.querySelector('.log-out-btn');
                logOutBtn.addEventListener('click', function(){
                    userIdForBasket = 1;
                    basket = [];
                    amountInBasket();
                    accWrapper.style.display = "none";
                    content.style.display = "flex";
                    p.addEventListener('click', openLog);
                    p.removeEventListener('click', openAcc);
                    flagForComment = false;
                });
            });
        }
        flagForComment = true;
    } else {
        errorBlock.style.display = "block";
    }
}

function openReg(){
    let reg = `
                <form action="">
                    <label for="log_reg_input" class="label">Login</label>
                    <br>
                    <input type="text" id="log_reg_input" required placeholder="Enter login..." pattern="[^ а-яёА-ЯЁ ]+" value="">
                    <br>
                    <label for="pass_reg_input" class="label">Password</label>
                    <br>
                    <input type="password" id="pass_reg_input" required placeholder="Enter password..." pattern="[^ а-яёА-ЯЁ ]+" value="">
                    <br>
                    <label for="repeat_pass_input" class="label">Repeat password</label>
                    <br>
                    <input type="password" id="repeat_pass_input" required placeholder="Repeat password..." pattern="[^ а-яёА-ЯЁ ]+" value="">
                    <br>
                    <input type="button" value="Registration" class="reg_btn btn-form">
                    <input type="reset" value="Cancel" class="cancel btn-form">
                </form>
    `;
    regBlock.innerHTML = reg;
    logWrapper.style.display = 'none';
    regWrapper.style.display = 'block';
    accWrapper.style.display = "none";
    errorBlock.style.display = "none";
    errorRegBlock.style.display = "none";

    backRegBtn.addEventListener('click', function(){
        logWrapper.style.display = "block";
        regWrapper.style.display = "none";
    });

    let regBtn = document.querySelector('.reg_btn');
    regBtn.addEventListener('click', function(){
        let logInput = document.querySelector('#log_reg_input').value;
        let passInput = document.querySelector('#pass_reg_input').value;
        let passRepeat = document.querySelector('#repeat_pass_input').value;
        getUserForReg(logInput, passInput, passRepeat);
    });
}

function getUserForReg(log, pass, repeat){
    if(pass == repeat && pass != "" && repeat != "" && log != "") {
        fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(data => checkLogin(data));
    } else {
        errorRegBlock.style.display = "block";
    }
}

function regUser(responce){
    if(responce.hasOwnProperty('id')){
        errorRegBlock.style.display = "block";
        errorRegBlock.textContent = "You was registred";
    } else {
        errorRegBlock.style.display = "block";
        errorRegBlock.textContent = "Error!";
    }
}

function checkLogin(responce){
    let logInput = document.querySelector('#log_reg_input').value;
    let passInput = document.querySelector('#pass_reg_input').value;
    let users = responce.users;
    for(let user of users){
        if(user.username == logInput){
            errorRegBlock.style.display = "block";
            errorRegBlock.textContent = "Error!";
            break;
        } else {
            fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: logInput,
                    lastName: passInput,
                })
                })
                .then(res => res.json())
                .then(data => regUser(data));
        }
    }
}