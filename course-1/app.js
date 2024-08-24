const path = require('path');
const os = require('os');
const fs = require('fs');
const EventEmitter = require('events');
const http = require('http');
const server = http.createServer((req, res) => {
if(req.url === '/'){
    res.write("hello world!");
    res.end();
}

if(req.url === '/api/courses'){
    res.write(JSON.stringify([1,2,3]));
    res.end();
}
});

// server.on('connection',(socket) => {
//     console.log('New connection ...');
// })

server.listen(3000);



const Logger = require("./logger");
const logger = new Logger();

logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});



var pathInfo = path.parse(__filename);
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
// const file = fs.readdirSync('./');

fs.readdir('./', function(err,file){
    if (err) console.log('Error', err);
    else console.log('Result: ',file);
})



logger.log('message');
console.log(pathInfo);
console.log(`Total memory: ${totalMemory}`);
console.log(`Free memory: ${freeMemory}`);
console.log('Listening on port 3000 ...');
// console.log(file);



