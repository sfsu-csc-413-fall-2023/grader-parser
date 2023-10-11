const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");
const { initReport, outputReport } = require("./report");
const { prepareDirectory, runTests } = require("./grading-operations");

module.exports = (basePath) => {
  if (!fs.existsSync("reports")) {
    fs.mkdirSync("reports");
  }
  if (!fs.existsSync("graded")) {
    fs.mkdirSync("graded");
  }
  if (!fs.existsSync("failed")) {
    fs.mkdirSync("failed");
  }

  fs.readdirSync(basePath).forEach(
    (directoryName) => {
      console.log(`---> Starting at ${new Date().toLocaleTimeString()}`)
      const reportLines = [];

      const repo = path.join(basePath, directoryName);

      const studentName = initReport(repo, reportLines);

      try {
        prepareDirectory(repo, reportLines);
        runTests(repo, reportLines);
        outputReport(repo, reportLines);
      } catch (err) {
        console.log(err);
        outputReport(repo, reportLines);
      }

      try {
        const cpCommand = `cp ${path.join(repo, "REPORT.md")} ${path.join(__dirname, "..", "reports", studentName.replace(/\s+/g, ".") + ".md")}`;

        execSync(cpCommand);
        execSync(`mv ${repo} ${path.join(__dirname, "..", "graded")}`);
      } catch (err) {
        console.log(`Error encountered for ${repo} while copying results or moving to completed...`);
        execSync(`mv ${repo} ${path.join(__dirname, "..", "failed")}`)
      }
      console.log(`<--- Ending at ${new Date().toLocaleTimeString()}`)
    }
  );
}
