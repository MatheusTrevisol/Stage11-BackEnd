const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path"); /* resolver problemas de caminhos de diretórios dependendo do sistema operacional */

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"), /*dirname é o caminho atual, voltando uma pasta, e criando um arquivo db. */
    driver: sqlite3.Database
  });

  return database;
}

module.exports = sqliteConnection;