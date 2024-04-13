import pg from 'pg';
import fs from "fs";

class Database {
    constructor(configPath, server){
        this.server = server;
        const conf = JSON.parse(fs.readFileSync(configPath, "utf8"));
        this.pool = new pg.Pool({
            user: conf.db.user,
            host: conf.db.host,
            database: conf.db.database,
            password: conf.db.password,
            port: conf.db.port,
        });

        setInterval(this.writeToBd.bind(this), 5000);
    }

    writeToBd() {
        const map = this.server.countyMap();

        const insertValues = Array.from(map, ([country, clicks]) => `('${country}', ${clicks})`).join(',');
        const queryText = `INSERT INTO countries (country, clicks) VALUES ${insertValues} ON CONFLICT (country) DO UPDATE SET clicks = EXCLUDED.clicks`;

        this.pool.query(queryText, (err, res) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Data has been inserted successfully');
            }
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
