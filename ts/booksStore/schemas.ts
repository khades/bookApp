import * as yup from "yup";
import { checkISBNSum, ISBNRegExp } from "../utils/isbn";

export const AuthorSchema = yup.object({
    firstName: yup.string().required("Обязательное поле").max(20, "Не более 20 символов"),
    lastName: yup.string().required("Обязательное поле").max(20, "Не более 20 символов"),
});

const minPrintingDate = new Date(1800, 0, 1);

export const BookSchema = yup.object({
    title: yup.string()
        .required("Обязательное поле")
        .max(30, "Не более 30 символов"),
    authors: yup.array()
        .required("Обязательное поле")
        .min(1)
        .of(AuthorSchema),
    pages: yup.number()
        .required("Обязательное поле")
        .min(1, "Минимальное значение: 1")
        .max(10000, "Максимальное значение: 10000")
        .typeError("Неверное значение"),
    publisher: yup.string()
        .notRequired()
        .max(30, "Не более 30 символов"),
    yearOfPublish: yup.number()
        .notRequired()
        .min(1800, "Не ранее 1800 года")
        .typeError("Неверное значение"),
    printingDate: yup.date()
        .notRequired()
        .typeError("Неверное значение")
        .min(minPrintingDate, "Дата должна быть не ранее 01/01/1800"),
    ISBN: yup.string()
        .notRequired()
        .matches(ISBNRegExp, "Неверный формат идентификатора")
        .test("ISBN checkSum", "Неверная контрольная сумма", checkISBNSum),
});
