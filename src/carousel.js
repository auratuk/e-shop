'use strict';

const carouselItems = document.querySelectorAll('.carousel-item');
const leftButton = document.querySelector('.carousel-btn-left');
const rightButton = document.querySelector('.carousel-btn-right');

let currentCarouselItem = 0;

export const initCarousel = () => {
    transformSlides();
}

export const addEventListenerCarouselRight = rightButton.addEventListener('click', function() {
    if(currentCarouselItem === carouselItems.length - 1){
        currentCarouselItem = 0;
    } else {
        currentCarouselItem++;
    }

    transformSlides();
});

export const addEventListenerCarouselLeft = leftButton.addEventListener('click', function() {
    if(currentCarouselItem === 0){
        currentCarouselItem = carouselItems.length - 1;
    } else {
        currentCarouselItem--;
    }

    transformSlides();
});

function transformSlides() {
    carouselItems.forEach((carouselItem, index) => {
        carouselItem.classList.remove('carousel-item--visible');
        carouselItem.classList.add('carousel-item--hidden');

        carouselItem.style.transform = `translateX(${100 * (index - currentCarouselItem)}%)`;
    });

    carouselItems[currentCarouselItem].classList.add('carousel-item--visible');
}