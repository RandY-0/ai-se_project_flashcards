// console.log("10" * 2);
// // 20

// console.log("15" - 5);
// // 10

// console.log(10 / "2");
// // 5

// console.log(10 + "2");
// console.log("15" + 5);

// console.log(Boolean("  "));

const devTerms = {
  iterate: "------*************************************",
  callback: "a function passed as an argument to another function",
  RTFM: "Read the [redacted] manual",
};

const keys = Object.keys(devTerms);

const foundKey = keys.find((key) => {
  return devTerms[key].includes("function");
});

console.log(foundKey);

const entries = Object.entries(devTerms);

const foundEntry = entries.find((entry) => {
  const value = entry[1];
  return value.includes("function");
});

console.log(foundEntry[1]); // "callback"

const inventory = {
  apple: 1.5,
  banana: 0.75,
  orange: 1.0,
  mango: 2.5,
  defaultItem: "unknown",
};

function findItemByPrice(price) {
  const keys = Object.keys(inventory);
  const foundKey = keys.find((key) => inventory[key] === price);
  return foundKey || inventory.defaultItem;
}

console.log(findItemByPrice(1.5));
console.log(findItemByPrice(0.75));
console.log(findItemByPrice(100.0));
console.log(findItemByPrice(1));
console.log(findItemByPrice("2.5"));

let x = 0;
console.log(!x >= 5);

document.querySelector();
