import { PDFFont } from "@cantoo/pdf-lib";
import { Column } from "./column";


export const determineIdealFontWidth = (text: string[], maxWidth: number, idealFontSize: number, minimumFontSize: number, font: PDFFont) => {
    let fontSize = idealFontSize;
    text.forEach(t => {
        let width = font.widthOfTextAtSize(t, fontSize);
        while (width > maxWidth) {
            fontSize -= 0.25;
            width = font.widthOfTextAtSize(t, fontSize);
            if (fontSize <= minimumFontSize) {
                break;
            }
        }
    });
    return fontSize;
}