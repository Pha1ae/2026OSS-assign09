const API_URL = "https://6adea6e14e88f1bba4a53a78.mockapi.io/books";

let allBooks = [];
let editingId = null;


// GET
async function loadBooks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        allBooks = await response.json();
        searchBooks();

        document.getElementById("errorMessage").textContent = "";
        return true;

    } catch (error) {
        console.error(error);
        document.getElementById("errorMessage").textContent = error.message;
        return false;
    }
}


// Search
function searchBooks() {
    const keyword = document.getElementById("searchInput").value;
    const cleanKeyword = keyword.trim().toLowerCase();

    const filteredBooks = allBooks.filter(book => {
        return book.title.toLowerCase().includes(cleanKeyword);
    });

    renderBooks(filteredBooks);
}


// Render
function renderBooks(books) {
    const list = document.getElementById("bookList");
    list.innerHTML = "";

    if (books.length === 0) {
        list.textContent = "No books found.";
        return;
    }

    books.forEach(book => {
        const li = document.createElement("li");
        li.textContent = `${book.title} - ${book.author} - ${book.genre} - ${book.year}`;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "btn btn-sm btn-primary";
        editButton.addEventListener("click", () => {
            editBook(book);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn btn-sm btn-danger";
        deleteButton.addEventListener("click", () => {
            deleteBook(book.id);
        });

        li.appendChild(deleteButton);
        li.appendChild(editButton);
        list.appendChild(li);
    });
}


// Prepare Update
function editBook(book) {
    editingId = book.id;

    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("genre").value = book.genre;
    document.getElementById("year").value = book.year;
    document.getElementById("rating").value = book.rating;

    document.querySelector('#bookForm button[type="submit"]')
        .textContent = "Update Book";
}


// Validation
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


// POST / PATCH
async function saveBook(newBook) {
    const method = editingId === null ? "POST" : "PATCH";

    const url = editingId === null
        ? API_URL
        : `${API_URL}/${editingId}`;

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await loadBooks();
}


// DELETE
async function deleteBook(id) {
    if (!confirm("Delete this book?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const refreshed = await loadBooks();

        if (editingId === id) {
            editingId = null;
            document.getElementById("bookForm").reset();

            document.querySelector('#bookForm button[type="submit"]')
                .textContent = "Add Book";
        }

        if (!refreshed) {
            document.getElementById("errorMessage").textContent =
                "Book deleted, but the list could not be refreshed.";
        }

    } catch (error) {
        console.error(error);
        document.getElementById("errorMessage").textContent = error.message;
    }
}


// Event Listeners
document.getElementById("searchInput")
    .addEventListener("input", searchBooks);

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
        const refreshed = await saveBook(newBook);

        event.target.reset();
        editingId = null;

        document.querySelector('#bookForm button[type="submit"]')
            .textContent = "Add Book";

        if (!refreshed) {
            document.getElementById("errorMessage").textContent =
                "Book saved, but the list could not be refreshed.";
        }

    } catch (error) {
        console.error(error);
        document.getElementById("errorMessage").textContent = error.message;
    }
});


// Initialization
loadBooks();
