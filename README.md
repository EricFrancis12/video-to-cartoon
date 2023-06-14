# Video To Cartoon

A tool for applying cartoon-like effects to full videos. Written in nodejs, dependent on:

photo2cartoon (https://www.npmjs.com/package/photo2cartoon)
fluent-ffmpeg (https://www.npmjs.com/package/fluent-ffmpeg)

There are quite a few options to achieve the "cartoon" effect on images, however I've yet to find a solution for entire videos. This tool works by breaking appart your video frame-by-frame, applying the "cartoon" effect to each, then putting them back together in order and adding the original audio track back in.





## Usage
### Basic Usage
Step 1: Insert a video into ./main/input

Step 2: Run $ node extract.js - This will extract all frames of the video into individual .png files, and write them to ./main/images. Note that if you have more than one file in ./main/input, it takes only the first one.

Step 3: Run $ node p2c.js - This will take all image files in ./main/images, cartoonify them, and write them to ./main/cartoon-images

Step 4: Run $ node compile.js - This will take all image files in ./main/cartoon-images, combine them into one video per the frame rate of the original video, and write it to ./main/temp. Then it adds the audio stream from the oroginal video, and writes the final output inside ./main/output



### Notes
- You can modify whether folders are cleared in ./main/settings/settings.js



### Examples
See ./examples





## Photo Effects
### Explanation
The opt object is passed into new cartoonization():

{
    blurMode: {
        name,
        radius
    },
    edgeWeakening,
    resize
}

------------------------------------------------------------------------
(copied and pasted from https://www.npmjs.com/package/photo2cartoon):

blurMode.name:
bilateral: use bilateral filter to blur. Cost longer time.
gaussian: perform gaussian blur.
fast: perform mean-value filter

resize
Resize the input image to 400px width, and scale the height accordingly.
------------------------------------------------------------------------



### Examples
See ./library/settings-examples for visual examples.

The naming syntax for these images refer to the opt object:
`${blurMode.name}-${blurMode.radius}-${edgeWeakening}-${resize}.png`



### Settings
Modify photo effects in ./main/settings/settings.js

settings.p2c: {
    names,
    radii,
    edgeWeakenings,
    resizes
}