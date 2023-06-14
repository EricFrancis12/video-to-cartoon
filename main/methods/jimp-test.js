const Jimp = require('jimp');
const settings = require('../setttings/settings');




const inputPath = './library/stock/images/2.jpg';
const outputPath = './_example.jpg';



Jimp.read(inputPath)
    .then((img) => {
        img.posterize(settings.jimp.n)
            .contrast(0.1)
            //.saturation(settings.jimp.saturation)
            //.greyscale()
            .write(outputPath, (err) => {
                if (err) {
                    console.error(`Error processing image: ${outputPath} `, err);
                } else {
                    console.log('Cartoonization finished for ' + outputPath);
                }
            });
    })
    .catch((err) => {
        console.error(`Error reading image: ${outputPath} `, err);
    });