# Book Management

A simple book management website using HTML, Bootstrap, and Vanilla JavaScript. Book data is stored in MockAPI and accessed through the Fetch API.

## Deployment

- Github: https://github.com/Pha1ae/2026OSS-assign09
- Vercel: https://2026-oss-assign09-rosy.vercel.app/
- MockAPI Endpoint: https://6adea6e14e88f1bba4a53a78.mockapi.io/books

## Service

The service manages books with six fields: `id`, `title`, `author`, `genre`, `year`, and `rating`.

- **GET:** Load and display books from MockAPI.
- **POST:** Add a new book through the form.
- **PATCH:** Edit an existing book using the same form.
- **DELETE:** Delete a book after confirmation.
- **Search:** Filter books by title.
- **Validation:** Check required text fields, publication year, and rating (integer from 1 to 5) for both adding and editing.

## Key Learning

1. `fetch()` sends HTTP requests using GET, POST, PATCH, and DELETE.
2. `async/await`, `response.ok`, and `try/catch` help handle asynchronous requests and errors.
3. `response.json()` converts API responses into JavaScript data, which can be displayed using DOM methods.

## AI / Search Usage

I used AI to outline the logic and structure of the code, as well as to organize and reorder the final codebase. Additionally, I handled extensive debugging during development. Overall, the AI utilization rate was approximately 30%.

## Problem & Solution / Reflection

I had problems with variable scope and accidentally made `loadBooks()` call itself repeatedly. I corrected the variable references and restored the GET response processing. I also learned that POST and PATCH can share a function while using different HTTP methods and URLs. This assignment helped me understand how CRUD works with server-side data instead of only a local array.