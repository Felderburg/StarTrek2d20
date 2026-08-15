import { PDFPage } from '@cantoo/pdf-lib';
import { Column } from './column';

export class PageArea {
  readonly column: Column;
  readonly page: PDFPage;

  constructor(column: Column, page: PDFPage) {
    this.column = column;
    this.page = page;
  }

  bottomAfter(deltaY: number) {
    let column = this.column.bottomAfter(deltaY, this.page);
    return column == null ? null : new PageArea(column, this.page);
  }

  areaWithAtLeast(height: number) {
    return this.column.columnWithAtLeast(height, this.page);
  }
}
