### Datentypen

**NULL.** = Der Wert ist NULL

**INTEGER.** = Der Wert ist eine Ganzzahl (8 Byte)

**REAL.** = Der Wert ist eine Kommazahl (8 Byte)

**TEXT.** = Der Wert ist eine Zeichenfolge (UTF-X)

**BLOB.** = Der Wert ist ein Datenblock, der unverändert gespeichert wird

**NUMERIC** = Der Wert ist eine Zahl oder Boolean

Boolean werden als 0(false) und 1(true) gespeichert

***

### REST erstellen
- Node.js Projekt erstellen `npm init -y`  
- Node.js Packete instalieren `npm i express sqlite3`  
- Nodemon instalieren `npm i -g nodemon` (Tool um Server nicht immer neu starten zu müssen)
- Datei erstellen z.B. `server.js`  
- Server starten `node server.js` oder `nodemon server.js`

***

### REST Testen
Installiere dieses Plugin: Thunder Client
Es dient zum Testen der API, ein neues Symbol erscheint in der Menüleiste.  
Im neuen Fenster kann eine `New Request` erstellt werden (Ältere werden im Verlauf gespeichert) Im simulierten Browser den gewünschten Endpunkt eingeben und schauen was passiert.

***

### CORSE
Ein Packet muss nachinstaliert werden: `npm i cors`  
Das muss in der server.js benutzt werden

```
const cors = require("cors");
app.use(cors());
```

***

### Endpunkte
Endpunkte müssen in server.js erstellt werden.  
Parameter req = Das was vom Client kommt  
Parameter res = Die Antwort vom Server  
```
app.get("/api", (req, res)=>{
    res.json({message: "OK"})
});
```

***

### Was tun bei Bugs
- Fehler reproduzieren 
- Ort(Code) wo der Fehler auftritt anschauen 
- Programmverlauf folgen