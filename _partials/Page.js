const marked = require('marked');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { setOptions } = require('marked');
const { exception } = require('console');

module.exports = class{
    constructor(options){
        Object.assign(this, options);
    }
    requireMarked(sFname){
        const sDir = process.cwd()
        const sContents = fs.readFileSync(`${sDir}/${sFname}`, 'utf8');
        return marked(sContents);
    }
    resizeImage(sFName, width, height){
        let sOutFile = "";
        let oOptions = {};
        if(width && height){
            oOptions.width = width;
            oOptions.height = height;
            sOutFile = sFName.replace('.', `_${width}x${height}.`);
        }else if(height){
            oOptions.height = height;
            sOutFile = sFName.replace('.', `_x${height}.`);
        }else if(width){
            oOptions.width = width;
            sOutFile = sFName.replace('.', `_${width}.`);
        }else{
            throw new exception("must specify width or height");
        }
        sharp(sFName).resize(oOptions)
        .toFile(sOutFile).then(()=>{
            console.log(`wrote ${sOutFile}`);
        });
        return(sOutFile.replace(`${process.cwd()}${path.sep}`, ""));
    }
}
