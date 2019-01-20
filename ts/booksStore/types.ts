export interface Book {
    id: string;
    title: string;
    authors: Author[];
    pages: number;
    publisher?: string;
    yearOfPublish?: number;
    printingDate?: Date;
    ISBN?: string;
    image?: string;
}

export interface Author {
    id: string;
    firstName: string;
    lastName: string;
}

export enum sortTypes {
    TITLEDESC = "TITLE/DESC",
    TITLEASC = "TITLE/ASC",
    YEARDESC = "YEAR/DESC",
    YEARASC = "YEAR/ASC",
}
