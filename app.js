var express = require('express');
var app = express();
var qs = require("querystring");
var http = require("https");


app.use(express.static('dist/demo'));
//app.use(express.static('public'));
//app.use(express.static('src'));


app.get("/url/:index", (req, res, next) => {
 console.log(req.params.index);
 res.json(["Tony","Lisa","Michael","Ginger","Food"][req.params.index]);
});
app.get("/questions/:total", (req, res, next) => {
    console.log(req.query.categories);
    console.log(qs.stringify(req.query));

    getQuestionsAndRefreshToken(req, res);


});

var token="";
function getQuestions(req){return new Promise(function(resolve, reject) {
    var options_salesforce = {
        "method": "GET",
        "hostname": "resourceful-moose-9ygm0z-dev-ed.my.salesforce.com",
        "port": null,
        "path": `/services/apexrest/Questions?${qs.stringify(req.query)}&total=${req.params.total}`,
        "headers": {
            "authorization": `Bearer ${token}`,
            "cache-control": "no-cache",
    }
    };

    var req_salesforce = http.request(options_salesforce, function (res_s) {
    var chunks = [];

    res_s.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res_s.on("end", function () {
        var body = Buffer.concat(chunks);
        //console.log(body.toString());
        reject(JSON.parse(body.toString()));
        resolve(JSON.parse(body.toString()));
        //res.set('Content-Type', 'application/json');
        //res.send(body);
    });
    });

    req_salesforce.end();
  
});
}

function getToken(){return new Promise(function(resolve, reject) {
  
    var sc={}
    if(!process.env.salesforce_password){
        sc=require("./mycredentials");
        console.log(sc);
    }

    var options = {
  "method": "POST",
  "hostname": "login.salesforce.com",
  "port": null,
  "path": "/services/oauth2/token",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache"
  }
}

req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    resolve(JSON.parse(body.toString()).access_token);
    });
});

    req.write(qs.stringify({ grant_type: 'password',
        password: process.env.salesforce_password||sc.password,
        username: process.env.salesforce_username||sc.username,
        client_secret: process.env.salesforce_client_secret||sc.client_secret,
        client_id: process.env.salesforce_client_id||sc.client_id }));
    req.end();  
  
});
}

async function getQuestionsAndRefreshToken(req, res){
    
    //res.set('Content-Type', 'application/json');
    
    try {
        var questions = await getQuestions(req);
        res.send(questions);
    } catch(e) {
        
        token= await getToken();
        try{
            var questions = await getQuestions(req);
            res.send(questions);
        }catch(e){
            res.send(e)
        }  
    }
}




app.listen(process.env.PORT || 5000, () => {
 console.log("Server running on port 5000");
});