const fs = require('fs');





if (!fs.existsSync('./main/cartoon-images')) fs.mkdirSync('./main/cartoon-images');
if (!fs.existsSync('./main/images')) fs.mkdirSync('./main/images');
if (!fs.existsSync('./main/input')) fs.mkdirSync('./main/input');
if (!fs.existsSync('./main/output')) fs.mkdirSync('./main/output');
if (!fs.existsSync('./main/temp')) fs.mkdirSync('./main/temp');
