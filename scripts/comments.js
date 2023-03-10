"use strict";

function getComments(product){
    fetch('https://dummyjson.com/comments/post/' + product.id)
    .then(res => res.json())
    .then(data => drawComments(data));
}

function drawComments(comment){
    let commBlock = document.querySelector('.comments-block');
    let addCommentBlock = document.querySelector('.add-comment');
    let commentList = '';
    let allComments = comment.comments;
    if(allComments.length == 0){
        commBlock.textContent = "There is no comments!"
    } else {
        for(let comm of allComments){
            commentList += `
                <div class="comment">
                    <p class="comment-username">${comm.user.username}</p>
                    <p class="comment-body">${comm.body}</p>
                </div>
            `;
        }
        if(flagForComment == true){
            addCommentBlock.style.display = "flex";
            let addCommentBtn = document.querySelector('.add-comment-btn');
            addCommentBtn.addEventListener('click', function(){
                let id = comment.comments[0].postId;
                console.log(id);
                requestComment(id);
            });
        } else {
            addCommentBlock.style.display = "none";
        }
        commBlock.innerHTML = commentList;
    }
}

function requestComment(prodId){
    let addCommentInp = document.querySelector('.add-comment-input');
    fetch('https://dummyjson.com/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            body: addCommentInp.value,
            postId: prodId,
            userId: userIdForBasket,
        })
    })
    .then(res => res.json())
    .then(data => addComment(data));
}

function addComment(responce){
    let addCommentInp = document.querySelector('.add-comment-input');
    if(responce.hasOwnProperty('id')){
        let messageComment = document.querySelector('.comment-added');
        messageComment.style.display = "block";
        console.log(responce);
        addCommentInp.value = '';
    }
}