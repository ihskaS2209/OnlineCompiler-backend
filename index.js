const express = require('express');
const cors = require('cors');
const { executecpp } = require('./controllers/executec++');
const {generateFile} = require('./controllers/generateFile');
const { executePy } = require('./controllers/executePy');
const { executeJs } = require('./controllers/executeJs');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(request, response) =>{
    response.json({hello: "world!"});
});

app.post('/run', async (request, response)=>{    
    const { language = "javascript", code } = request.body;

    if(code===undefined){
        return response.status(400).json({success: false, error: "Empty code body"});
    }

    try{
    const filepath = await generateFile(language, code);
        try{
            let output;
            if(language === "cpp"){
             output = await executecpp(filepath);
            }
            else if(language ==="python"){
                output = await executePy(filepath);
            }
            else if(language === "javascript"){
                output = await executeJs(filepath);
            }
        
            console.log("output = ", output);
            return response.json({ filepath, output});
        }catch(err){
            console.log("1",err.stderr.split("at Object.")[0]);
            response.status(500).json({"e" : err.stderr.split("at Object.")[0]});
        }
}catch(err){
    response.status(500).json({err});
}
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});
