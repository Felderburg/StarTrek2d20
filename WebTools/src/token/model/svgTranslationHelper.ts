
export const svgTranslationHelper = (svg: string) => {
    return svg?.length ? `<g transform="translate(20,0)">` + svg + `</g>` : svg;
}