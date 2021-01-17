const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {

  const email = (req.body.email);
  const nombre = (req.body.name);
  const apellido = (req.body.apellido);

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: nombre,
        LNAME: apellido,
      }

    }]
  }
  const jsonData = JSON.stringify(data);

  const url = 'https://us7.api.mailchimp.com/3.0/lists/247e04ae7b'
  const options = {

    method: 'POST',
    auth: "pepe:25d84f0b8b6e112545423ef53a49fd24-us7"
  }

  const request = https.request(url, options, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      console.log(JSON.parse(data));

      if (response.statusCode === 200){
        res.sendFile(__dirname+"/success.html")
      } else{
        res.sendFile(__dirname+"/failure.html")
      }
    })
  })

  request.write(jsonData)
  request.end();





})

app.post("/success", function(req, res){
  res.redirect("/");
})
app.post("/failure", function(req, res){
  res.redirect("/");
})








app.listen(3000, function() {
  console.log("Server running on port 3000");
})
