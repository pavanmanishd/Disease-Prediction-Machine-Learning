const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const spawn = require('child_process').spawn;
app.use(cors());
app.use(express.json());

app.get('/predict/:str', (req, res) => {
    console.log("Message sent to client");
    const { str } = req.params;
    fs.writeFile('./symptoms.txt', str, 'utf8', () => {
        console.log("File written");
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
                });    
        
    });
});

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});