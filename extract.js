const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const methods = require('./main/methods/methods');
const settings = require('./main/setttings/settings');





const videoPath = './main/input/' + fs.readdirSync('./main/input')[0];
const outputDir = './main/images';



extractFramesFromVideo(videoPath, outputDir)
  .then(() => {
    console.log('Frames extracted successfully.');
  })
  .catch((err) => {
    console.error('Error extracting frames: ', err);
  });



async function extractFramesFromVideo(videoPath, outputDir) {
      // clear images folder per settings:
  if (settings.extract.clearImagesBeforeStart === true) methods.clearFolder('main/images');

  console.log('Starting image extraction');

  await new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        reject(err);
        return;
      }

      const frameRate = metadata.streams[0].r_frame_rate;
      console.log('frame rate: ' + frameRate);

      ffmpeg(videoPath)
        .outputOptions('-vf', `fps=${frameRate}`)
        .output(`${outputDir}/%d.png`)
        .on('start', () => {
          console.log('Starting image extraction');
        })
        .on('end', () => {
          console.log('Finished image extraction');
          resolve();
        })
        .on('error', (err) => {
          console.error(err);
          reject(err);
        })
        .run();
    });
  });
}

