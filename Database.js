import pg from 'pg';
import fs from "fs";

class Database {
    constructor(configPath){
        const conf = JSON.parse(fs.readFileSync(configPath, "utf8"));
        this.pool = new pg.Pool({ // Сохраняем pool как член класса
            user: conf.db.user,
            host: conf.db.host,
            database: conf.db.database,
            password: conf.db.password,
            port: conf.db.port,
        });
    }

    init() {
        this.pool.query('SELECT NOW()', (err, res) => {
            if (err) {
                console.error('Error executing query', err);
                this.isConnected = false;
            } else {
                console.log('Connected to PostgreSQL. Current date is:', res.rows[0].now);
                this.isConnected = true;
            }
        });
    }
}

export default Database
