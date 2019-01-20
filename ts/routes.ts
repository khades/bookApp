import { generatePath } from "react-router";

export const Books = "/books";

export const Book = "/books/:id";

export const toBook = (id: string) => generatePath(Book, { id });
