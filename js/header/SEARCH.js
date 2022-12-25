"use strict";

export const SEARCH = () => {


    const navbar = document.body.querySelector('.navbar__wrapper');

    addSearchToPage();

    const serchIcon = document.body.querySelector('.search-svg');
    const search = document.body.querySelector('.header__search');

    window.addEventListener("click", (e) => outsideClick(e));
    serchIcon.addEventListener('click', (e) => showSearchField(e));

    function addSearchToPage() {
        navbar.insertAdjacentHTML("beforeend", `
        <form action="#" class="header__search">
            <svg class="search-svg">
                <use xlink:href="./img/icons/icons.svg#search"></use>
            </svg>
            <div class="input__wrapper">
                <input class="search__input" type="text">
            </div>
        </form>`)
    }


    const showSearchField = () => search.classList.toggle("active");

    const outsideClick = (e) => {
        e.target.closest(".header__search") === null && search.classList.contains('active') && search.classList.remove("active");
    }
}

