const fs = require('fs');
const Jimp = require('jimp');

const methods = require('./methods');
const settings = require('../setttings/settings');
const utils = require('../../utils/utils');





const inputDir = './main/images';
const images = utils.sortFileNames(fs.readdirSync(inputDir));
const outputDir = './main/cartoon-images';



// clear cartoon-images folder per settings:
if (settings.jimp.clearCartoonImagesBeforeStart === true) methods.clearFolder('main/cartoon-images');

async function main() {
    console.log('Starting cartoonization on ' + images.length + ' images');

    for (let i = 0; i < images.length; i++) {
        const outputPath = `${outputDir}/${images[i]}`;

        await new Promise((resolve, reject) => {

            Jimp.read(`${inputDir}/${images[i]}`)
                .then((img) => {
                    img.posterize(settings.jimp.n)
                        .write(outputPath, (err) => {
                            if (err) {
                                console.error(`Error processing image: ${outputPath} `, err);
                                reject();
                            } else {
                                console.log('Cartoonization finished for ' + outputPath + ' ~ Total Progress: ' + images[i] + '/' + images.length);
                                resolve();
                            }
                        });
                })
                .catch((err) => {
                    console.error(`Error reading image: ${outputPath} `, err);
                    reject();
                });

        });
    }
}

main();