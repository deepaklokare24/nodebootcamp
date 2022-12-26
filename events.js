const EventEmitter = require("events");

const myEvents = new EventEmitter();

myEvents.on("newSale", () => {
  console.log("The new Sales has started...");
});

myEvents.on("newSale", () => {
  console.log("The sale is running fine...");
});

myEvents.on("newSale", (stocks) => {
  console.log(`There are ${stocks} items left in stock 😀🥹😅🥰`);
});

myEvents.emit("newSale", 123);
