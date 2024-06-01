const http = require('http');
const fs = require('fs');
const DatabaseController = require('./betterSQLite/DB_Controller.js');
const crypto = require('crypto');
const Database = require('better-sqlite3');


http.createServer((req, res) => {
  let body = ""

  console.log(req.url);

  if (req.url.includes('login')) {
    req.on("data", data => body += data);

    req.on("end", () => {
      
      let data = JSON.parse(body);
      
      loginModule(data, res);
    })
  }

  if (req.url.includes('register')) {
    req.on("data", data => body += data);
    req.on("end", () => {
      let data = JSON.parse(body);
      registerModule(data, res);
    })
  }

  // GET
  if (req.url.includes('emailCheck')) {
    let email = req.url.split('/emailCheck/')
    let db = new DatabaseController();
    let resultBool = db.checkUserEmail(email[1]);

    resultBool ?
      res.writeHead(200, { 'Access-Control-Allow-Origin': '*' }) :
      res.writeHead(201, { 'Access-Control-Allow-Origin': '*' });

    res.end();
  }

}).listen(3001, () => { console.log('3001 api server start') });





let loginModule = (data, res) => {
  let byteLength = 12;
  let email = data.email;
  let pw = data.pw;

  let db = new DatabaseController();
  let userObj = db.checkLoginData(email, pw);
  console.log(userObj)
  if(userObj !== undefined && userObj !== null){
    let randKey = crypto.randomBytes(byteLength).toString('hex');
    res.writeHead(201, { 'Set-Cookie' : `${randKey}` , 'Access-Control-Allow-Origin': '*'});
    res.end();
  }else{
    res.writeHead(204, { 'Set-Cookie' : `${randKey}` , 'Access-Control-Allow-Origin': '*'});
    res.end();
  }
}
  
let registerModule = (data, res) => {
  let name = data.name;
  let email = data.email;
  let emailURL = data.emailURL;
  let pw = data.pw;

  let db = new DatabaseController();
  db.insertUserData(`${email}@${emailURL}`, name, pw)

  res.writeHead(200, { 'Access-Control-Allow-Origin': '*' })

  res.end()
}