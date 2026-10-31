const API_URL = "https://6adea6e14e88f1bba4a53a78.mockapi.io/books";

document.getElementById("bookForm").addEventListener("submit", async (event) => {
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

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        await loadBooks();
        event.target.reset();

    } catch (error) {
        console.error(error);
        document.getElementById("errorMessage").textContent = error.message;
    }
});

function renderBooks(books) {
    const list = document.getElementById("bookList");
    list.innerHTML = "";

    books.forEach(book => {
        const li = document.createElement("li");
        li.textContent = `${book.title} - ${book.author} - ${book.genre} - ${book.year}`;
        list.appendChild(li);
    });
}

async function loadBooks() {
    try {
        const response = await fetch(API_URL);

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