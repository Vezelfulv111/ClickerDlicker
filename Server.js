import http from "http";
import fs from "fs";

class Server {
    constructor(configPath){
        const conf = JSON.parse(fs.readFileSync(configPath, "utf8"));
        this.host = conf.server.host;
        this.port = conf.server.port;
    }
 init() {
     const instance = http.createServer((req, res) => {
         if (req.method === 'POST') {
             let body = '';

             // Handling incoming POST data
             req.on('data', chunk => {
                 body += chunk.toString(); // Convert buffer to string
             });

             // Complete processing of data
             req.on('end', () => {
                 // Output the POST data as a string to the console
                 console.log('POST data from the client:');
                 console.log(body);

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
