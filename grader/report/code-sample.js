const fs = require("fs");
const path = require("path");
const helpers = require("./md-helpers");

/**
 * @param {string} filePath
 * @param {string} fileName
 * @returns Array<string>
 */
const codeSample = (filePath, fileName) => {
  const lexerSource = fs.readFileSync(filePath).toString().split(/\r?\n/);

  const output = [];

  output.push(helpers.h2(`Code Sample (${fileName})`));
  output.push(helpers.codeBlockStart("java"));
  output.push(lexerSource.join("\n"));
  output.push(helpers.codeBlockEnd());
  output.push("\n");

  return output;
}

module.exports = { codeSample }