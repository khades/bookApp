import * as React from "react";
import { sortTypes } from "../../booksStore/types";

interface ITableHeaderProps {
    sortType: sortTypes;
    sortByTitleAsc: () => void;
    sortByTitleDesc: () => void;
    sortByYearAsc: () => void;
    sortByYearDesc: () => void;
}

const TableHeader = React.memo((props: ITableHeaderProps) => {
    let titleHeader = (
        <th style={{ width: "100%" }} className="books__handler books__table-header" onClick={props.sortByTitleDesc}>
            <b>Заголовок ▼</b>
        </th>
    );
    let yearTitle = (
        <th className="books__handler  books__table-header" onClick={props.sortByYearAsc}>
            Год публикации
        </th>
    );

    if (props.sortType === sortTypes.TITLEDESC) {
        titleHeader = (
            <th
                style={{ width: "100%" }}
                className="books__handler  books__table-header"
                onClick={props.sortByTitleAsc}
            >
                <b>Заголовок ▲</b>
            </th>
        );
        yearTitle = (
            <th className="books__handler  books__table-header" onClick={props.sortByYearAsc}>
                Год публикации
            </th>
        );
    }
    if (props.sortType === sortTypes.YEARASC) {
        titleHeader = (
            <th style={{ width: "100%" }} className="books__handler books__table-header" onClick={props.sortByTitleAsc}>
                Заголовок
        </th>
        );
        yearTitle = (
            <th className="books__handler books__table-header" onClick={props.sortByYearDesc}>
                <b>Год публикации ▼</b>
            </th>
        );
    }
    if (props.sortType === sortTypes.YEARDESC) {
        titleHeader = (
            <th style={{ width: "100%" }} className="books__handler books__table-header" onClick={props.sortByTitleAsc}>
                Заголовок
            </th>
        );
        yearTitle = (
            <th className="books__handler books__table-header" onClick={props.sortByYearAsc}>
                <b>Год публикации ▲</b>
            </th>
        );
    }
    return (
        <tr>
            {titleHeader}
            <th className="books__table-header">Авторы</th>
            <th className="books__table-header">Страниц</th>
            <th className="books__table-header">Издательство</th>
            {yearTitle}
            <th className="books__table-header">ISBN</th>
            <th className="books__table-header" />
            <th className="books__table-header" />
        </tr>
    );
});

export default TableHeader;
