const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html")
})

app.post ("/", function(req,res){

  const email = (req.body.email);
  const nombre = (req.body.name);
  const apellido = (req.body.apellido);

  







})









app.listen (3000, function(){
  console.log("Server running on port 3000");
})
