"use strict";

export function addHoverLayout(e, gridItems) {
    const layout = e.target.parentNode.querySelector('.hover__layout');
    [...gridItems].forEach(itemLink => {
        if (e.target.parentNode === itemLink && layout === null) {
            const itemCategory = itemLink.dataset['category'];
            e.target.parentNode.insertAdjacentHTML('afterbegin', `
            <div class="hover__layout">
                <svg class="hover__layout-svg">
                    <use xlink:href="./img/icons/icons.svg#circles"></use>
                </svg>
                <p class="hover__layout-title">creative design</p>
                <p class="hover__layout-category">${itemCategory}</p>
            </div>`)
        }
    });
}

export function removeHoverLayout(arrOfParentNodes, className) {
    [...arrOfParentNodes].forEach(item => {
        const el = item.querySelector(`.${className}`);
        if (el) item.removeChild(el);
    })
}
