import type { PDFPage } from '@cantoo/pdf-lib';
import { XYLocation } from '../common/xyLocation';
import { PageArea } from './pageArea';

export class Column {
  start: XYLocation;
  height: number;
  width: number;
  nextColumnHelper?: Column | (() => PageArea);

  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    nextColumn?: Column | (() => PageArea),
  ) {
    this.start = new XYLocation(x, y);
    this.height = height;
    this.width = width;
    this.nextColumnHelper = nextColumn;
  }

  private round(n: number) {
    return Math.round(n * 10) / 10;
  }

  indent(indentAmount: number) {
    return new Column(
      this.start.x + indentAmount,
      this.start.y,
      this.height,
      this.width - indentAmount,
    );
  }

  unindent(indentAmount: number) {
    return new Column(
      this.start.x - indentAmount,
      this.start.y,
      this.height,
      this.width + indentAmount,
    );
  }

  contains(point: XYLocation, page: PDFPage) {
    const untranslatedPoint = this.untranslateLocation(page, point);
    return (
      this.round(untranslatedPoint.x) >= this.start.x &&
      this.round(untranslatedPoint.x) <= this.start.x + this.width &&
      this.round(untranslatedPoint.y) >= this.start.y &&
      this.round(untranslatedPoint.y) <= this.start.y + this.height
    );
  }
  translatedStart(page: PDFPage) {
    const x = this.start.x;
    const y = page.getSize().height - this.start.y;
    return new XYLocation(x, y);
  }

  untranslateLocation(page: PDFPage, location: XYLocation) {
    const x = location.x;
    const y = page.getSize().height - location.y;
    return new XYLocation(x, y);
  }

  get end() {
    return new XYLocation(
      this.start.x + this.width,
      this.start.y + this.height,
    );
  }

  get isNextColumnAvailable() {
    return this.nextColumnHelper != null;
  }

  advanceToNextColumn(currentPage: PDFPage): PageArea | undefined {
    if (this.nextColumnHelper == null) {
      return undefined;
    } else if (this.nextColumnHelper instanceof Column) {
      return new PageArea(this.nextColumnHelper as Column, currentPage);
    } else if (typeof this.nextColumnHelper === 'function') {
      return this.nextColumnHelper();
    } else {
      return undefined;
    }
  }

  bottomAfter(deltaY: number, page?: PDFPage) {
    if (deltaY <= this.height) {
      return new Column(
        this.start.x,
        this.start.y + deltaY,
        this.height - deltaY,
        this.width,
        this.nextColumnHelper,
      );
    } else if (page != null) {
      return this.advanceToNextColumn(page)?.column;
    } else {
      return null;
    }
  }

  topBefore(deltaY: number) {
    if (deltaY <= this.height) {
      return new Column(this.start.x, this.start.y, deltaY, this.width);
    } else {
      return null;
    }
  }

  columnWithAtLeast(
    height: number,
    currentPage: PDFPage,
  ): PageArea | undefined {
    if (this.height >= height) {
      return new PageArea(this, currentPage);
    } else {
      return this.advanceToNextColumn(currentPage);
    }
  }
}
