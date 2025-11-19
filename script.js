const myLibrary = [];

function Book(title, author, id){
    this.title = title;
    this.author = author;
    this.id = id;
    this.isRead = false;
}

Book.prototype.isRead = function(){
    (this.isRead == true) ? this.isRead = false : this.isRead = true
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
    bookCard.id = book.id;
    removeButton.textContent = 'Remove';
    isReadButton.textContent = 'Read';

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(isReadButton);
    bookCardSection.appendChild(bookCard);

    removeButton.addEventListener('click', () => {
        bookCard.remove();
        let i = myLibrary.findIndex((el) => el.id == book.id)
        myLibrary.splice(i,1);
    });

    isReadButton.addEventListener('click', () => {
        book.isRead;
        readStatus.textContent = "I read this!";
        bookCard.appendChild(readStatus);
        isReadButton.remove();
    })
}

function displayLibrary(){
    bookCardSection.innerHTML = '';

    myLibrary.forEach((el) => {
        displayBook(el);
    });
}

const addNewBookButton = document.getElementById('add-new-book-btn');
const dialog = document.querySelector("dialog");
const form = document.querySelector('form');


addNewBookButton.addEventListener("click", () => dialog.show());

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;

    addBookToLibrary(title, author);
    form.reset();
})

// On browser load
displayLibrary();