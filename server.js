const express = require("express");
const app = express();
const db = require("./database.js");

const HTTP_PORT = 8000;

// Server starten mit Console: node server.js (Name dieser Datei)
// Mit nodemon werden Änderungen aktualisiert: nodemon server.js
app.listen(HTTP_PORT, () =>{
    console.log(`Server running on port ${HTTP_PORT}`);
});


// Endpunkte definieren
// req = Das was vom Client kommt
// res = Die Antwort vom Server
app.get("/api", (req, res)=>{
    res.json({message: "OK"})
});
app.get("/api/todos", (req, res)=>{
    let sql = "SELECT * FROM todo";
    let params = [];
    
    db.all(sql, params, (err, rows)=>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }

       res.json({
        message: "OK",
        data: rows,
       }) 
    });
});
app.get("/api/todo/:id", (req, res)=>{

});
app.post("/api/todo", (req, res)=>{
    
});
app.patch("/api/todo/:id", (req, res)=>{

});
app.delete("/api/todo/:id", (req, res)=>{

});

app.use((req, res)=>{
    res.status(404).json({
        message: "Das war wohl nix"
    })
})