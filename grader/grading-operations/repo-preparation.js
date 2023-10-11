const path = require("path");
const { execSync } = require("child_process");
const { findAndDelete, javaCompile, javaExecute } = require("./command-helpers");
const { TARBALL_NAME, TARBALL_REMOTE, JUNIT_JAR_NAME, JUNIT_JAR_REMOTE } = require("../constants");
const helpers = require("../report/md-helpers");

/**
 * @param {string} cwd working directory
 * @param {Array<string>} output file output line array
 */
const prepareDirectory = (cwd, output) => {
  output.push(helpers.h3("Preparing directory for grading (blocks should be empty)"));

  output.push(helpers.p("Deleting class and jar files, lib, target and tests directories"));
  output.push(helpers.codeBlockStart("sh"));
  output.push(execSync(findAndDelete(cwd, "*.class")).toString());
  output.push(execSync(findAndDelete(cwd, "*.jar")).toString());
  output.push(execSync(`rm -rf ${cwd}/{target,tests,lib,${TARBALL_NAME.replace(".jar", "")}*}`).toString());
  output.push(execSync(`rm -rf ${cwd}/lexer/daos/TokenKind.java`).toString());
  output.push(execSync(`rm -rf ${cwd}/lexer/SymbolTable.java`).toString());
  output.push(helpers.codeBlockEnd());

  output.push(helpers.p("Replacing tests and junit jar"));
  output.push(helpers.codeBlockStart("sh"));
  output.push(execSync(`mkdir ${path.join(cwd, 'tests')}`).toString());
  output.push(execSync(`wget -q -O ${path.join(cwd, TARBALL_NAME)} ${TARBALL_REMOTE}`).toString());
  output.push(execSync(`tar -xf ${path.join(cwd, TARBALL_NAME)} -C ${cwd}`).toString());
  output.push(execSync(`rm -rf ${path.join(cwd, TARBALL_NAME)}`).toString());
  output.push(execSync(`mkdir ${path.join(cwd, 'lib')}`).toString());
  output.push(execSync(`wget -q -O ${path.join(cwd, 'lib', JUNIT_JAR_NAME)} ${JUNIT_JAR_REMOTE}`).toString());
  output.push(helpers.codeBlockEnd());

  output.push(helpers.p("Running tool runner"));
  output.push(helpers.codeBlockStart("sh"));
  try {
    output.push(execSync(javaCompile(cwd, path.join('lexer', 'tools', 'ToolRunner.java'))).toString());
    output.push(execSync(javaExecute(cwd, "lexer.tools.ToolRunner"), { cwd }).toString());
    output.push(helpers.codeBlockEnd());
  } catch (err) {
    output.push(err.stdout.toString());
    output.push(helpers.codeBlockEnd());
    output.push(helpers.p(`<span style="color: red; font-weight: bold;">Tool runner failed to run, unable to continue grading.</span>`));
    throw "Tool runner failed to execute, skipping grading...";
  }

}

module.exports = {
  prepareDirectory
}