const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const methods = require('./main/methods/methods');
const settings = require('./main/setttings/settings');
const utils = require('./utils/utils');





const minNumFrames = 1; // set minimum number of images that need to be present in inputDir for compile to run

const outputFileExt = '.mp4';

const videoPath = 'main/input/' + fs.readdirSync('./main/input')[0];
const inputDir = 'main/cartoon-images';
const tempPath = `main/temp/temp${outputFileExt}`;

const date = utils.formatDate(Date.now());
const outputPath = `main/output/${date}/output${outputFileExt}`;



let frameRate;
ffmpeg.ffprobe(videoPath, (err, metadata) => {
  if (err) {
    console.error('Error probing video:', err);
    return;
  }

  const split = metadata.streams[0].r_frame_rate.split('/');
  if (split.length === 1) {
    frameRate = parseFloat(split[0]);

  } else if (split.length === 2) {
    frameRate = parseFloat(split[0]) / parseFloat(split[1]);

  } else {
    throw new Error(`Compile aborted. Unexpected frame rate syntax received from ffprobe. \nFrame rate: ${frameRate} \n`);
  }



  const inputDirContents = fs.readdirSync(inputDir);
  if (inputDirContents.length < minNumFrames) {
    throw new Error(`Compile aborted. Minimum number of images not reached. \nRequired minimum number of images: ${minNumFrames} \nCurrent number of images: ${inputDirContents.length} \n`);
  };

  // make output folder:
  if (!fs.existsSync(`./main/output/${date}`)) fs.mkdirSync(`./main/output/${date}`);



  compile(inputDir, tempPath, outputPath, frameRate, videoPath)
    .catch((err) => {
      console.error('Error creating video: ', err);
    });
});



async function compile(inputDir, tempPath, outputPath, frameRate, videoPath) {

  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(`${inputDir}/%d.png`) // Input pattern to read images
      .output(tempPath)
      .inputFPS(frameRate) // Set the input frame rate
      .on('start', () => {
        console.log('Starting compile')
      })
      .on('end', () => {
        console.log('Finished compile');
        resolve();
      })
      .on('error', (err) => {
        console.error(err);
        reject(err);
      })
      .run();
  });



  ffmpeg()
    .input(tempPath)
    .input(videoPath) // Input video file for audio
    .output(outputPath)
    .outputOptions(['-map 0:v', '-map 1:a', '-c:v copy', '-shortest']) // Copy the video stream from tempPath without re-encoding
    .on('start', () => {
      console.log('Starting audio encode')
    })
    .on('end', () => {
      console.log('Finished audio encode');

      // clear folders per settings:
      if (settings.compile.clearInputWhenDone === true) {
        methods.clearFolder('main/input');
      } if (settings.compile.clearImagesWhenDone === true) {
        methods.clearFolder('main/images');
      } if (settings.compile.clearCartoonImagesWhenDone === true) {
        methods.clearFolder('main/cartoon-images');
      } if (settings.compile.clearTempWhenDone === true) {
        methods.clearFolder('main/temp');
      }

    })
    .on('error', (err) => {
      console.error(err);
    })
    .run();
}

