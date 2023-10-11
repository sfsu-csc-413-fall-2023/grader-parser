const path = require("path");
const { execSync } = require("child_process");
const helpers = require("../report/md-helpers");
const { findAllSource } = require("./command-helpers");
const { JUNIT_JAR_NAME, SOURCE_FILE, TESTS } = require("../constants");
const { manualTest } = require("./manual-test");

/**
 * @param {Array<string>} testOutput 
 */
const testPointResult = (testOutput = []) => {
  const results = {};

  if (testOutput.length === 0) {
    return {
      found: 1,
      skipped: 0,
      started: 0,
      aborted: 0,
      successful: 0,
      failed: 0
    }
  }

  results.found = testResultToInt(testOutput, "tests found", 1);
  results.skipped = testResultToInt(testOutput, "tests skipped");
  results.started = testResultToInt(testOutput, "tests started");
  results.aborted = testResultToInt(testOutput, "tests aborted");
  results.successful = testResultToInt(testOutput, "tests successful");
  results.failed = testResultToInt(testOutput, "tests failed");

  return results;
}

/**
 * 
 * @param {Array<string>} output 
 * @param {string} searchString 
 * @param {number} defaultValue
 */
const testResultToInt = (output, searchString, defaultValue = 0) => {
  const result = output.find(line => line.includes(searchString));

  if (result === undefined) {
    return defaultValue;
  } else {
    return parseInt(result.replace("[", "").replace("]", "").trim().replace(searchString, ""));
  }
}

const runSingleTest = (cwd, fullyQualifiedTestMethod) => {
  const testCommand = `java -jar ${path.join(cwd, 'lib', JUNIT_JAR_NAME)} -cp ${path.join(cwd, 'target')} -m ${fullyQualifiedTestMethod}`;

  let output = ""

  try {
    output = execSync(testCommand).toString();
  } catch (err) {
    // console.log(`Test failed: ${testCommand}`)
    output = err.stdout.toString();
  }

  return output.split(/\r?\n/).filter(line =>
    !(line.includes('Thanks for using JUnit!') || line.includes('Test run finished') || line.includes('containers'))
  );
}

/**
 * @param {string} cwd working directory
 * @param {Array<string>} output file output line array
 */
const runTests = (cwd, output) => {
  console.log("     * Compiling source");
  output.push(helpers.h3("Compiling all source"));
  output.push(helpers.codeBlockStart("sh"));
  execSync(`${findAllSource(cwd)} > ${path.join(cwd, SOURCE_FILE)}`);
  try {
    output.push(
      execSync(`javac -d ${path.join(cwd, 'target')} -cp ${cwd}:${path.join(cwd, 'lib', JUNIT_JAR_NAME)} @${path.join(cwd, SOURCE_FILE)}`).toString()
    );
  } catch (err) {
    output.push(helpers.codeBlockEnd());
    output.push(helpers.p(helpers.b("Failed to compile, skipping grading...")))

    output.push(helpers.h4("stdout"));
    output.push(helpers.codeBlockStart("sh"));
    output.push(err.stdout.toString());
    output.push(helpers.codeBlockEnd());

    output.push(helpers.h4("stderr"));
    output.push(helpers.codeBlockStart("sh"));
    output.push(err.stderr.toString())
    output.push(helpers.codeBlockEnd());

    execSync(`rm -rf ${path.join(cwd, SOURCE_FILE)}`);
    return;
  }
  execSync(`rm -rf ${path.join(cwd, SOURCE_FILE)}`)
  output.push(helpers.codeBlockEnd());

  manualTest(cwd, output);

  let totalAssignmentPoints = 0;
  let earnedAssignmentPoints = 0;
  const testResultOutput = [];
  const testResultSummary = [];

  console.log("     * Running tests ");
  TESTS.forEach(({ group, tests }) => {
    testResultOutput.push(helpers.h4(group));
    process.stdout.write(`          - ${group} `)

    tests.forEach(({ description, pointValue, fullyQualifiedTestMethod }) => {
      const testResult = runSingleTest(cwd, fullyQualifiedTestMethod);

      testResultOutput.push(helpers.h5(`${description} (${pointValue})`))
      const pointResult = testPointResult(testResult);

      totalAssignmentPoints = totalAssignmentPoints + pointValue;
      earnedAssignmentPoints = earnedAssignmentPoints + (pointValue * (pointResult.successful / pointResult.found));

      testResultSummary.push(
        `| ${description} | ${pointValue} | ${pointValue * (pointResult.successful / pointResult.found)} | ${pointResult.started === 0 ? "Failed to run" : pointResult.found} | ${pointResult.started === 0 ? "Failed to run" : pointResult.successful} | ${pointResult.started === 0 ? "Failed to run" : pointResult.failed} |\n`
      );

      testResultOutput.push(helpers.codeBlockStart("sh"));
      testResult.filter(line => line.trim().length !== 0 || line.includes("[")).forEach(line => {
        testResultOutput.push(line.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "") + "\n");
      })
      testResultOutput.push(helpers.codeBlockEnd());
      process.stdout.write("✔");
    })
    console.log();
  });

  output.push(helpers.h4(`Test Summary (${earnedAssignmentPoints}/${totalAssignmentPoints})`));
  output.push(`| Test | Points Possible | Points Earned | Test Count | Successful | Failed|\n`);
  output.push(`| --- | --- | --- | --- | --- | ---|\n`);
  output.push(...testResultSummary);
  output.push(`| | ${helpers.b(totalAssignmentPoints)} | ${helpers.b(earnedAssignmentPoints)} | | | |`)
  output.push(...testResultOutput);
}

module.exports = {
  runTests
}