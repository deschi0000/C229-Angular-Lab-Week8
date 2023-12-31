import { Injectable } from "@angular/core";
import { Book } from "./book.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class BookRepository
{
    private books: Book[] = [];
    // private books: Book[] = new Array<Book>();
    private authors: string[] = [];

    constructor( private dataSource: StaticDataSource )
    {
        dataSource.getBooks().subscribe(data => {
            this.books = data;
            // this.authors = data.map(b => b.author)
            this.authors = data.map(b => b.author!)
                .filter((a, index, array) => array.indexOf(a) === index).sort();
        })
    }

    // getBooks(author: string = null): Book[]
    getBooks(author: string | null = null): Book[]
    {
        return this.books
            .filter(b => author == null || author === b.author);
    }

    // getBook(id: number): Book
    getBook(id: number): Book | undefined
    {
        return this.books.find(b => b._id === id);
    }

    getAuthors(): string[]
    {
        return this.authors;
    }
}