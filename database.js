const sqlite3 = require("sqlite3");

let db = new sqlite3.Database("todo.db", (err)=>{
    if(err){
        throw err;
    }
})