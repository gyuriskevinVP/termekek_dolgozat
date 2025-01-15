import sqlite from "sqlite3";

const db = new sqlite.Database("./data/database.sqlite");

async function initialize() {
  await dbRun("DROP TABLE IF EXISTS products");
  await dbRun(`CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    brand TEXT,
    description TEXT,
    price INTEGER)`);
  await dbRun(
    `INSERT INTO products (name, brand, description, price) VALUES 
    ("Star Wars Millenium Falcon", "Lego", "LEGO - for adults, recommended for ages 18 and up, LEGO® Star Wars series, release year 2024, pack of 921 building blocks", 23760),
    ("Staw Wars AT-AT", "Lego", "This is the AT-AT (75313) that every LEGO® Star Wars™ fan has been waiting for. This epic Ultimate Collector Series build-and-display model features posable legs and head, cannons with a realistic recoil action, rotating cannons, bomb-drop hatch and a hook to attach to Luke Skywalker’s line, just like in the Battle of Hoth.", 350000),
    ("Eiffel Tower", "Lego", "And it’s not just one of the tallest LEGO sets ever, it’s got one of the largest piece counts too – with 10,001 pieces for an immersive experience from start to finish. The ultimate Paris-themed present, it also makes a top gift idea for travel or history lovers.", 260000)
     `
  );
}

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export { db, dbRun, dbGet, dbAll, initialize };
