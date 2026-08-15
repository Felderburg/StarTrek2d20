import { PDFFont, PDFPage } from '@cantoo/pdf-lib';
import { SimpleColor } from '../common/colour';
import { TextBlock } from './textBlock';
import { FontSpecification } from './fontSpecification';
import { Column } from './column';

export class PortraitSheetDecorations {
  static readonly sideBubblesOpen =
    'm 559.5048,680.4048 h 5.533 c 0.917,0 1.662,0.746 1.662,1.662 v 10.464 c 0,0.917 -0.745,1.662 -1.662,1.662 h -5.533 c -0.916,0 -1.662,-0.745 -1.662,-1.662 v -10.464 c 0,-0.916 0.746,-1.662 1.662,-1.662 m 0,-18.1846 h 5.533 c 0.917,0 1.662,-0.746 1.662,-1.662 v -13.025 c 0,-0.916 -0.745,-1.662 -1.662,-1.662 h -5.533 c -0.916,0 -1.662,0.746 -1.662,1.662 v 13.025 c 0,0.916 0.746,1.662 1.662,1.662';
  static readonly sideBubblesClosed =
    'm 559.505,664.1688 h 5.534 c 1.051,0 1.912,0.86 1.912,1.912 v 10.465 c 0,1.05 -0.861,1.912 -1.912,1.912 h -5.534 c -1.053,0 -1.912,-0.862 -1.912,-1.912 v -10.465 c 0,-1.052 0.859,-1.912 1.912,-1.912 m 0,45.4336 h 5.534 c 1.051,0 1.912,-0.861 1.912,-1.912 v -9.639 c 0,-1.051 -0.861,-1.912 -1.912,-1.912 h -5.534 c -1.053,0 -1.912,0.861 -1.912,1.912 v 9.639 c 0,1.051 0.859,1.912 1.912,1.912 m 0,11.852 h 5.534 c 1.051,0 1.912,-0.86 1.912,-1.912 v -6.331 c 0,-1.052 -0.861,-1.912 -1.912,-1.912 h -5.534 c -1.053,0 -1.912,0.86 -1.912,1.912 v 6.331 c 0,1.052 0.859,1.912 1.912,1.912';
  static readonly bottomDots =
    'm 508.491,766.488 c -1.828,0 -3.311,-1.481 -3.312,-3.311 0.001,-1.831 1.484,-3.313 3.312,-3.313 1.829,0 3.312,1.483 3.313,3.313 0,1.829 -1.484,3.311 -3.313,3.311 m 0,-5.808 h 0.001 v 0 h -0.001 z m -423.915,7.6998 c 0,1.829 -1.481,3.312 -3.311,3.313 -1.831,-0.001 -3.313,-1.484 -3.313,-3.313 0,-1.829 1.483,-3.311 3.313,-3.312 1.829,0 3.311,1.483 3.311,3.312 m -5.808,0 h 0.001 v -0.001 h -0.001 z';
  static readonly cornerDecoration =
    'm 228.401,-15.305 19.12,19.12 c 4.34,4.34 12.864,7.871 19.002,7.871 h 251.115 c 2.359,0 5.513,1.306 7.182,2.975 l 5.594,5.594 c 4.341,4.341 12.865,7.872 19.003,7.872 h 78.37818';
  static readonly mainBorder =
    'm 53.798,63.6928 c -5.977,0 -10.839,4.862 -10.839,10.839 v 646.833 c 0,2.895 1.128,5.617 3.175,7.664 2.047,2.047 4.769,3.174 7.664,3.174 l 508.61,-0.01 c 5.976,0 10.839,-4.862 10.839,-10.839 v -76.298 c 0,-3.197 -1.802,-7.676 -4.015,-9.983 l -6.712,-6.995 c -4.406,-4.591 -7.99,-13.502 -7.991,-19.866 l -0.049,-533.68 c -10e-4,-5.977 -4.864,-10.839 -10.84,-10.839 z';

  drawSheetDecorations(page: PDFPage, colour: SimpleColor) {
    page.moveTo(0, page.getHeight());

    page.drawSvgPath(PortraitSheetDecorations.sideBubblesOpen, {
      borderColor: colour.asPdfRbg(),
      borderWidth: 0.5,
    });

    page.drawSvgPath(PortraitSheetDecorations.sideBubblesClosed, {
      borderColor: colour.asPdfRbg(),
      color: colour.asPdfRbg(),
      borderWidth: 0.5,
    });

    page.drawSvgPath(PortraitSheetDecorations.bottomDots, {
      borderColor: colour.asPdfRbg(),
      color: colour.asPdfRbg(),
      borderWidth: 0,
    });

    page.drawSvgPath(PortraitSheetDecorations.mainBorder, {
      borderColor: colour.asPdfRbg(),
      borderWidth: 1,
    });

    page.drawSvgPath(PortraitSheetDecorations.cornerDecoration, {
      borderColor: colour.asPdfRbg(),
      borderWidth: 1,
    });
  }

  writeName(
    page: PDFPage,
    name: string,
    colour: SimpleColor,
    headingFont: PDFFont,
    nameColumn: Column,
  ) {
    if (name?.length) {
      const textBlock = TextBlock.create(
        name.toLocaleUpperCase(),
        new FontSpecification(headingFont, 10),
        false,
      );
      const y =
        nameColumn.end.y - 3 - (nameColumn.height - textBlock.height) / 2;
      const x = nameColumn.start.x;

      const triangle =
        'M 59.14167,59.12397 V 49.110298 l 8.671875,5.009766 z m 0.580078,-1.001953 6.9375,-4.001953 -6.9375,-4.007813 z';

      const width = textBlock.width;
      const widthOfTab = Math.max(120, width + 50);
      const startOffset = 42.537;

      const farthestEdge = widthOfTab + startOffset;
      const circle1 = farthestEdge - (226.5918 - 221.51591);
      const circle2 = farthestEdge - (226.5918 - 215.25391);

      const curvePath =
        'M 53.876953 44.523438 C 47.614953 44.523438 42.537109 49.601281 42.537109 55.863281 L 42.537109 83.523438 L 42.958984 83.523438 L 42.958984 74.53125 C 42.958984 68.55425 47.821828 63.693359 53.798828 63.693359 ' +
        'L ' +
        farthestEdge +
        ' 63.693359 L ' +
        farthestEdge +
        ' 55.863281 C ' +
        farthestEdge +
        ' 49.601281 ' +
        circle1 +
        ' 44.523438 ' +
        circle2 +
        ' 44.523438 L 53.876953 44.523438 z';

      page.moveTo(0, page.getHeight());
      page.drawSvgPath(curvePath, {
        color: colour.asPdfRbg(),
        borderWidth: 0,
      });

      page.drawSvgPath(triangle, {
        borderColor: SimpleColor.from('#000000').asPdfRbg(),
        color: SimpleColor.from('#ffffff').asPdfRbg(),
        borderWidth: 0,
      });

      textBlock.writeToPage(
        x,
        page.getHeight() - y,
        page,
        SimpleColor.from('#ffffff'),
      );
    }
  }
}
