
-- Tabelle anlegen
CREATE TABLE users(
  username TEXT NOT NULL,
  passwort TEXT NOT NULL,
  email TEXT
)

-- Datensatz speichern
INSERT INTO users (username, passwort, email)
VALUES 
    ("Karina", "Dory4me", "karina@gmail.com"),
    ("Ina", "Chii4me", "ina@gmail.com"),
    ("Knuddel", "123PW", "knuddel@gmail.com")    


-- Tabelle löschen
DROP TABLE users;