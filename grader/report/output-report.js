const fs = require("fs");
const path = require("path");

/**
 * @param {string} directory repository directory
 * @param {Array<string>} output 
 */
const outputReport = (directory, output) => {
  fs.writeFileSync(
    path.join(directory, "REPORT.md"),
    output.join("")
  );
}

module.exports = {
  outputReport
}