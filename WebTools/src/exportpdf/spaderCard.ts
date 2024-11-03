import { PDFDocument, PDFPage } from "@cantoo/pdf-lib";
import fontkit from '@pdf-lib/fontkit'
import { Column } from "./column";
import { Asset } from "../asset/asset";
import { SimpleColor } from "../common/colour";
import { determineIdealFontWidth } from "./fontWidthDeterminer";
import { TextBlock } from "./textBlock";
import { FontSpecification } from "./fontSpecification";
import { FontLibrary, FontType } from "./fontLibrary";
import { labelWriter, VerticalAlignment } from "./labelWriter";
import { TextAlign } from "./textAlign";
import { Paragraph } from "./paragraph";
import { FontOptions } from "./fontOptions";

export class SpaderCard {

    static readonly titleColumn = new Column(56.8, 40.2, 9.2, 121.8);
    static readonly textColumn = new Column(43.7, 197.1, 49.9, 126.8);

    getPdfUrl(asset: Asset): string {
        return '/static/pdf/SpaderCard.pdf'
    }

    fonts: FontLibrary = new FontLibrary();

    async initializeFonts(pdf: PDFDocument) {

        pdf.registerFontkit(fontkit);
        const headingFontBytes = await fetch("/static/font/OpenSansCondensed-Bold.ttf").then(res => res.arrayBuffer());
        const headingFont =  await pdf.embedFont(headingFontBytes)
        this.fonts.addFont(FontType.Bold, headingFont);

        const baseFontBytes = await fetch("/static/font/OpenSansCondensed-Light.ttf").then(res => res.arrayBuffer());
        const baseFont = await pdf.embedFont(baseFontBytes);
        this.fonts.addFont(FontType.Standard, baseFont);
    }

    async populate(pdf: PDFDocument, asset: Asset) {
        await this.initializeFonts(pdf);

        const page = pdf.getPage(0);
        this.writeTitle(page, asset);
        this.writeLabels(page, asset);
    }

    writeLabels(page: PDFPage, asset: Asset) {
        labelWriter(page, {
            "Construct.assetStat.medical": new Column(44, 176.4, 5, 22.4),
            "Construct.assetStat.military": new Column(69.8, 176.4, 5, 22.4),
            "Construct.assetStat.personal": new Column(95.6, 176.4, 5, 22.4),
            "Construct.assetStat.science": new Column(121.4, 176.4, 5, 22.4),
            "Construct.assetStat.social": new Column(147.2, 176.4, 5, 22.4),
        }, 1,
        this.fonts.fontByType(FontType.Standard), 6, SimpleColor.from("#000000"), TextAlign.Centre, "", VerticalAlignment.Middle);

        [
            new Column(44, 180.7, 12.4, 22.4),
            new Column(69.8, 180.7, 12.4, 22.4),
            new Column(95.6, 180.7, 12.4, 22.4),
            new Column(121.4, 180.7, 12.4, 22.4),
            new Column(147.2, 180.7, 12.4, 22.4),
        ].forEach((c,i) => {
            const p = new Paragraph(page, c, this.fonts);
            p.textAlignment = TextAlign.Centre;
            p.append(asset.stats[i].asString, new FontOptions(10, FontType.Bold));
            p.write();
        })


        if (asset.specialAbility) {
            const paragraph = new Paragraph(page, SpaderCard.textColumn, this.fonts);
            paragraph.append(asset.specialAbility.title + ": ", new FontOptions(8, FontType.Bold));
            paragraph.append(asset.specialAbility.description, new FontOptions(8));
            paragraph.write();
        }
    }

    writeTitle(page: PDFPage, asset: Asset) {
        const font = this.fonts.fontByType(FontType.Bold);
        const originalText = asset.name.toLocaleUpperCase();
        let text = originalText;
        const fontSize = determineIdealFontWidth([ text ],
            SpaderCard.titleColumn.width, 8, 6, font);
        const column = SpaderCard.titleColumn;
        let width = font.widthOfTextAtSize(text, fontSize);
        while (width > column.width) {
            text = text.substring(0, text.length-1);
            width = font.widthOfTextAtSize(text + "...", fontSize);
        }

        if (text !== originalText) {
            text += "...";
        }

        const block = TextBlock.create(text, new FontSpecification(font, fontSize), 0)

        page.drawText(text, {
            x: column.start.x,
            y: page.getHeight() - (column.end.y - ((column.height - block.height) / 2)),
            color: SimpleColor.from("#000000").asPdfRbg(),
            font: block.font,
            size: block.fontSize
        });

    }

    createFileName(asset: Asset): string {
        if (asset.name == null || asset.name.length === 0) {
            return "spader-card.pdf";
        } else {
            var escaped = asset.name.replace(/\\/g, '_').replace(/\//g, '_').replace(/\s/g, '_');
            return escaped + "-spader-card.pdf";
        }
    }
}