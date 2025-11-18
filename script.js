const myLibrary = [];

function Book(title, author, id){
    this.title = title;
    this.author = author;
    this.id = id;
}

function addBookToLibrary(title, author){
    //create a book based on arguments
    let uuid = crypto.randomUUID();

    const newBook = new Book(title, author, uuid);

    //store new book object into the array
    myLibrary.push(newBook);

    //update display after book has been added
    displayBook(newBook);
}

const bookCardSection = document.getElementById('book-card-section');

function displayBook(book){
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookCard.id = book.id;
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCardSection.appendChild(bookCard);

}

function displayLibrary(){
    bookCardSection.innerHTML = '';

    myLibrary.forEach((el) => {
        const bookCard = document.createElement('div');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');

        bookTitle.textContent = el.title;
        bookAuthor.textContent = el.author;
        bookCard.id = el.id;
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCardSection.appendChild(bookCard);
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