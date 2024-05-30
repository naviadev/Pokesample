const db = require('better-sqlite3')

class DatabaseController{
  constructor(){
    this.db = new db('./db/user_data.db', { verbose: console.log });
  }
  InsertUserData(mail, pw){
    let register = this.db.prepare('insert into user (email, password) values (?, ?)')
    register.run(mail,pw)
  }
}

module.exports = DatabaseController;