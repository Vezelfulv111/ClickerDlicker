import http from "http";
import fs from "fs";

class Server {
    #countryMap = new Map();
    constructor(configPath){
        const conf = JSON.parse(fs.readFileSync(configPath, "utf8"));
        this.host = conf.server.host;
        this.port = conf.server.port;
    }

    #initCoutries() {
        const data = fs.readFileSync('country_list.txt', 'utf8');
        const countries = data.trim().split('\n');

        // Создание Map с именами стран в качестве ключей и значениями BigInt
        countries.forEach(country => {
            this.#countryMap.set(country, BigInt(0));
        });
    }

    init() {
    this.#initCoutries();
    const instance = http.createServer((req, res) => {
     if (req.method === 'POST') {
         let body = '';

         // Handling incoming POST data
         req.on('data', chunk => {
             body += chunk.toString(); // Convert buffer to string
             const parts = body.split(':');
             const country = parts[0];
             const number = BigInt(parts[1]);
             if (this.#countryMap.has(country)) {
                 const currentValue = this.#countryMap.get(country);
                 this.#countryMap.set(country, currentValue + number);
             }
         });

         // Complete processing of data
         req.on('end', () => {
             // Output the POST data as a string to the console
             console.log('POST from client: ' + body);
             res.writeHead(200, { 'Content-Type': 'text/plain' });
             res.end('Data received successfully!\n');
         });
     } else {
         res.writeHead(405, { 'Content-Type': 'text/plain' });
         res.end('Method Not Allowed, POST request expected\n');
     }
    });

    instance.listen(this.port, this.host, () => {
     console.log(`Server is running on http://${this.port}:${this.host}`);
    });
 }
}

export default Server
