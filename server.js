const express = require("express");
const app = express();

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
// app.get();
// app.post();
// app.patch();
// app.delete();