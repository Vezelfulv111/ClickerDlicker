import Server from './Server.js';
import Database from './Database.js';

const configPath = "./server.json";

const server = new Server(configPath);
server.init();

const database = new Database(configPath);
database.init();
