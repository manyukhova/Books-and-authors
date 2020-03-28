const form = document.querySelector('#book-form');
const bookInput = document.querySelector('#book');
const authorInput = document.querySelector('#author');
const filter = document.querySelector('#filter');
const bookList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-books');


loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getBooks);
    form.addEventListener('submit', addBook);
    bookList.addEventListener('click',removeBook);
    clearBtn.addEventListener('click', clearBooks)
}


function getBooks(){
    let books = bookListCreate();
    let authors = authorListCreate();
    var i = 0;
    books.forEach(book => {
        appendNewElement(book, authors[i])
        i++;
    });
}




function appendNewElement(book, author){
    const li = document.createElement('li');
    console.log(li);
    li.className='collection-item';
    li.appendChild(document.createTextNode(book));
    li.appendChild(document.createTextNode(": "));
    li.appendChild(document.createTextNode(author));
    
    const removeLink = document.createElement('a');
    removeLink.className='delete-item secondary-content';
    removeLink.innerHTML="Delete";
    li.appendChild(removeLink);
    bookList.appendChild(li);  
}


function addBook(event){
    if(bookInput.value===''){
        alert('Add a book!');
    }else if(authorInput.value===''){
        alert('Add an author!')
    }else{
       appendNewElement(bookInput.value, authorInput.value); 
       storeInLocalStorage(bookInput.value, authorInput.value);  
    }
    bookInput.value = "";
    authorInput.value="";
    event.preventDefault();   
}

function removeBook(event){
    if(event.target.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            event.target.parentElement.remove();
            removeFromLocalStorage(event.target.parentElement);
        }
    }
}

/*#############################################*/
function removeFromLocalStorage(bookAndAuthor){
    let books = bookListCreate();
    let authors = authorListCreate();
    books.forEach(function(book,index) {
        if(bookAndAuthor.textContent.slice(0,-1) === book){
            books.splice(index,1);
            authors.splice(index,1)
        }
    });
    localStorage.setItem('books',JSON.stringify(books));
    localStorage.setItem('authors',JSON.stringify(authors));
}
/*#############################################*/

function storeInLocalStorage(book, author){
    let books = bookListCreate();
    let authors = authorListCreate();
    books.push(book);
    authors.push(author);
    localStorage.setItem('books',JSON.stringify(books));
    localStorage.setItem('authors',JSON.stringify(authors));
}

function bookListCreate(){
    let books;
    if(localStorage.getItem('books')===null){
        books=[];
    }else{
        books=JSON.parse(localStorage.getItem('books'));
    }
    return books;
}

function authorListCreate(){
    let authors;
    if(localStorage.getItem('authors')===null){
        authors=[];
    }
    else{
        authors=JSON.parse(localStorage.getItem('authors'));
    }
    return authors;
}


function clearBooks(){
    while(bookList.firstChild){
        bookList.removeChild(bookList.firstChild);
    }

    clearBooksFromLocalStorage();
}


function clearBooksFromLocalStorage(){
    localStorage.clear();
}