const {exec} = require('child_process');
const path = require('path');
const fs = require("fs");

const outputPath = path.join(__dirname, "codes");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive:true});
}

const executecpp = (filepath) =>{
    const jobId = path.basename(filepath).split(".")[0];

    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject)=>{
        exec(`g++ ${filepath} -o ${outPath} &&  cd ${outputPath} && .\\${jobId}.exe`, (error, stdout, stderr)=>{
            error && reject({error, stderr});
            stderr && reject(stderr);
            console.log(error);
            resolve(stdout);
        });
    });
}

module.exports = {executecpp}