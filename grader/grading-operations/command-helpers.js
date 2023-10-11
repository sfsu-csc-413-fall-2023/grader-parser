const path = require("path");

/** 
 * @param {string} startingDirectory absolute path to repository directory
 */
const findAllSource = (startingDirectory) =>
  `find ${startingDirectory} -name "*.java"`

/** 
 * @param {string} startingDirectory absolute path to repository directory
 * @param {string} deleting file name(s) to delete
 * @returns {string}
 */
const findAndDelete = (startingDirectory, deleting) =>
  `find ${startingDirectory} -name "${deleting} -type f -delete"`

/**
* @param {string} startingDirectory absolute path to repository directory
* @param {string} resources resources to compile
* @returns {string}
*/
const javaCompile = (startingDirectory, resources) =>
  `javac -d ${path.join(startingDirectory, 'target')} -cp ${startingDirectory} ${path.join(startingDirectory, resources)}`

/**
* @param {string} startingDirectory absolute path to repository directory
* @param {string} className name of class to execute (fully qualified)
* @returns {string}
*/
const javaExecute = (startingDirectory, className) =>
  `java -cp ${path.join(startingDirectory, 'target')} ${className}`

module.exports = {
  findAllSource,
  findAndDelete, javaCompile, javaExecute
}