import { PDFPage } from "@cantoo/pdf-lib";
import { Column } from "./column";

export class PageArea {

    readonly column: Column;
    readonly page: PDFPage;

    constructor(column: Column, page: PDFPage) {
        this.column = column;
        this.page = page;
    }
}