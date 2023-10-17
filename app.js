const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const usuarios = require('./usuarios');
const secretKey = process.env.KEY_SECRET;
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/login", (req,res) =>{
  const usuarioVal = req.body.usuario;
  const usuarioKey = req.body.clave;
  const userInf = usuarios.filter((usuario)=>{
    if(usuario.usuario == usuarioVal && usuario.clave == usuarioKey){
      return true;
    } else {
      return false;
    }
  });

  if (userInf.length==0){
    res.status(401).send("Usuario invalido, no esta registrado.");
  } else{
    const payload = userInf[0];
    const token = jwt.sign(payload, secretKey,{
      expiresIn: "1d",
      algorithm: "HS256",
    });
    res.json(token);
  };
});

const JWTValidacion = (req,res,next) => {
  const token = req.header("Authorization");
  if(token==undefined){
    res.status(401).send("Token no valido.")
  }
  try{
    const decode  = jwt.verify(token, secretKey);
    if(decode.permisos == "admin"){
      req.headers == {...req.headers, permisos: "admin"}
    } else {
      req.headers == {...req.headers, permisos: "usuario"}
    }
    next();
  }catch(error){
    res.redirect('/login');
  }
};

app.use('/listar', JWTValidacion, listViewRouter);
app.use('/editar', JWTValidacion, listEditRouter);

app.get('/', JWTValidacion, (req, res) => {

    res.status(200).send("Bienvenido a tu organizador de tareas.");

});


app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});