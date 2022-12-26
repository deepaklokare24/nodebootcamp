console.log(require("module").wrapper);

const Calculator = require("./calc1");
const calci = new Calculator();

console.log(calci.add(2, 8));

const { add, mul } = require("./calc2");

console.log(mul(2, 10));
