const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  console.log("Request is received on server");
  // solution 1
  //   fs.readFile(`${__dirname}/txt/big-file.txt`, "utf-8", (err, data) => {
  //     if (err) console.log(err);

  //     res.end(data);
  //   });

  // solution 2
  //   const readable = fs.createReadStream(`${__dirname}/txt/big-file.txt`);

  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   readable.on("end", () => {
  //     res.end();
  //   });

  //   readable.on("error", (err) => {
  //     console.log("Some error occured! ", err);

  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });

  // solution 3
  const readable = fs.createReadStream(`${__dirname}/txt/big-file.txt`);
  readable.pipe(res);
});

server.listen(8000, () => {
  console.log("Listening on port 8000...");
});
