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
bookCardSection.classList.add('book-card-section');

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
    bookCard.classList.add('book-card');

    const bookTitle = document.createElement('p');
    bookTitle.textContent = book.title;
    bookTitle.classList.add('book-title');

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;
    bookAuthor.classList.add('book-author');

    const readStatus = document.createElement('p');
    readStatus.textContent = book.isRead ? 'Read' : 'Unread';
    readStatus.classList.add('read-status');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');

    const isReadButton = document.createElement('button');
    isReadButton.textContent = 'Read';
    isReadButton.classList.add('is-read-button');

    bookCard.id = book.id;


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