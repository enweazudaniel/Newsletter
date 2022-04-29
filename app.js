const express = require("express");

const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;


  var data = {
    members:[ {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsondata = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/175d83f6a9";

  const options = {
    method: "POST",
    body: data,
    auth: "danny:58dd29921c819e98806a1021f56cfed2-us14"
  };


  const request = https.request(url, options, function(response){

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname+"/failure.html");
    }



  });

  request.write(jsondata);
  request.end();



});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("You are now live");
});

// API KEY
// 58dd29921c819e98806a1021f56cfed2-us14

// UNIQUE ID
// 175d83f6a9.
