import { posts } from "./data.js";

export const NEWS = () => {

    const section = document.body.querySelector('.section__breaking-news');
    const content = section.querySelector('.breaking-news__content');
    const postWrappers = section.querySelectorAll('.breaking-news__post');

    (function loadPosts() {
        posts.forEach((post, i) => {
            if (!!postWrappers[i]) {
                postWrappers[i].innerHTML = createPost(post);
            } else {
                const postWrapper = document.createElement('div');
                postWrapper.classList.add('breaking-news__post');
                postWrapper.innerHTML = createPost(post);
                content.append(postWrapper);
            }
        })
    })()

    function createPost(data) {

        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        return `
            <a href="${data.link}" target="_blank" class="post__link">
                <div class="post__date">
                    <p class="date__number">${data.date.slice(0, 2)}</p>
                    <p class="date__month">${month[data.date.slice(3, 5) - 1]}</p>
                </div>
                <div class="img__wrapper">
                    <img src="${data.img}" alt="post-image" class="post__img">
                </div>
                <h3 class="post__name">${data.name}</h3>
            </a>
            <div class="post__info">
                <span class="post__author">By ${data.author}</span>
                <span class="post__comment">${data.commentsCount} comments</span>
            </div>`
    }
}