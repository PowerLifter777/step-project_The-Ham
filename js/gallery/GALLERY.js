import { galleryImages } from "./images.js";

export const GALLERY = () => {

    const imgWrappers = document.body.querySelectorAll('.gallery__item');

    const loadValue = 18;
    function loadImages(loadValue) {
        [...imgWrappers].forEach((el, i) => !!galleryImages[i] && el.insertAdjacentHTML('beforeend', `
            <a href="${galleryImages[i].path}" target="_blank">
                <img src="${galleryImages[i].path}" alt="picture-${i}">
            </a> 
        `))
    }

    loadImages();
}


// ourWork.forEach((_, i) => ourWork.forEach((_, j) => arr.push(ourWork[j]['images'][i])))