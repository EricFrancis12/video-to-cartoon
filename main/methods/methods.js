require('dotenv').config();
const fs = require('fs');

const ROOT = process.env.ROOT_DIR_PATH;





function clearFolder(relPath) {
    const acceptableRelPaths = ['main/input', 'main/images', 'main/cartoon-images', 'main/temp']

    for (let i = 0; i < acceptableRelPaths.length; i++) {
        if (acceptableRelPaths[i] === relPath || acceptableRelPaths[i] + '/' === relPath) {

            const dir = `${ROOT}/${relPath}`;
            if (!fs.existsSync(dir)) return null;

            const items = fs.readdirSync(dir);
            items.forEach(item => {
                fs.unlinkSync(`${dir}/${item}`);
            });

            return items;
        }
    }

    return null;
}





module.exports = {
    clearFolder
}