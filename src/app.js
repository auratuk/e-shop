'use strict';

import './carousel.js';

const loadBooks = async function(){
    try {
        const cardsContainer = document.querySelector('.cards');
        const booksData = await fetch('https://my-json-server.typicode.com/auratuk/e-shop/books');  
        const data = await booksData.json();

        const books = `
        ${data.map(book => {
            return `   
            <div class="card">
                <img src="${book.imgSrc}"/>
                <div class="book-details">
                    <h1 class="book-name"> ${book.name} </h1>
                    <h2 class="book-author"> ${book.author} </h2>
                </div>
            </div>
            `}).join('')}`;

        cardsContainer.insertAdjacentHTML('afterbegin', books);
    } catch (error) {
        alert(error);
    }
}

await loadBooks();

const loginContainer = document.querySelector(".login-wrapper");

document.querySelector(".login-btn").addEventListener("click", () =>{
    loginContainer.style.display = "block";
});

document.querySelector(".login-close-btn").addEventListener("click", () =>{
    loginContainer.style.display = "none";
});

window.addEventListener("click", (e) => {
    if(e.target === loginContainer){
        loginContainer.style.display = "none";
    }
})
