import { addHoverLayout, removeHoverLayout } from "./hoverLayout.js";
import { ourWork } from "./workPhotos.js";

export const PORTFOLIO = () => {

    const tabsWrapper = document.body.querySelector('.tabs__wrapper');

    loadTabsToPage();

    const section = document.body.querySelector('.work-example__wrapper');
    const gridItemsWrapper = section.querySelector('.work-example__items');
    const btnLoad = section.querySelector('.work-example__btn');
    const tabsList = section.querySelector('.work-example__menu-list');
    const loader = section.querySelector('.triple-spinner');

    tabsList.addEventListener('click', (e) => tabActivation(e));
    btnLoad.addEventListener('click', () => showMore(2));

    let filteredArr = filterImgByCategory();
    loadImagesToPage(filteredArr);

    let gridItems;
    section.addEventListener('mouseover', (e) => {
        gridItems = section.querySelectorAll('.work-example__link');
        addHoverLayout(e, gridItems)
    })

    function filterImgByCategory(category = 'All') {
        let arr = [];
        // ourWork.forEach((_, i) => ourWork.forEach((_, j) => arr.push(ourWork[j]['images'][i])))
        if (category !== "All") arr = ourWork.filter(work => work.category === category);
        else arr = [...ourWork];
        arr.sort(() => Math.random() - 0.5);
        return arr;
    }

    function loadTabsToPage(displayMax = 5) {
        let tabsCategories = ["All"];
        ourWork.forEach(el => !tabsCategories.find(a => a === el.category) && tabsCategories.push(el.category))
        let count = 0;
        const list = document.createElement('ul');
        list.classList.add('work-example__menu-list', 'nav-menu');
        if (count < displayMax) {
            tabsCategories.forEach(tab => {
                list.insertAdjacentHTML('beforeend', `<li class="work-example__menu-item" data-category="${tab}">${tab}</li>`);
                count++;
            })
        }
        tabsWrapper.append(list);
        const firstTab = document.body.querySelector('.work-example__menu-item');
        firstTab.classList.add('active');
    }

    function loadImagesToPage(arr, displayMax = 12) {
        let count = 0;
        arr.forEach(work => {
            if (count < displayMax) {
                gridItemsWrapper.insertAdjacentHTML('beforeend', `
                    <a href="${work.imgPath}" target="_blank" class="work-example__link" data-category="${work.category}">
                        <img src="${work.imgPath}" alt="our-work" class="work-example__img">
                    </a>`)
                count++;
            }
        })
    }
    
    function tabActivation(e) {
        [...tabsList.children].forEach(tab => {
            if (tab === e.target && !tab.classList.contains('active')) {
                tab.classList.add("active");
                const tabCategory = tab.dataset[`category`];
                filteredArr = filterImgByCategory(tabCategory);
                gridItemsWrapper.innerHTML = "";
                removeHoverLayout(gridItems, 'hover__layout');
                displayItems();
                checkLoadBtn(filteredArr);
                count = 1;
            } else if (tab !== e.target) tab.classList.remove("active");
        });
    }
    
    function displayItems(clicks = 0, amount = 12) {
        const minInd = clicks * amount;
        const maxInd = (clicks + 1) * amount;
        filteredArr.slice(minInd, maxInd).forEach((el, i) => setTimeout(() => loadImagesToPage([el]), 50 * i));
        checkLoadBtn(filteredArr, maxInd);
    }
    
    let count = 1;
    function showMore(max) {
        loader.classList.add('active');
        btnLoad.classList.add('hide');
        setTimeout(() => {
            if (count < max) {
                displayItems(count);
                loader.classList.remove('active');
                count++;
            } else if (count === max) {
                displayItems(count);
                loader.classList.remove('active');
                checkLoadBtn([], max);
                count++
            }
        }, 2000)
    }
    
    function checkLoadBtn(arr, maxItems = 12) {
        arr.length <= maxItems ? btnLoad.classList.add('hide') : btnLoad.classList.remove('hide');
    }
}
















