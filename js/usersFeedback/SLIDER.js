import { users } from "./users.js";

export const SLIDER = () => {

    const fotoWrapper = document.body.querySelector('.slider-foto__wrapper');
    const infoWrapper = document.body.querySelector('.user-info__wrapper');
    const nextBtn = document.body.querySelector('.slider__control--next');
    const prevBtn = document.body.querySelector('.slider__control--prev');
    const slider = document.body.querySelector('.feedback-slider__wrapper');

    nextBtn.addEventListener('click', () => showNext());
    prevBtn.addEventListener('click', () => showPrev());

    slider.addEventListener('mouseover', () => autoPreview('stop'));
    slider.addEventListener('mouseleave', () => autoPreview('start'));

    loadSliderContent();
    addUserFeedback(users[0]);

    const images = document.body.querySelectorAll('.feedback-slider__item');
    const sliderItemsWrapper = document.body.querySelector('.feedback-slider__items');

    sliderItemsWrapper.addEventListener('click', (e) => selectUserFeedback(e));
    prevBtn.classList.add('hide');

    const deltaPx = 100
    const visibleImg = 4
    const maxDeltaPx = (images.length - visibleImg) * -deltaPx;

    function showPrev() {
        disableBtn(prevBtn);
        nextBtn.classList.remove('hide');
        moveSlider(deltaPx);
        images[0].style.left.slice(0, -2) === '0' && prevBtn.classList.add('hide');
        setTimeout(() => setActiveBtn(prevBtn), 800);
    }

    function showNext() {
        disableBtn(nextBtn);
        prevBtn.classList.remove('hide');
        moveSlider(-deltaPx);
        images[0].style.left.slice(0, -2) === `${maxDeltaPx}` && nextBtn.classList.add('hide');
        setTimeout(() => setActiveBtn(nextBtn), 800);
    };

    function shakeHorizontal() {
        images.forEach(img => {
            const currentPosition = +img.style.left.slice(0, -2);

            return img.animate([
                { left: `${currentPosition - 12}px` },
                { left: `${currentPosition + 9}px` },
                { left: `${currentPosition - 6}px` },
                { left: `${currentPosition + 4}px` },
                { left: `${currentPosition - 2}px` },
                { left: `${currentPosition + 1}px` },
            ], {
                timingFunction: 'ease-out',
                duration: 300,
                delay: 450,
            })
        })
    }

    function moveSlider(value) {
        images.forEach(img => img.style.left = `${+img.style.left.slice(0, -2) + value}px`)
        shakeHorizontal();
    }

    function disableBtn(btn) {
        btn.classList.add('disabled');
        btn.setAttribute('disabled', true);
    };

    function setActiveBtn(btn) {
        btn.classList.remove('disabled');
        btn.removeAttribute('disabled');
    };

    function loadSliderContent() {
        const list = document.createElement('ul');
        list.classList.add('feedback-slider__items');
        users.forEach(user => {
            list.insertAdjacentHTML('beforeend', `
            <li class="feedback-slider__item" style="left: 0" data-user="${user.name}">
                <img src=${user.photo} alt="${user.name} photo">
            </li>
            `)
        })
        fotoWrapper.append(list);
    }

    function addUserFeedback(user) {
        infoWrapper.innerHTML = `
        <div class="user-info__inner">
            <p class="user-feedback__post">${user.quote}</p>
            <div class="user__info">
                <p class="user__name">${user.name}</p>
                <p class="user__proffesion">${user.role}</p>
            </div>
            <img src=${user.photo} alt="user__photo" class="user__photo active">
        </div>`
    }

    function selectUserFeedback(e) {
        const target = e.target.closest('.feedback-slider__item');
        const dataName = target !== null && target.dataset['user'];
        images.forEach(img => e.target.parentNode === img ? img.classList.add('selected') : img.classList.remove('selected'))
        users.forEach(user => user.name === dataName && addUserFeedback(user));
    }

    let move;
    let moveRight = true;
    function autoPreview(action) {
        if (action === 'start') {
            move = setInterval(() => {
                if (!nextBtn.classList.contains('hide') && moveRight) {
                    showNext();
                } else if (!prevBtn.classList.contains('hide')) {
                    moveRight = false;
                    showPrev();
                } else {
                    showNext();
                    moveRight = true;
                }
            }, 2500);
        } else if (action === 'stop') clearInterval(move);
    }
    autoPreview('start');
}