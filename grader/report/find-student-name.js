/**
 * @param {string} directory
 * @param {Array<string>} lines 
 * @returns string
 */
const findStudentName = (directory, lines) => {
  for (index = 0; index < lines.length; index++) {
    if (lines[index].startsWith("Author:")) {
      let studentName = lines[index].replace("Author:", "").trim();

      if (studentName.indexOf("please") !== -1) {
        studentName = studentName.replace("(please keep the Author: heading for my grading script)", "").trim();
      }

      if (studentName.startsWith("Your")) {
        return `Unknown${Math.floor(Math.random() * 100000)}`
      } else {
        return studentName;
      }
    }
  }

  return `Author line not found (${directory})`;
}

module.exports = { findStudentName }