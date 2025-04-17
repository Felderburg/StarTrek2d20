
export const svgTranslationHelper = (svg: string, reverse: boolean = false) => {
    if (reverse) {
        return svg?.length ? `<g transform="translate(-20,0)">` + svg + `</g>` : svg;
    } else {
        return svg?.length ? `<g transform="translate(20,0)">` + svg + `</g>` : svg;
    }
}