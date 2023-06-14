const fs = require('fs');
const cartoonization = require('photo2cartoon');

const methods = require('./main/methods/methods');
const settings = require('./main/setttings/settings');
const utils = require('./utils/utils');





const inputDir = './main/images';
const images = utils.sortFileNames(fs.readdirSync(inputDir));
const outputDir = './main/cartoon-images';



async function processImages(name, radius, edgeWeakening, resize) {
    // clear cartoon-images folder per settings:
    if (settings.p2c.clearCartoonImagesBeforeStart === true) methods.clearFolder('main/cartoon-images');

    const opt = getOpt(name, radius, edgeWeakening, resize);

    console.log('~ Beginning cartoonization of ' + images.length + ' images');

    const results = [];
    for (let i = 0; i < images.length; i++) {
        const c = new cartoonization(opt);
        const cs = await c.init(`${inputDir}/${images[i]}`);
        const cartoonizer = cs[0];

        cartoonizer.make();
        cartoonizer.opt = opt;
        results.push(cartoonizer);

        console.log(results.length);
    }

    return results;

};



const names = settings.p2c.names;
const radii = settings.p2c.radii;
const edgeWeakenings = settings.p2c.edgeWeakenings;
const resizes = settings.p2c.resizes;

const cartoonizers = [];

async function quadLoop() {
    for (let i = 0; i < names.length; i++) {
        for (let j = 0; j < radii.length; j++) {
            for (let k = 0; k < edgeWeakenings.length; k++) {
                for (let l = 0; l < resizes.length; l++) {

                    const results = await processImages(names[i], radii[j], edgeWeakenings[k], resizes[l]).catch((error) => {
                        console.error('Error processing images:', error);
                    });

                    results.forEach(result => {
                        cartoonizers.push(result);
                        console.log(cartoonizers.length);
                    });

                }
            }
        }
    }

    console.log('Writing images to directory...');
    let count = 0;
    cartoonizers.forEach(async (cartoonizer) => {
        count++;

        const date = Date.now();
        const fileName = `${count}.png`;

        // depricated fileName schema:
        // const fileName = `${cartoonizer.opt.blurMode.name}-${cartoonizer.opt.blurMode.radius}-${cartoonizer.opt.edgeWeakening}-${cartoonizer.opt.resize}-${date}.png`;

        await new Promise((resolve, reject) => {
            cartoonizer.toFile(`${outputDir}/${fileName}`, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(`Image processed and written.`);
                    resolve();
                }
            });
        });

    });

    console.log(`~ Cartoonization completed for ${cartoonizers.length} images`);

}

quadLoop();





function getOpt(name, radius, edgeWeakening, resize) {
    // default values fallback:
    if (!name) name = 'fast';
    if (!radius) radius = 10;
    if (!edgeWeakening) edgeWeakening = 75;
    if (!resize) resize = false;

    return ({
        blurMode: {
            name: name,
            radius: radius
        },
        edgeWeakening: edgeWeakening,
        resize: resize
    });
}

