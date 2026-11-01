const API_URL = "https://6adea6e14e88f1bba4a53a78.mockapi.io/books";

function validateBook(book) {
    if (!book.title || !book.author || !book.genre) {
        return "Title, author and genre are required.";
    }

    if (!Number.isInteger(book.year) || book.year < 1 || book.year > new Date().getFullYear()) {
        return "Please enter a valid publication year.";
    }

    if (!Number.isInteger(book.rating) || book.rating < 1 || book.rating > 5) {
        return "The rating must be an integer between 1 and 5.";
    }

    return "";
}

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

    const error = validateBook(newBook);

    if (error) {
        document.getElementById("errorMessage").textContent = error;
        return;
    }

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