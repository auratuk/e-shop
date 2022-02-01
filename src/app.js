'use strict';

const carouselItems = document.querySelectorAll('.carousel-item');
const leftButton = document.querySelector('.carousel-btn-left');
const rightButton = document.querySelector('.carousel-btn-right');

carouselItems.forEach((carouselItem, index) => carouselItem.style.transform = `translateX(${100 * index}%)`);

let currentCarouselItem = 0;

rightButton.addEventListener('click', function() {
    if(currentCarouselItem === carouselItems.length - 1){
        currentCarouselItem = 0;
    } else {
        currentCarouselItem++;
    }

    carouselItems.forEach((carouselItem, index) => 
        carouselItem.style.transform = `translateX(${100 * (index - currentCarouselItem)}%)`);
});

leftButton.addEventListener('click', function() {
    if(currentCarouselItem === 0){
        currentCarouselItem = carouselItems.length - 1;
    } else {
        currentCarouselItem--;
    }

    carouselItems.forEach((carouselItem, index) => 
        carouselItem.style.transform = `translateX(${100 * (index - currentCarouselItem)}%)`);
});