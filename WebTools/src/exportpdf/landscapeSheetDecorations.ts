import { PDFPage } from "@cantoo/pdf-lib";
import { SimpleColor } from "../common/colour";

export class LandscapeSheetDecorations {

    static readonly sideBubblesOpen = "m 735.7824,517.764 h 5.533 c 0.917,0 1.662,0.746 1.662,1.662 v 10.464 c 0,0.917 -0.745,1.662 -1.662,1.662 h -5.533 c -0.916,0 -1.662,-0.745 -1.662,-1.662 v -10.464 c 0,-0.916 0.746,-1.662 1.662,-1.662 m 0,-18.1846 h 5.533 c 0.917,0 1.662,-0.746 1.662,-1.662 v -13.025 c 0,-0.916 -0.745,-1.662 -1.662,-1.662 h -5.533 c -0.916,0 -1.662,0.746 -1.662,1.662 v 13.025 c 0,0.916 0.746,1.662 1.662,1.662";
    static readonly sideBubblesClosed = "m 735.78096,501.528 h 5.534 c 1.051,0 1.912,0.86 1.912,1.912 v 10.465 c 0,1.05 -0.861,1.912 -1.912,1.912 h -5.534 c -1.053,0 -1.912,-0.862 -1.912,-1.912 V 503.44 c 0,-1.052 0.859,-1.912 1.912,-1.912 m 0,45.436 h 5.534 c 1.051,0 1.912,-0.861 1.912,-1.912 v -9.639 c 0,-1.051 -0.861,-1.912 -1.912,-1.912 h -5.534 c -1.053,0 -1.912,0.861 -1.912,1.912 v 9.639 c 0,1.051 0.859,1.912 1.912,1.912 m 0,11.852 h 5.534 c 1.051,0 1.912,-0.86 1.912,-1.912 v -6.331 c 0,-1.052 -0.861,-1.912 -1.912,-1.912 h -5.534 c -1.053,0 -1.912,0.86 -1.912,1.912 v 6.331 c 0,1.052 0.859,1.912 1.912,1.912";
    static readonly bottomDots = "m 192.05624,598.5726 c 0,1.829 -1.481,3.312 -3.311,3.313 -1.831,0 -3.314,-1.484 -3.314,-3.313 0,-1.829 1.483,-3.311 3.314,-3.312 1.829,0.001 3.311,1.483 3.311,3.312 m -5.808,0 h 0 v 0 h 0 z m 429.723,-1.8918 c -1.829,0 -3.312,-1.481 -3.313,-3.311 0,-1.831 1.484,-3.313 3.313,-3.313 1.829,0 3.311,1.483 3.312,3.313 0,1.829 -1.483,3.311 -3.312,3.311 m 0,-5.808 h 0.001 v 0 h -0.001 z"
    static readonly mainBorder = "m 54.887856,59.425403 c -5.977,0 -10.839,4.862 -10.839,10.839 l -0.074,487.498997 c 0,2.895 1.128,5.617 3.175,7.664 2.047,2.047 4.769,3.174 7.664,3.174 l 686.462004,-0.01 c 5.976,0 10.839,-4.862 10.839,-10.839 v -75.211 c 0,-3.197 -1.802,-7.676 -4.015,-9.983 l -6.712,-6.995 c -4.406,-4.591 -7.99,-13.502 -7.991,-19.866 l 0.026,-375.432997 c -10e-4,-5.977 -4.864,-10.839 -10.84,-10.839 z"
    static readonly cornerDecoration = "m 439.4088,-8.84068 19.12,19.12 c 4.34,4.34 12.864,7.871 19.002,7.871 h 251.115 c 2.359,0 5.513,1.306 7.182,2.975 l 5.594,5.594 c 4.341,4.341 12.865,7.872 19.003,7.872 h 42.94403";

    drawSheetDecorations(page: PDFPage, colour: SimpleColor) {
        page.moveTo(0, page.getHeight());

        page.drawSvgPath(LandscapeSheetDecorations.sideBubblesOpen, {
            borderColor: colour.asPdfRbg(),
            borderWidth: 0.5
        });

        page.drawSvgPath(LandscapeSheetDecorations.sideBubblesClosed, {
            borderColor: colour.asPdfRbg(),
            color: colour.asPdfRbg(),
            borderWidth: 0.5
        });

        page.drawSvgPath(LandscapeSheetDecorations.bottomDots, {
            borderColor: colour.asPdfRbg(),
            color: colour.asPdfRbg(),
            borderWidth: 0
        });

        page.drawSvgPath(LandscapeSheetDecorations.mainBorder, {
            borderColor: colour.asPdfRbg(),
            borderWidth: 1
        });

        page.drawSvgPath(LandscapeSheetDecorations.cornerDecoration, {
            borderColor: colour.asPdfRbg(),
            borderWidth: 1
        });
    }
}