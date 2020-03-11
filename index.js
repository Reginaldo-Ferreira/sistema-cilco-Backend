const express = require("express");
const app = express();
const bodyParser = require("body-parser");


// View engine

app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Router

    app.get("/", (req, res) => {
        res.json({text: 'servidor is open!'});
    })

// End Router
app.listen(3000, () => {
    console.log("O servidor BackEnd está rodando! port:3000")
})