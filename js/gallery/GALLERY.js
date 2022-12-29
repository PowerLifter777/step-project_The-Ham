import { galleryImages } from "./images.js";

export const GALLERY = () => {

    const section = document.body.querySelector('.gallery__wrapper');
    const imgWrappers = section.querySelectorAll('.gallery__item');
    const btnLoad = section.querySelector('.gallery__btn');

    btnLoad.addEventListener('click', () => showMore(2));
    const loader = section.querySelector('.triple-spinner');

    function loadImages(imgArr) {
        [...imgWrappers].forEach((el, i) => !!imgArr[i] && el.insertAdjacentHTML('beforeend', `
        <a href="${imgArr[i].path}" target="_blank">
        <img src="${imgArr[i].path}" alt="picture-${i}">
        </a> 
        `))
        checkLoadBtn(galleryImages);
    }

    const clon1 = section.cloneNode(true);
    const galleryColumns = section.querySelectorAll('.column');
    loadImages(galleryImages);

    function loadMore(clicks = 0, amount = 18) {
        const clon2 = clon1.cloneNode(true);
        const cloneImgWrappers = clon2.querySelectorAll('.gallery__item');

        const minInd = clicks * amount;
        const maxInd = (clicks + 1) * amount;
        let arr = [...galleryImages].slice(minInd, maxInd);
        arr.forEach((img, i) => {
            cloneImgWrappers[i].innerHTML = `<a href="${img.path}" target="_blank"><img src="${img.path}" alt="picture-${i + minInd}"></a>`;
        });

        [...cloneImgWrappers].forEach(el => !el.innerHTML && el.remove());
        let imgBlocks = clon2.querySelectorAll('.img-block');

        imgBlocks = [...imgBlocks].filter(block => !!block.children.length);
        imgBlocks = [...imgBlocks].sort(() => Math.random() - 0.5);

        let j = 0;
        imgBlocks.forEach((block, i) => {
            setTimeout(() => {
                if (j < galleryColumns.length) {
                    galleryColumns[j].append(block.cloneNode(true));
                    j++;
                } else {
                    j = 0;
                    galleryColumns[j].append(block.cloneNode(true));
                    j++;
                }
            }, 100 * i);
        })
        checkLoadBtn(galleryImages, maxInd);
    }

    let count = 1;
    function showMore(max) {
        loader.classList.add('active');
        btnLoad.classList.add('hide');
        setTimeout(() => {
            if (count < max) {
                loadMore(count);
                loader.classList.remove('active');
                count++;
            } else if (count === max) {
                loadMore(count);
                loader.classList.remove('active');
                checkLoadBtn([], max);
                count++
            }
        }, 1000)
    }

    function checkLoadBtn(arr, maxItems = 18) {
        arr.length < maxItems ? btnLoad.classList.add('hide') : btnLoad.classList.remove('hide');
    }














}


// ourWork.forEach((_, i) => ourWork.forEach((_, j) => arr.push(ourWork[j]['images'][i])))