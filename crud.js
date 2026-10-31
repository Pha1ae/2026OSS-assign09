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