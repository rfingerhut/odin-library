class Library{
    constructor(){
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(id){
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1){
            this.books.splice(index, 1);
        }
    }

    getReadCount(){
        return this.books.filter(book => book.isRead).length;
    }

    toggleReadStatus(id){
        const book = this.books.find(book => book.id === id);
        if (book){
            book.toggleReadStatus();
        }
    }
}

class Book{
    constructor(title, author, id){
        this.title = title;
        this.author = author;
        this.id = id;
        this.isRead = false;
    }
    toggleReadStatus(){
        this.isRead = !this.isRead;
    }
}

const myLibrary = new Library();

const booksRead = document.getElementById('num-books-read');
const totalBooks = document.getElementById('total-books');
const addNewBookButton = document.getElementById('add-new-book-btn');

const bookCardSection = document.getElementById('book-card-section');

const dialog = document.querySelector("dialog");
const form = document.querySelector('form');
const closeButton = document.getElementById('close-button');

const progressBarFill = document.getElementById('progress-bar-fill');

addNewBookButton.addEventListener('click', () => {dialog.showModal()});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;

    addBookToLibrary(title, author);
    form.reset();
})

closeButton.addEventListener('click', () => dialog.close());

function addBookToLibrary(title, author){
    let uuid = crypto.randomUUID();
    const newBook = new Book(title, author, uuid);
    myLibrary.addBook(newBook);

    updateProgressBar();
    displayBook(newBook);
}

function displayBook(book){
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    const bookInfoContainer = document.createElement('div');
    bookInfoContainer.classList.add('book-info-container')

    const bookTitle = document.createElement('p');
    bookTitle.textContent = book.title;
    bookTitle.classList.add('book-title');

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;
    bookAuthor.classList.add('book-author');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'x';
    removeButton.classList.add('remove-button');

    bookInfoContainer.append(bookTitle, bookAuthor);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const isReadButton = document.createElement('button');
    isReadButton.classList.add('read-button');
    (book.isRead) ? isReadButton.textContent = 'Read' : isReadButton.textContent = 'Unread';
    
    isReadButton.classList.add('is-read-button');
    buttonContainer.appendChild(isReadButton);

    bookCard.id = book.id;


    bookCard.append(bookInfoContainer, removeButton, buttonContainer);
    bookCardSection.appendChild(bookCard);

    removeButton.addEventListener('click', () => {        
        myLibrary.removeBook(book.id);

        updateProgressBar();
        displayLibrary();
    });

    isReadButton.addEventListener('click', () => {
        myLibrary.toggleReadStatus(book.id);

        isReadButton.textContent = (!book.isRead) ? 'Unread' : 'Read';
        updateProgressBar();
    })
}

function updateProgressBar(){
    let readBooks = myLibrary.getReadCount();
    let total = myLibrary.books.length;
    let percent;
    booksRead.textContent =  `${readBooks}`;   
    totalBooks.textContent = `/${total}`;

    (total == 0 && readBooks == 0) ? percent = 0 : percent = readBooks/total*100;

    progressBarFill.style.width = `${percent}%`;
}

function displayLibrary(){
    bookCardSection.innerHTML = '';
    myLibrary.books.forEach(displayBook);
    updateProgressBar();
}

displayLibrary();