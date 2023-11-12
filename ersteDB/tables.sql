
-- Tabelle löschen
DROP TABLE users;
Drop TABLE role;

-- Tabelle anlegen
CREATE TABLE users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  passwort TEXT NOT NULL,
  email TEXT NOT NULL,
  role_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role (id) -- 1 zu n Beziehung
);

CREATE TABLE role(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rolename TEXT NOT NULL,
  description TEXT NULL
);

-- Datensatz speichern
INSERT INTO 
    users (username, passwort, email, role_id)
VALUES 
    ("Karina", "Dory4me", "karina@gmail.com", 2),
    ("Ina", "Chii4me", "ina@gmail.com", 3),
    ("Knuddel", "123PW", "knuddel@gmail.com", 1)    

INSERT INTO 
    role (rolename, description)
VALUES 
    ("Admin", "Darf alles"),
    ("Devoloper", "Soll programmieren"),
    ("Azubi", "Muss gehorchen")


-- Daten auslesen
SELECT username as name, passwort FROM users;

-- Daten mit Bedingung
SELECT * FROM users WHERE username = "Karina";
SELECT * FROM users WHERE id = 2;
SELECT * FROM users ORDER BY username ASC;

-- Daten aktualisieren
UPDATE users SET passwort = "nichtGut123" WHERE id = 3;
UPDATE users SET passwort = "nichtGut123", email = "knuddel@gmx.de" WHERE id = 3;


-- Datensätze aus mehreren Tabellen
SELECT * FROM users LEFT JOIN role ON users.role_id = role.id;
SELECT 
  users.id, 
  users.username, 
  role.rolename, 
  role.description 
  FROM users LEFT JOIN role ON users.role_id = role.id
  ORDER BY role.id DESC;


-- Datensätze löschen
DELETE FROM users WHERE id = 2;
DELETE FROM users WHERE role_id = 3;  


