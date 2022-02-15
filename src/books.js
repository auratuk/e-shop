(async function(){
    try {
        const main = document.querySelector('main');

        const cardWrapper = `
            <div class="cards-wrapper">
                <div class="cards"></div>
             </div>`;

        main.insertAdjacentHTML('afterend', cardWrapper);

        const cardsContainer = document.querySelector('.cards');
        const booksData = await fetch('https://my-json-server.typicode.com/auratuk/e-shop/books');  
        const data = await booksData.json();


        //TODO:
        //1. Remake using document.createElement
        //2. Try out date-set
        const books = `
        ${data.map(book => {
            return `   
            <div class="card">
                <button class="card-delete-btn">&times;</button>
                <img src="${book.imgSrc}"/>
                <div class="book-details">
                    <h1 class="book-name"> ${book.name} </h1>
                    <h2 class="book-author"> ${book.author} </h2>
                </div>
            </div>
            `}).join('')}`;

        cardsContainer.insertAdjacentHTML('afterbegin', books);

        const deleteButtons = document.querySelectorAll('.card-delete-btn'); 
        
        deleteButtons.forEach(function (item, index) {
            item.addEventListener('click', function (e) {
                const child = e.target.parentElement

                cardsContainer.removeChild(child);
            });
        });
    } catch (error) {
        alert(error);
    }
})();