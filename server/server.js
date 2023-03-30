const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
// const { exec } = require('child_process');
const spawn = require('child_process').spawn;
app.use(cors());
app.use(express.json());

app.get('/predict/:str', (req, res) => {
    console.log("Message sent to client");
    // res.json({ message: "Hello from server!" });
    const { str } = req.params;
    // const j = {"symptoms": str}
    // console.log(j);
    fs.writeFile('./symptoms.txt', str, 'utf8', () => {
        console.log("File written");
            // res.json({ message: "Hello from server!" });
            // else{
                const child = spawn('python3', ['./main.py']);
                child.stdout.on('data',  (data) => {
                    const msg = data.toString().trim();
                    console.log(data.toString());
                    if (msg == 'completed') {
                        const json = require('./disease_info.json');
                        res.json(json);
                    }
                    else{
                        res.status(500).send("Error");
                    }
                    // res.send(data.toString());
                });    
            // }
        
    });

    

    // exec(`python3 python/main.py ${str}`, (err, stdout, stderr) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log(stdout);
    //     const json = require('./disease_info.json');
    //     res.json(json);
    // });
});

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});