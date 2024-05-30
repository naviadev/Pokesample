const http = require('http');
const fs = require('fs');
const DatabaseController = require('./betterSQLite/DB_Controller.js')


http.createServer((req,res)=>{
  let body = ""
  if(req.url.includes('login') ){
    req.on("data", data => body += data );
    req.on("end", () => {
      let data = JSON.parse(body);
      loginModule(data);
    })
  }

}).listen(3001, ()=>{console.log('3001 api server start')});

let loginModule = (data)=>{
  let email = data.email;
  let pw = data.pw;
  
  
}