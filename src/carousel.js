'use strict';

const loadCarousel = async function(){
    try {
        const main = document.querySelector('main');

        const carouselWrapper = `
            <div class="carousel-wrapper">
                <div class="carousel">
                    <div class="carousel-buttons hide">
                        <button class="carousel-btn carousel-btn-left">&larr;</button>
                        <button class="carousel-btn carousel-btn-right">&rarr;</button>
                    </div>
                </div>
            </div>`;

        main.insertAdjacentHTML('afterbegin', carouselWrapper);

        const carouselContainer = document.querySelector('.carousel');
        const carouselData = await fetch('https://my-json-server.typicode.com/auratuk/e-shop/carousel');  
        const data = await carouselData.json();

        const carouselItems = `
        ${data.map(carouselItem => {
            return `   
            <a href="${carouselItem.redirectUrl}" target="_blank">
                <div class="carousel-item">
                    <img src="${carouselItem.imgSrc}" />
                    <h1>${carouselItem.desc}</h1>
                </div>
            </a>
            `
        }).join('')}`;

        carouselContainer.insertAdjacentHTML('afterbegin', carouselItems);

    } catch (error) {
        alert(error);
    }
}

const initCarousel = function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const leftButton = document.querySelector('.carousel-btn-left');
    const rightButton = document.querySelector('.carousel-btn-right');

    let currentCarouselItem = 0;
    transformSlides();

    rightButton.addEventListener('click', function() {
        if(currentCarouselItem === carouselItems.length - 1){
            currentCarouselItem = 0;
        } else {
            currentCarouselItem++;
        }
    
        transformSlides();
    });
    
    leftButton.addEventListener('click', function() {
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
}

await loadCarousel();
initCarousel();
