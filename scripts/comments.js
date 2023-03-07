"use strict";

function getComments(product){
    fetch('https://dummyjson.com/comments/post/' + product.id)
    .then(res => res.json())
    .then(json => drawComments(json));
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
            let imageSrc = getPhotoUser(comm.user.id);
            commentList += `
                <div class="comment">
                    <img src="${imageSrc}" class="user-photo-comm">
                    <div>
                    <p class="comment-username">${comm.user.username}</p>
                    <p class="comment-body">${comm.body}</p>
                    </div>
                </div>
            `;
        }
        if(flagForComment == true){
            addCommentBlock.style.display = "flex";
        } else {
            addCommentBlock.style.display = "none";
        }
        commBlock.innerHTML = commentList;
    }
}

function getPhotoUser(userId){
    let src = '';
    fetch('https://dummyjson.com/users/' + userId)
    .then(res => res.json())
    .then(src = (data) => addPhotoUser(data)); 
    console.log(src);
}

function addPhotoUser(user){
    return user.image;
}

