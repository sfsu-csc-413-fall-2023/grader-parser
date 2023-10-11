const { writeFileSync } = require("fs");
const { helpers } = require("../report/");
const path = require("path");
const { execSync } = require("child_process");
const { javaExecute } = require("./command-helpers");

/**
 * @param {string} cwd repo directory
 * @param {Array<string>} reportLines 
 */
const manualTest = (cwd, reportLines) => {
  reportLines.push(helpers.h4("Manual Test"));

  const fileContent = "iter > binary\nand >= char\nor |- xor\n~";
  const testFilePath = path.join(cwd, "a1tokens.x");
  writeFileSync(testFilePath, fileContent);

  reportLines.push(helpers.h5("Sample File"));
  reportLines.push(helpers.codeBlockStart("sh"));
  reportLines.push(fileContent);
  reportLines.push(helpers.codeBlockEnd());

  reportLines.push(helpers.h5("Expected Results"));
  reportLines.push(helpers.codeBlockStart("sh"));
  reportLines.push("iter                 left: 0        right: 3        line: 1        Iterate\n");
  reportLines.push(">                    left: 5        right: 5        line: 1        Greater\n");
  reportLines.push("binary               left: 7        right: 12       line: 1        BinaryType\n");
  reportLines.push("and                  left: 0        right: 2        line: 2        BoolAnd\n");
  reportLines.push(">=                   left: 4        right: 5        line: 2        GreaterEqual\n");
  reportLines.push("char                 left: 7        right: 10       line: 2        CharType\n");
  reportLines.push("or                   left: 0        right: 1        line: 3        BoolOr\n");
  reportLines.push("|-                   left: 3        right: 4        line: 3        Pipette\n");
  reportLines.push("xor                  left: 6        right: 8        line: 3        BoolXor\n");
  reportLines.push("~                    left: 0        right: 0        line: 4        Tilde\n");

  reportLines.push("  1: iter > binary\n");
  reportLines.push("  2: and >= char\n");
  reportLines.push("  3: or |- xor\n");
  reportLines.push("  4: ~\n");
  reportLines.push(helpers.codeBlockEnd());

  reportLines.push(helpers.h5("Results"));
  reportLines.push(helpers.codeBlockStart("sh"));
  try {
    reportLines.push(execSync(`${javaExecute(cwd, 'lexer.Lexer')} ${testFilePath}`).toString());
  } catch (err) {
    reportLines.push(err.stdout.toString());
    reportLines.push(err.stderr.toString());
  }
  reportLines.push(helpers.codeBlockEnd());
}

module.exports = { manualTest }