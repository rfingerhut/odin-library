const myLibrary = [];

function Book(title, author, id){
    this.title = title;
    this.author = author;
    this.id = id;
    this.isRead = false;
}

Book.prototype.toggleReadStatus = function(){
    (this.isRead) ? this.isRead = false : this.isRead = true;
};

const bookCardSection = document.getElementById('book-card-section');

function addBookToLibrary(title, author){
    //create a book based on arguments
    let uuid = crypto.randomUUID();

    const newBook = new Book(title, author, uuid);

    //store new book object into the array
    myLibrary.push(newBook);

    //update display after book has been added
    displayBook(newBook);
}

function displayBook(book){
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const readStatus = document.createElement('p');
    const removeButton = document.createElement('button');
    const isReadButton = document.createElement('button');

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    readStatus.textContent = book.isRead ? 'Read' : 'Unread';
    bookCard.id = book.id;

    removeButton.textContent = 'Remove';
    isReadButton.textContent = 'Read';

    bookCard.append(bookTitle, bookAuthor, readStatus, removeButton, isReadButton);
    bookCardSection.appendChild(bookCard);


    removeButton.addEventListener('click', () => {        
        // LOGIC
        const i = myLibrary.findIndex((el) => el.id == book.id)
        myLibrary.splice(i,1);

        // DOM
        displayLibrary();
    });

    isReadButton.addEventListener('click', () => {
        // LOGIC
        book.toggleReadStatus();

        // DOM
        readStatus.textContent = (!book.isRead) ? 'Unread' : 'Read';
        isReadButton.textContent = (!book.isRead) ? 'Read' : 'Unread';
    })
}

function displayLibrary(){
    bookCardSection.innerHTML = '';
    myLibrary.forEach(displayBook);
}

const addNewBookButton = document.getElementById('add-new-book-btn');
const dialog = document.querySelector("dialog");
const form = document.querySelector('form');


addNewBookButton.addEventListener("click", () => dialog.showModal());

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;

    addBookToLibrary(title, author);
    form.reset();
})

// On browser load
displayLibrary();