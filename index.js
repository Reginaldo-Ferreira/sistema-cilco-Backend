const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors');

//config cors
app.use(cors());

//Router imports
 const UsersRouter = require("./routes/UsersRoutes");
 const FuncoesRoutes = require("./routes/FuncoesRoutes");
 const telefonesRoutes = require("./routes/TelefonesRoutes");
 const AlunosRoutes = require("./routes/AlunosRoutes");

app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Router
// entidades do  users
 app.use("/", UsersRouter);
 app.use("/", FuncoesRoutes);
 app.use("/", telefonesRoutes);
 //entidades do aluno e professor AlunosRoutes
 app.use("/", AlunosRoutes);

 
    app.get("/", (req, res) => {
        res.json({text: 'servidor is open!'});
    })

// End Router
app.listen(3000, () => {
    console.log("O servidor BackEnd está rodando! port:3000")
})

//as images serão salvas com o id do usuaário e aluno