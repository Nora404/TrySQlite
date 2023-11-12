const express = require("express");
const app = express();
const db = require("./database.js");

app.use(express.json());

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

// -----------------------------------------------------------

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
       }); 
    });
});

// -----------------------------------------------------------

app.get("/api/todo/:id", (req, res)=>{
    let sql = "SELECT * FROM todo WHERE id = ?";
    let params = [req.params.id];

    db.get(sql, params, (err, row)=>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }

        res.json({
            message: "OK",
            data: row,
        }); 
    });
});

// -----------------------------------------------------------

app.post("/api/todo", (req, res)=>{
    let errors = [];

    if(!req.body.name){
        errors.push("no name");
    }
    if(!req.body.description){
        errors.push("no text");
    }

    if(errors.length){
        res.status(400).json({
            error: errors,
        });
    }

    let data = {
        name: req.body.name,
        description: req.body.description,
        created: Date.now(),
        updated: Date.now()
    };

    let sql = "INSERT INTO todo (name, description, created, updated) VALUES (?,?,?,?)";
    let params = [data.name, data.description, data.created, data.updated];

    // funktion statt Arrow wegen dem Scope 
    db.run(sql, params, function(err) {
        if(err){
            res.status(400).json({error: err.message});
            return;
        }

        res.json({
            message: "OK",
            data: data,
            // this ist hier die db
            id: this.lastID,
        }); 
    });
});

// -----------------------------------------------------------

app.patch("/api/todo/:id", (req, res)=>{

});

// -----------------------------------------------------------

app.delete("/api/todo/:id", (req, res)=>{

});

// -----------------------------------------------------------

app.use((req, res)=>{
    res.status(404).json({
        message: "Das war wohl nix"
    })
})