const bookList = JSON.parse(sessionStorage.getItem('booklist')) || [];

function newBook() {
    const bookname = document.querySelector('#book-name').value;
    const authorname = document.querySelector('#author-name').value;
    const readbook = document.querySelector('#read-book').checked;
    const date = new Date().toDateString();
    

    return {
        bookname,
        authorname,
        readbook,
        date
    };
}

function addBook() {
    const book = newBook();
    
    if(book.bookname == "" || book.authorname == "") {
        alert("Preencha todos os campos antes de adicionar um livro!");
        return;
    }
    
    bookList.push(book);
    sessionStorage.setItem('booklist', JSON.stringify(bookList));
    renderBookList();
}

function readBookChange(input) {
    input.addEventListener('change', (event) => {
        const input = event.target;
        const index = event.target.id;

        if(input.checked)
            bookList[index].readbook = true;
        else
            bookList[index].readbook = false;

        sessionStorage.setItem('booklist', JSON.stringify(bookList));
        renderBookList();
    })
}

function renderBookList() {

    const libContent = document.querySelector('#library-content');
    libContent.innerHTML = "";

    bookList.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        const deleteBook = document.createElement('button');

        deleteBook.type = "button";
        deleteBook.id = index;
        deleteBook.innerText = "X";
        deleteBook.classList.add('delete-book');

        deleteBook.onclick = (e) => {
            const id = e.target.id;
            bookList.splice(id, 1);
            sessionStorage.setItem('booklist', JSON.stringify(bookList));
            renderBookList();
        }

        const span1 = document.createElement('span');
        const bookname = document.createElement('h3');

        const span2 = document.createElement('span');
        const authorname = document.createElement('h3');

        const span3 = document.createElement('span');
        const date = document.createElement('h3');

        const span4 = document.createElement('span');
        const readbook = document.createElement('input');

        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        const div4 = document.createElement('div');

        span1.innerText = "Nome do livro";
        span1.classList.add("span-section");
        bookname.innerText = book.bookname;
        bookname.classList.add("h3-section");
        div1.appendChild(span1);
        div1.appendChild(bookname);

        span2.innerText = "Nome do(a) autor(a)";
        span2.classList.add("span-section");
        authorname.innerText = book.authorname;
        authorname.classList.add("h3-section");
        div2.appendChild(span2);
        div2.appendChild(authorname);

        span3.innerText = "Adicionado em";
        span3.classList.add("span-section");
        date.innerText = book.date;
        date.classList.add("h3-section");
        div3.appendChild(span3);
        div3.appendChild(date);

        span4.innerText = "Leitura concluída";
        span4.classList.add("span-section");
        readbook.type = 'checkbox';
        readbook.checked = book.readbook;
        readbook.id = index;
        div4.appendChild(span4);
        div4.appendChild(readbook);
        readBookChange(readbook);

        bookDiv.classList.add('book-div');

        bookDiv.appendChild(div1);
        bookDiv.appendChild(div2);
        bookDiv.appendChild(div3);
        bookDiv.appendChild(div4);
        bookDiv.appendChild(deleteBook);

        libContent.appendChild(bookDiv);
    });
}

renderBookList();