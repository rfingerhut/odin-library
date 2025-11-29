const myLibrary = [];

function Book(title, author, id){
    this.title = title;
    this.author = author;
    this.id = id;
    this.isRead = false;
}

Book.prototype.toggleReadStatus = function(){
    this.isRead = !this.isRead; 
    updateProgressBar();
};

const booksRead = document.getElementById('num-books-read');
const totalBooks = document.getElementById('total-books');
const addNewBookButton = document.getElementById('add-new-book-btn');

const bookCardSection = document.getElementById('book-card-section');

const dialog = document.querySelector("dialog");
const form = document.querySelector('form');
const closeButton = document.getElementById('close-button');

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
    //create a book based on arguments
    let uuid = crypto.randomUUID();

    const newBook = new Book(title, author, uuid);

    //store new book object into the array
    myLibrary.push(newBook);
    updateProgressBar();


    //update display after book has been added
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
    (book.isRead) ? isReadButton.textContent = 'Read' : isReadButton.textContent = 'Unread';
    
    isReadButton.classList.add('is-read-button');
    buttonContainer.appendChild(isReadButton);

    bookCard.id = book.id;


    bookCard.append(bookInfoContainer, removeButton, buttonContainer);
    bookCardSection.appendChild(bookCard);

    removeButton.addEventListener('click', () => {        
        // LOGIC
        const i = myLibrary.findIndex((el) => el.id == book.id)
        myLibrary.splice(i,1);

        // DOM
        updateProgressBar();
        displayLibrary();
    });

    isReadButton.addEventListener('click', () => {
        // LOGIC
        book.toggleReadStatus();

        isReadButton.textContent = (!book.isRead) ? 'Unread' : 'Read';
    })
}


function updateProgressBar(){
    let readBooks = myLibrary.filter((book) => book.isRead == true).length;
    let total = myLibrary.length;
    booksRead.textContent =  `${readBooks}`;   
    totalBooks.textContent = `/${total}`;

}

function displayLibrary(){
    bookCardSection.innerHTML = '';
    myLibrary.forEach(displayBook);
    updateProgressBar();
}

// On browser load
displayLibrary();