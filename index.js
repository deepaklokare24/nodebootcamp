const http = require("http");
const fs = require("fs");
const url = require("url");

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%ID%}/g, product.id);
  output = output
    .replace(/{%PRODUCTNAME%}/g, product.productName)
    .replace(/{%IMAGE%}/g, product.image)
    .replace(/{%QUANTITY%}/g, product.quantity)
    .replace(/{%PRICE%}/g, product.price)
    .replace(/{%FROM%}/g, product.from)
    .replace(/{%NUTRIENTS%}/g, product.nutrients)
    .replace(/{%DESCRIPTION%}/g, product.description);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    const cards = dataObj.map((product) => replaceTemplate(tempCard, product));
    const overviewTemp = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cards);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(overviewTemp);
  } else if (pathname === "/product") {
    const actualProduct = dataObj.filter(
      (product) => product.id === Number(query.id)
    )[0];
    console.log(query.id);
    console.log("--filtered--");
    console.log(actualProduct);
    const productDetails = replaceTemplate(tempProduct, actualProduct);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(productDetails);
  } else if (pathname === "/api") {
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening on port 8000...");
});
