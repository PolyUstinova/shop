"use strict";

function getComments(product){
    fetch('https://dummyjson.com/comments/post/' + product.id)
    .then(res => res.json())
    .then(json => drawComments(json));
}

function drawComments(comment){
    let commBlock = document.querySelector('.comments-block');
    let commentList = '';
    let allComments = comment.comments;
    if(allComments.length == 0){
        commBlock.textContent = "There is no comments!"
    } else {
        if(flagForComment == false){
            for(let comm of allComments){
                commentList += `
                    <div class="comment">
                        <p class="comment-username">${comm.user.username} wrote:</p>
                        <p class="comment-body">${comm.body}</p>
                    </div>
                `;
            }
        } else {
            for(let comm of allComments){
                commentList += `
                    <div class="comment">
                        <p class="comment-username">${comm.user.username} wrote:</p>
                        <p class="comment-body">${comm.body}</p>
                    </div>
                `;
            }
            let commentWrapper = document.querySelector('.comments-wrapper');
            commentWrapper.innerHTML += `<input type="text"></input>`;
        }
        commBlock.innerHTML = commentList;
    }
}

