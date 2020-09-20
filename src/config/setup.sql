DROP TABLE IF EXISTS autos;
CREATE TABLE autos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  año INTEGER NOT NULL,
  kms INTEGER NOT NULL,
  color TEXT NOT NULL,
  aire_acondicionado BOOLEAN NOT NULL,
  pasajeros INTEGER NOT NULL,
  transmision TEXT NOT NULL,
  created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,
  updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL
);
