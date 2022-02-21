'use strict';

import { deleteBook, updateBook, getBooks, createBook } from './bookService.js';

(async function initBookShop() {
    try{
        const main = document.querySelector('main');
        const cardWrapper = `<div class="cards-wrapper">
            <div class="cards"></div>
        </div>`;

        main.insertAdjacentHTML('afterend', cardWrapper);

        await loadBooks();
    } catch (error) {
        alert(error);
    }
})();

async function loadBooks(){
    const cardsContainer = document.querySelector('.cards');
    const books = await getBooks()
    const data = await books.json();

    await createNewCard(cardsContainer);

    data.forEach(book => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = formStandartBookCardHtml(book);

        cardsContainer.appendChild(card);

        deleteCard(card, book.id, cardsContainer);
        updateCard(card, book.id);
    });    
};

async function createNewCard(cardsContainer) {
    let card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML=`<div class="new-card">
            <h1>+</h1>
        </div>`;

    cardsContainer.appendChild(card);

    card.addEventListener('click', function () {
        let newCard = document.createElement('div');
        newCard.classList.add('card');

        newCard.innerHTML=`<div class="editable-card">
            <h1>Create a book</h1>
            <input id="img-src" type="text" placeholder="Image link..."/>
            <input id="author-name" type="text" placeholder="Author name..."/>
            <input id="book-name" type="text" placeholder="Book name..."/>
            <button id="save-btn">Save me, please</button>
        </div>`;

        card.after(newCard);

        newCard.querySelector("#save-btn").addEventListener('click', async () => {
            let guid = crypto.randomUUID();

            const book = {
                id: guid,
                imgSrc: newCard.querySelector("#img-src").value,
                name: newCard.querySelector("#book-name").value,
                author: newCard.querySelector("#author-name").value
            }
            
            await createBook(book);
            newCard.innerHTML = formStandartBookCardHtml(book);
            deleteCard(newCard, guid, cardsContainer);
            updateCard(newCard, guid);
        });
    });
}

function updateCard(card, bookId) {
    card.querySelector('#edit-card-btn').addEventListener('click', function() {
        card.innerHTML=`<div class="editable-card">
            <h1>Edit a book</h1>
            <input id="img-src" type="text" placeholder="Image link..." value="${card.querySelector("#img-src").src}"/>
            <input id="author-name" type="text" placeholder="Author name..." value="${card.querySelector("#author-name").innerText}"/>
            <input id="book-name" type="text" placeholder="Book name..." value="${card.querySelector("#book-name").innerText}"/>
            <button id="save-btn">Save me, please</button>
        </div>`;

        card.querySelector('#save-btn').addEventListener('click', async function() {
            const bookToUpdate = {
                id: bookId,
                imgSrc: card.querySelector("#img-src").value,
                name: card.querySelector("#book-name").value,
                author: card.querySelector("#author-name").value
            }

            await updateBook(bookToUpdate);
            
            card.innerHTML= formStandartBookCardHtml(bookToUpdate);
        });
    });  
}

function formStandartBookCardHtml(book){
    return `<button class="card-delete-btn">&times;</button>
    <button id="edit-card-btn"><img src="res/edit-button.svg"></button>
    <img id="img-src" src="${book.imgSrc}"/>
    <div class="book-details">
        <h1 id="book-name" class="book-name"> ${book.name} </h1>
        <h2 id="author-name" class="book-author"> ${book.author} </h2>
    </div>`;
}

function deleteCard(card, id, cardsContainer) {
    card.querySelector('.card-delete-btn').addEventListener('click', async function () {
        await deleteBook(id);
        cardsContainer.removeChild(card);
    });
}
