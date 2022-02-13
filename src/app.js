'use strict';

import './carousel.js';

const loadBooks = async function(){
    try {
        const cardsContainer = document.querySelector('.cards');
        const booksData = await fetch('http://localhost:3000/books');  
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