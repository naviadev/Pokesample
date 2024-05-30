const http = require('http');
const fs = require('fs');
const Database = require('better-sqlite3');


http.createServer((req,res)=>{
  
  console.log(req.url);  

}).listen(3001);