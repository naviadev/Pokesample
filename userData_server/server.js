const http = require('http');
const fs = require('fs');
const DatabaseController = require('./betterSQLite/DB_Controller.js');
const { register } = require('module');

// const { express } = require('express');
// const { cors } = require('cors')

// const app = express();

// app.use(cors({
//   origin : '*'
// }))

http.createServer((req, res) => {
  let body = ""

  if (req.url.includes('login')) {
    req.on("data", data => body += data);
    req.on("end", () => {
      let data = JSON.parse(body);
      loginModule(data);
    })
  }

  if (req.url.includes('register')) {
    req.on("data", data => body += data);
    req.on("end", () => {
      let data = JSON.parse(body);
      registerModule(data);
    })
  }

  // GET
  if (req.url.includes('emailCheck')) {
    let email = req.url.split('/emailCheck/')

    let db = new DatabaseController();
    let resultBool = db.checkUserEmail(email[1]);
    
    resultBool ?
      res.writeHead(200, {'Access-Control-Allow-Origin' : '*'}) :
      res.writeHead(404, {'Access-Control-Allow-Origin' : '*'}) ;

    res.end();
  }

}).listen(3001, () => { console.log('3001 api server start') });

let loginModule = (data) => {
  let email = data.email;
  let pw = data.pw;
}

let registerModule = (data) => {
  let name = data.name;
  let email = data.email;
  let emailURL = data.emailURL;
  let pw = data.pw;
}