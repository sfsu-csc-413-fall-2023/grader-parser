const fs = require("fs");
const path = require("path");
const { findStudentName } = require("./find-student-name");
const helpers = require("./md-helpers");
const { DUE_DATE, SAMPLE_FILES } = require("../constants");
const { execSync } = require("child_process");
const { codeSample } = require("./code-sample")

/**
 * @param {string} directory repository directory
 * @param {Array<string>} output
 */
const initReport = (directory, output) => {
  const readme = fs.readFileSync(
    path.join(directory, "README.md")
  ).toString().split(/\r?\n/);

  const studentName = findStudentName(directory, readme);

  console.log(`Initializing report for student ${studentName} (${directory})`);
  output.push(helpers.h1(`Grading report for ${studentName}`));
  output.push(helpers.p(directory));
  output.push(helpers.p(helpers.i(`Generated on ${new Date().toLocaleDateString()}`)));

  const lastCommitDate = execSync("git log -1 --format=%cd --date=local", { cwd: directory }).toString();
  const commitSummary = execSync("git rev-list HEAD --perl-regexp --author='^((?!github-classroom).*)$' | wc -l", { cwd: directory }).toString().trim();

  output.push(helpers.h2("Repository information"));
  output.push(helpers.p(helpers.i(`Due date was ${DUE_DATE}`)));
  output.push(
    helpers.dl(
      [
        { t: "Last Commit:", d: lastCommitDate },
        { t: "Total Commits by Student:", d: commitSummary }
      ]
    )
  );

  output.push(helpers.h2("Readme"));
  output.push(readme.filter(line => !(line.includes("Review Assignment Due Date") || line.includes("Open in Codespaces"))).join("\n"));

  SAMPLE_FILES.forEach(({ path: pathArray, name }) => {
    output.push(...codeSample(path.join(directory, ...pathArray, name), name));
  })

  return studentName;
}

module.exports = { initReport }