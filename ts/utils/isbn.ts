export const ISBNRegExp = new RegExp("^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$");

export function checkISBNSum(isbn: string) {
    if (!isbn || isbn === "") {
        return true;
    }
    const filteredISBN = isbn.replace("ISBN-10", "").replace("ISBN-13", "").replace(/[^\dX]/gi, "");
    if (!(filteredISBN.length === 10 || filteredISBN.length === 13)) {
        return false;
    }

    const ISBNValues = filteredISBN.split("").map((value: string, index: number): number => {
        if (index === 9 && value.toUpperCase() === "X") {
            return 10;
        }
        return parseInt(value, 10);
    });
    if (ISBNValues.length === 10) {
        return checkISBN10Sum(ISBNValues);
    } else {
        return checkISBN13Sum(ISBNValues);
    }
}

// https://en.wikipedia.org/wiki/International_Standard_Book_Number#ISBN-10_check_digits
function checkISBN10Sum(ISBNValues: number[]): boolean {
    const sum: number = ISBNValues.reduce((accumulator: number, currentValue: number, index: number): number => {
        return accumulator += ((10 - index) * currentValue);
    }, 0);
    return ((sum % 11) === 0);
}

// https://en.wikipedia.org/wiki/International_Standard_Book_Number#ISBN-13_check_digit_calculation
function checkISBN13Sum(ISBNValues: number[]): boolean {
    const sum: number = ISBNValues.reduce((accumulator: number, currentValue: number, index: number): number => {
        const indexIsEven = index % 2 === 0;
        const coef = indexIsEven ? 1 : 3;
        return accumulator += (coef * currentValue);
    }, 0);
    return ((sum % 10) === 0);
}
