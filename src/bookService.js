'use strict';

const URL = 'http://localhost:3000/books/';

export async function getBooks(){
    return await fetch(URL);
}

export async function deleteBook(id){
    await fetch(URL + id, {method: 'DELETE'}); 
}

export async function updateBook(data){
    await fetch(URL + data.id, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

export async function createBook(data){
    await fetch(URL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }); 
}