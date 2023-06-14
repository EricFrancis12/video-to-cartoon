const settings = {
    extract: {
        clearImagesBeforeStart: true            // Should always be true to function properly
    },
    p2c: {
        clearCartoonImagesBeforeStart: true,    // Should always be true to function properly
        names: ['fast'],                        // ['fast', 'gausian', 'bilateral']
        radii: [10],                            
        edgeWeakenings: [75],
        resizes: [false]
    },
    jimp: {
        clearCartoonImagesBeforeStart: true,    // Should always be true to function properly
        n: 6                                    // Set between 2 and 256 - represents the number of color levels or tones to retain in the image.
    },
    compile: {
        clearInputWhenDone: false,              // Optional
        clearImagesWhenDone: false,             // Optional
        clearCartoonImagesWhenDone: false,      // Optional. Set false to have the option of doing multiple outputs from the same set of images
        clearTempWhenDone: false                // Optional, however temp video will be overwritten on next run anyways
    }
}





module.exports = settings;