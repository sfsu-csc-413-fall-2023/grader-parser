const fs = require("fs");
const path = require("path");
const { findStudentName } = require("./find-student-name");
const helpers = require("./md-helpers");
const { DUE_DATE } = require("../constants");
const { execSync } = require("child_process");

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

  const lexerSource = fs.readFileSync(
    path.join(directory, 'lexer', 'Lexer.java')
  ).toString().split(/\r?\n/);

  output.push(helpers.h2("Code Sample (Lexer.java)"));
  output.push(helpers.codeBlockStart("java"));
  output.push(lexerSource.join("\n"));
  output.push(helpers.codeBlockEnd());

  return studentName;
}

module.exports = { initReport }