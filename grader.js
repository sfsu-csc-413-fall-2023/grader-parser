#!/opt/homebrew/bin/node

const path = require("path");

require("./grader/")(path.join(__dirname, "submissions"));