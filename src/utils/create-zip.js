const fs = require('fs-extra')
const AdmZip = require('adm-zip');
const path = require('path');

const createZipFile = async (phoneNumber, code, type) => {
    console.log(phoneNumber + ' ' + code + ' ' + type)
    let zipPath = path.join(__dirname, "..", "public", "zip", `${phoneNumber}_${code}.zip`);
    let exists = await fs.pathExists(zipPath);
    if(exists) return `${phoneNumber}_${code}.zip`;
    exists = await fs.exists( path.join(__dirname, "..", "public", "back", `${phoneNumber}_${code}_back.png`))
    try {
        
        const zip = new AdmZip();
        zip.addLocalFile(path.join(__dirname, "..", "public", "ticket", `${phoneNumber}_${code}.png`));
        if(!exists) await fs.copy(path.join(__dirname, "..", "public", "type", `${type}.png`),  path.join(__dirname, "..", "public", "back", `${phoneNumber}_${code}_back.png`))
        zip.addLocalFile(path.join(__dirname, "..", "public", "back", `${phoneNumber}_${code}_back.png`));
        zip.writeZip(zipPath);
        return `${phoneNumber}_${code}.zip`;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

module.exports = createZipFile;