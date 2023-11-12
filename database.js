const sqlite3 = require("sqlite3");

let db = new sqlite3.Database("todo.db", (err)=>{
    if(err){
        throw err;
    }
    console.log("connected to database");
    
    db.run(
        `CREATE TABLE todo(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            complete INTEGER NOT NULL,
            created INTEGER NOT NULL,
            updated INTEGER NOT NULL
        );`,
        // Gibt es die Tabelle schon wird ein Error geworfen
        (err) => {
            if(err){
                console.log(err.message);
                return;
            }

            // Die ? sind Platzhalter
            var insert = "INSERT INTO todo (name, description, complete, created, updated) VALUES (?,?,?,?,?)";

            db.run(insert, [
                "Einkaufen gehen",
                "Ich brauche mehr Kuchen",
                0,
                Date.now(),
                Date.now()
            ]);
            db.run(insert, [
                "Staubsaugen",
                "Die Wollmäuse werden zu groß!",
                0,
                Date.now(),
                Date.now()
            ]);
        }
    );
});

module.exports = db;