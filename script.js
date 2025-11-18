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
}

// FOR TESTING //
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien');
addBookToLibrary('Pride and Prejudice', 'Jane Austen');

const body = document.getElementById('book-card-section');




function displayLibrary(){
    myLibrary.forEach((el) => {
        const bookCard = document.createElement('div');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');

        bookTitle.textContent = el.title;
        bookAuthor.textContent = el.author;
        bookCard.id = el.id;
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        body.appendChild(bookCard);
    });
}

displayLibrary();