const express = require("express");
const app = express();
const db = require("./database.js");

// Das ist, damit der body (req) gefüllt werden kann
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

// Ein neues Todo wird hinzugefügt
app.post("/api/todo", (req, res)=>{
    let errors = [];

    // Erstmal Fehlerbehandlung, ist etwas drin?
    if(!req.body.name){
        errors.push("no name");
    }
    if(!req.body.description){
        errors.push("no text");
    }

    // Wenn ja dann sende die errors
    if(errors.length){
        res.status(400).json({
            error: errors,
        });
    }

    // Jetzt Daten aufsammeln und vorbereiten
    let data = {
        name: req.body.name,
        description: req.body.description,
        complete: 0,
        created: Date.now(),
        updated: Date.now()
    };

    // Nun den SQLite befehl zusammen setzten
    // Erinnerung, die ? sind Platzhalter
    let sql = "INSERT INTO todo (name, description, complete, created, updated) VALUES (?,?,?,?,?)";
    let params = [data.name, data.description, data.complete, data.created, data.updated];

    // funktion statt Arrow wegen dem Scope 
    // damit this sich auf die das db Objekt bezieht
    db.run(sql, params, function(err) {
        if(err){
            res.status(400).json({error: err.message});
            return;
        }

        res.json({
            message: "OK",
            data: data,
            id: this.lastID,
        }); 
    });
});

// -----------------------------------------------------------

// Das ist das Update
app.patch("/api/todo/:id", (req, res)=>{
    let data = {
        name: req.body.name,
        description: req.body.description,
        complete: req.body.complete,
        updated: Date.now()
    };

    // Neue coole Funkstion: COALESCE(?, name)
    // Hier nimmt er entweder den neuen Wert oder nimmt den alten Wert
    // Es gibt den ersten Wert zurück, der nicht NULL ist
    let sql = `UPDATE todo SET
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        complete = COALESCE(?, complete),
        updated = ?
        WHERE id = ?`;

    // Die ID muss aus der URL rausgeholt werden, darum req.params.id
    let params = [data.name, data.description, data.complete, data.updated, req.params.id];  

    db.run(sql, params, function(err){
        if(err){
            res.status(400).json({error: err.message});
            return;
        }

        res.json({
            message: "OK",
            data: data,
            changes: this.changes,
        });
    })

});

// -----------------------------------------------------------

app.delete("/api/todo/:id", (req, res)=>{
    let sql = "DELETE FROM todo WHERE id = ?";
    let params = [req.params.id];

    db.run(sql, params, function(err){
        if(err){
            res.status(400).json({error: err.message});
            return;
        }

        res.json({
            message: "OK",
            changes: this.changes,
        });
    });
});

// -----------------------------------------------------------

app.use((req, res)=>{
    res.status(404).json({
        message: "Das war wohl nix"
    })
})