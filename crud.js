document.getElementById("bookForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const year = Number(document.getElementById("year").value);
    const rating = Number(document.getElementById("rating").value);

    const newBook = {
        title,
        author,
        genre,
        year,
        rating
    };

    console.log(newBook);
});

function renderBooks(books) {
    const list = document.getElementById("bookList");
    list.innerHTML = "";

    books.forEach(book => {
        const li = document.createElement("li");
        li.textContent = `${book.title} - ${book.author} - ${book.grene} - ${book.year}`;
        list.appendChild(li);
    });
}

async function loadBooks() {
    try {
        const response = await fetch(
            "https://6adea6e14e88f1bba4a53a78.mockapi.io/books"
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const books = await response.json();

        renderBooks(books);

        document.getElementById("errorMessage").textContent = "";

    } catch (error) {
        console.error(error);
        document.getElementById("errorMessage").textContent = error.message;
    }
}

loadBooks();