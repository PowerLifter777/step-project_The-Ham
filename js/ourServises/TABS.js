"use strict";

import { services } from "./serviseInfo.js";

export const TABS = () => {

    const tabsWrapper = document.body.querySelector('.service-menu__wrapper');
    const descriptionWrapper = document.body.querySelector('.service__content');

    loadTabs();
    loadTabsDescription();

    const tabsDescr = document.body.querySelectorAll('.service__item-description');
    const tabs = document.body.querySelector('.service__menu-list');

    tabs.addEventListener('mousedown', (e) => showTabContent(e));

    function loadTabs() {
        const list = document.createElement('ul');
        list.classList.add('service__menu-list', 'nav-menu');
        services.forEach(service => {
            list.insertAdjacentHTML('beforeend', `<li class="service__item" data-category="${service.name}">${service.name}</li>`);
        })
        tabsWrapper.append(list);
        const firstService = document.body.querySelector('.service__item');
        firstService.classList.add('active');
    }

    function loadTabsDescription() {
        services.forEach(service => {
            descriptionWrapper.insertAdjacentHTML('beforeend', `
                <div class="service__item-description" data-category="${service.name}">
                    <div class="service-item__image-wrapper">
                        <img src="${service.img}" alt="service.name-img" class="service__item-img">
                    </div>
                    <p>${service.description}</p>
                </div>`);
        })
        const firstDescr = document.body.querySelector('.service__item-description');
        firstDescr.classList.add('active');
    }

    const showTabContent = (e) => {
        [...tabs.children].forEach(tab => {
            if (tab === e.target && !tab.classList.contains('active')) {
                tab.classList.add("active");
                const tabCategory = tab.dataset['category'];
                tabsDescr.forEach(el => {
                    const tabContentCategory = el.dataset['category'];
                    if (tabContentCategory === tabCategory) {
                        el.classList.add('active');
                        const tabTextWrapper = el.querySelector('p');
                        const tabText = tabTextWrapper.textContent;
                        tabTextWrapper.innerText = '';
                        tabText.split('').forEach((letter, i) => setTimeout(() => tabTextWrapper.append(letter), 1 * i));
                    }
                    else el.classList.remove('active');
                });
            } else if (tab !== e.target) tab.classList.remove("active");
        });
    }

}