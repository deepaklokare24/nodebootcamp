const fs = require("fs");

// Blocking code
const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textInput);
const textOutput = `This is what we know about Avacado: \n${textInput} \nCreated on ${new Date(
  Date.now()
).toLocaleString()}`;
fs.writeFileSync("./txt/output.txt", textOutput);
console.log("File is written successfully!");

// Lets try non blocking one

fs.readFile("./txt/start.txt", "utf-8", (error, fileName) => {
  fs.readFile(`./txt/${fileName}.txt`, "utf-8", (err, data1) => {
    if (!err) console.log(data1);
    else console.log(err);

    fs.readFile("./txt/append.txt", "utf-8", (err, data2) => {
      console.log(data2);

      fs.writeFile("./txt/final.txt", `${data1}\n${data2}`, "utf-8", (err) => {
        console.log("final file has been written..!");
      });
    });
  });
});

console.log("---Reading file Asynchronously---");
