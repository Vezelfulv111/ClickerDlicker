const http = require("http");
const { Socket } = require("net");
const fs = require("fs");
const configPath = "./config.json";
const configData = JSON.parse(fs.readFileSync(configPath, "utf8"));
const host = configData.host;
const port = configData.port;


const server = http.createServer((req, res) => {
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


server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
