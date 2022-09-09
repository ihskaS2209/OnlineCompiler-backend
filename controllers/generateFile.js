// uuid --> a package that helps in generating unique ids

const fs= require('fs');
const path = require('path');
const {v4:uuid} = require('uuid');  // --> version 4 (v4)-> renamed as uuid for this code

const dirCodes = path.join(__dirname, "codes");
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive:true});
}

const generateFile = async (format, content) =>{
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(dirCodes, filename);
    await fs.writeFileSync(filepath, content);
    return filepath;
};

module.exports =  {generateFile};