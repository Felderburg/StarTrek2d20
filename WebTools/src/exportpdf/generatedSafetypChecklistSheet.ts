import { PDFDocument, PDFPage } from '@cantoo/pdf-lib';
import { BaseNonForm2eSheet } from './generated2eBaseSheet';
import { SafetyEvaluationType } from '../safety/model/safetyEvaluation';
import { PortraitSheetDecorations } from './portraitSheetDecorations';
import { goldColour2e, redColour2e, tealColour2e } from './colourProvider2e';
import i18next from 'i18next';
import { Column } from './column';
import { Paragraph } from './paragraph';
import { FontOptions } from './fontOptions';
import { bullet2EWriter } from './bullet2eWriter';
import { SafetySection, SafetySections } from '../safety/model/safetySection';
import { FontSpecification } from './fontSpecification';
import { FontType } from './fontLibrary';
import { TextAlign } from './textAlign';
import { makeKey } from '../common/translationKey';
import { CHALLENGE_DICE_NOTATION } from '../common/challengeDiceNotation';

declare function download(bytes: any, fileName: any, contentType: any): any;

export class GeneratedSafetyChecklistSheet extends BaseNonForm2eSheet {
  getPdfUrl(): string {
    return '/static/pdf/STA_2e_Starship_Sheet.pdf';
  }

