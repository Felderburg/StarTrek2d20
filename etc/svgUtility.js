
const fs = require('node:fs');

/**
 * The purpose of this SVG utility is to ensure that all path nodes
 * in an SVG file have a fill (because when we export a file from
 * Affinity Designer to SVG, some nodes assume a default fill of
 * black, and using a default causes grief in some circumstances.)
 */

let svgFileName = ((process.argv?.length ?? 0) > 2) ? process.argv[2] : null;


const fixPathStyle = (tag) => {

    if (tag.includes("style=\"")) {
        const style = tag.substring(tag.indexOf("style=\"") + 7, tag.indexOf("\"", tag.indexOf("style=\"") + 8));

        if (!style.includes("fill:")) {
            tag = tag.substring(0, tag.indexOf("style=\"") + 7)
                + style + (style.endsWith(";") ? "" : ";") + "fill:#000000;"
                + tag.substring(tag.indexOf("\"", tag.indexOf("style=\"") + 8));

        }
    }
    return tag;

}

const updateSvgFill = (data) => {
    let result = "";
    while (data.includes("<")) {
        let index = data.indexOf("<");
        result += data.substring(0, index);
        let endIndex = data.indexOf(">", index);
        let tag = data.substring(index, endIndex+1);

        data = data.substring(endIndex+1);

        if (tag.startsWith("<path")) {
            tag = fixPathStyle(tag);
        }

        result += tag;
    }
    result += data;

    return result;
}

if (svgFileName?.length && fs.existsSync(svgFileName)) {
    try {
        const svgData = fs.readFileSync(svgFileName, 'utf8');
        const revisedData = updateSvgFill(svgData);
        fs.writeFileSync(svgFileName.substring(0, svgFileName.indexOf(".svg")) + "-revised.svg", revisedData, {encoding:  'utf-8'});
    } catch (err) {
        console.log(err);
    }
} else if (svgFileName?.length) {
    console.log("File name " + svgFileName + " does not exist");
} else {
    console.log("You must specify a file name");
}

