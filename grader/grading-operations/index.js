const { javaCompile, javaExecute, findAndDelete } = require("./command-helpers");
const { prepareDirectory } = require("./repo-preparation");
const { runTests } = require("./run-tests");
const { manualTest } = require("./manual-test");

module.exports = {
  javaCompile, javaExecute, findAndDelete,
  prepareDirectory,
  runTests,
  manualTest
}