  async export(evaluation: { [category: string]: SafetyEvaluationType }) {
    const existingPdfBytes = await fetch(this.getPdfUrl()).then((res) =>
      res.arrayBuffer(),
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    await this.populateEvaluation(pdfDoc, evaluation);

    const pdfBytes = await pdfDoc.save();

    download(pdfBytes, 'Safety_Checklist_filled', 'application/pdf');
  }

  firstColumn(additionalPage: PDFPage, pdf: PDFDocument) {
    const column2 = new Column(
      538.5 - (284.7 - 56.7),
      75,
      715 - 75,
      284.7 - 56.7,
    );
    return new Column(56.7, 75, 715 - 75, 284.7 - 56.7, column2);
  }

  async populateEvaluation(
    pdf: PDFDocument,
    evaluation: { [category: string]: SafetyEvaluationType },
  ) {
    await this.initializeFonts(pdf);
    const page = pdf.getPage(0);

    new PortraitSheetDecorations().drawSheetDecorations(page, tealColour2e);
    this.writeName(
      page,
      i18next.t('Page.title.safetyChecklist'),
      tealColour2e,
      this.headingFont,
      this.nameColumn,
    );

    let column = this.writePreamble(page, this.firstColumn(page, pdf));
    column = column.bottomAfter(20);

    SafetySections.instance.sections.forEach((section) => {
      const temp = column.columnWithAtLeast(60, page);
      column = temp.column;
      const heading = new Paragraph(page, column, this.fonts);
      heading.append(
        section.localizedName.toLocaleUpperCase(),
        new FontSpecification(this.headingFont, 9),
      );
      heading.write();
      column = heading.nextColumn().bottomAfter(13);

      column = this.writeAllCategories(page, section, evaluation, column);
      column = column.bottomAfter(16);
    });
  }

  writeAllCategories(
    page: PDFPage,
    section: SafetySection,
    evaluation: { [category: string]: SafetyEvaluationType },
    column: Column,
  ) {
    const evaluationColumnWidth = 30;
    const th1 = new Paragraph(
      page,
      new Column(
        column.start.x + column.width - 3 * evaluationColumnWidth,
        column.start.y,
        20,
        30,
      ),
      this.fonts,
    );
    const th2 = new Paragraph(
      page,
      new Column(
        column.start.x + column.width - 2 * evaluationColumnWidth,
        column.start.y,
        20,
        30,
      ),
      this.fonts,
    );
    const th3 = new Paragraph(
      page,
      new Column(
        column.start.x + column.width - 1 * evaluationColumnWidth,
        column.start.y,
        20,
        30,
      ),
      this.fonts,
    );
    th1.textAlignment = TextAlign.Centre;
    th2.textAlignment = TextAlign.Centre;
    th3.textAlignment = TextAlign.Centre;

    th1.append(
      i18next.t('SafetyEvaluationType.alwaysOk'),
      new FontOptions(8, FontType.Bold),
    );
    th2.append(
      i18next.t('SafetyEvaluationType.yellowAlert'),
      new FontOptions(8, FontType.Bold),
    );
    th3.append(
      i18next.t('SafetyEvaluationType.redAlert'),
      new FontOptions(8, FontType.Bold),
    );

    th1.write();
    th2.write();
    th3.write();

    this.writeLine(page, column.start.x, th1.bottom.y + 5, column.width);

    const columnWidth = column.width - 3 * evaluationColumnWidth;
    column = column.bottomAfter(25);
    let paragraphColumn = new Column(
      column.start.x,
      column.start.y,
      column.height,
      columnWidth,
      column.nextColumnHelper,
    );

    section.categories.forEach((c) => {
      const paragraph = new Paragraph(page, paragraphColumn, this.fonts);
      paragraph.append(
        i18next.t(makeKey('SafetySection.category.', c)),
        new FontOptions(8),
      );
      paragraph.write();

      const type = evaluation[c];
      switch (type) {
        case SafetyEvaluationType.AlwaysOk:
          {
            const tempColumn = new Column(
              paragraphColumn.start.x + paragraphColumn.width,
              paragraphColumn.start.y,
              20,
              evaluationColumnWidth,
            );
            const evaluationParagraph = new Paragraph(
              page,
              tempColumn,
              this.fonts,
            );
            evaluationParagraph.textAlignment = TextAlign.Centre;
            evaluationParagraph.append(
              CHALLENGE_DICE_NOTATION,
              new FontOptions(8, FontType.Symbol),
              tealColour2e,
            );
            evaluationParagraph.write();
          }
          break;
        case SafetyEvaluationType.YellowAlert:
          {
            const tempColumn = new Column(
              paragraphColumn.start.x +
                paragraphColumn.width +
                evaluationColumnWidth,
              paragraphColumn.start.y,
              20,
              evaluationColumnWidth,
            );
            const evaluationParagraph = new Paragraph(
              page,
              tempColumn,
              this.fonts,
            );
            evaluationParagraph.textAlignment = TextAlign.Centre;
            evaluationParagraph.append(
              CHALLENGE_DICE_NOTATION,
              new FontOptions(8, FontType.Symbol),
              goldColour2e,
            );
            evaluationParagraph.write();
          }
          break;
        case SafetyEvaluationType.RedAlert: {
          const tempColumn = new Column(
            paragraphColumn.start.x +
              paragraphColumn.width +
              2 * evaluationColumnWidth,
            paragraphColumn.start.y,
            20,
            evaluationColumnWidth,
          );
          const evaluationParagraph = new Paragraph(
            page,
            tempColumn,
            this.fonts,
          );
          evaluationParagraph.textAlignment = TextAlign.Centre;
          evaluationParagraph.append(
            CHALLENGE_DICE_NOTATION,
            new FontOptions(8, FontType.Symbol),
            redColour2e,
          );
          evaluationParagraph.write();
          break;
        }
        default:
          break;
      }

      this.writeLine(
        page,
        paragraph.bottom.x,
        paragraph.bottom.y + 6,
        column.width,
      );

      paragraphColumn = paragraph.nextColumn();
      if (paragraphColumn.width !== columnWidth) {
        paragraphColumn = new Column(
          paragraphColumn.start.x,
          paragraphColumn.start.y,
          paragraphColumn.height,
          columnWidth,
          paragraphColumn.nextColumnHelper,
        );
      }
      paragraphColumn = paragraphColumn.bottomAfter(8);
    });

    return new Column(
      paragraphColumn.start.x,
      paragraphColumn.start.y,
      paragraphColumn.height,
      column.width,
      paragraphColumn.nextColumnHelper,
    );
  }

  writeLine(page: PDFPage, x: number, y: number, width: number) {
    page.drawLine({
      start: { x: x, y: page.getHeight() - y },
      end: { x: x + width, y: page.getHeight() - y },
      thickness: 0.5,
      color: tealColour2e.asPdfRbg(),
    });
  }

  writePreamble(page: PDFPage, column: Column) {
    const preambleText = i18next.t('SafetyChecklist.instruction');
    const preambleParagraphs = preambleText
      .split('\n')
      .filter((t) => t?.length);
    let paragraph = new Paragraph(page, column, this.fonts);
    const paragraphs = [paragraph];
    preambleParagraphs.forEach((p, i) => {
      if (i > 0) {
        paragraph = paragraph?.nextParagraph();
        if (paragraph) {
          paragraph.indent(0);
          paragraphs.push(paragraph);
        }
      }
      let bullet = false;
      if (p.indexOf('- ') === 0) {
        paragraph.indent(15);
        bullet = true;
        p = p.substring(2);
      }

      paragraph?.append(p, new FontOptions(9));
      if (bullet) {
        bullet2EWriter(page, paragraph, tealColour2e);
      }
    });

    paragraphs.forEach((p) => p.write());

    return paragraphs[paragraphs.length - 1].nextColumn();
  }
}
