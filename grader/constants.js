const TARBALL_NAME = "assignment-2a-tests.tar";
const TARBALL_REMOTE = `https://raw.githubusercontent.com/sfsu-csc-413-fall-2023/grader-parser/main/${TARBALL_NAME}`;
const JUNIT_JAR_NAME = "junit-platform-console-standalone-1.9.3.jar";
const JUNIT_JAR_REMOTE = `https://github.com/sfsu-csc-413-fall-2023/grader-parser/raw/main/lib/${JUNIT_JAR_NAME}`;

const DUE_DATE = "October 15, before midnight"

const SAMPLE_FILES = [
  { path: ['parser'], name: "Parser.java" },
  { path: ['ast', 'trees'], name: "IterationTree.java" }
];

const SOURCE_FILE = "sources.txt";

const TESTS = [
  {
    group: "Regression Tests (Points not awarded if assignment not attempted)",
    tests: [
      {
        description: "Assignment (1 test case)",
        fullyQualifiedTestMethod: "tests.parser.regression.AssignmentStatementTest#testAssignmentStatement",
        pointValue: 1
      },
      {
        description: "Block (1 test case)",
        fullyQualifiedTestMethod: "tests.parser.regression.BlockTest#testStatementBeforeDeclarationThrows",
        pointValue: 1
      },
      {
        description: "Call (3 test cases)",
        fullyQualifiedTestMethod: "\"tests.parser.regression.CallStatementTest#testCallStatement\(java.lang.String,java.util.List\)\"",
        pointValue: 1
      },
      {
        description: "Function declarations (3 test cases)",
        fullyQualifiedTestMethod: "\"tests.parser.regression.FunctionDeclarationTest#testFunctionDeclaration\(java.lang.String,java.util.List\)\"",
        pointValue: 1
      },
      {
        description: "If/Else (1 test case)",
        fullyQualifiedTestMethod: "tests.parser.regression.IfElseStatementTest#testIfStatement",
        pointValue: 1
      },
      {
        description: "Nested block (1 test case)",
        fullyQualifiedTestMethod: "tests.parser.regression.NestedBlockTest#testNestedBlocks",
        pointValue: 1
      },
      {
        description: "Program (1 test case)",
        fullyQualifiedTestMethod: "tests.parser.regression.ProgramTest#testProgram",
        pointValue: 1
      },
      {
        description: "Relational operators (4 ops - ==, !=, <, <=)",
        fullyQualifiedTestMethod: "\"tests.parser.regression.RelationalOperatorTest#testOperator\(java.lang.String\)\"",
        pointValue: 1
      },
      {
        description: "Return (1 test case)",
        fullyQualifiedTestMethod: "tests.parser.regression.ReturnStatementTest#returnStatementTest",
        pointValue: 1
      },
      {
        description: "Types (2 types - int, boolean)",
        fullyQualifiedTestMethod: "\"tests.parser.regression.TypeTest#testTypes\(java.lang.String\)\"",
        pointValue: 1
      },
      {
        description: "Variable declarations (1 test case)",
        fullyQualifiedTestMethod: "tests.parser.regression.VariableDeclarationTest#testVariableDeclaration",
        pointValue: 1
      },
      {
        description: "While (1 test case)",
        fullyQualifiedTestMethod: "tests.parser.regression.WhileStatementTest#testWhileStatement",
        pointValue: 1
      },
    ]
  },
  {
    group: "Assignment 2a Tests",
    tests: [
      {
        description: "New type keywords (2 types - binary, char)",
        fullyQualifiedTestMethod: "\"tests.parser.assignment2a.TypeTest#testTypes\(java.lang.String\)\"",
        pointValue: 6
      },
      {
        description: "New relational operators (2 operators - >, >=)",
        fullyQualifiedTestMethod: "\"tests.parser.assignment2a.RelationalOperatorTest#testOperator\(java.lang.String\)\"",
        pointValue: 2
      },
      {
        description: "New mathematical operators (3 operators - or, xor, and)",
        fullyQualifiedTestMethod: "\"tests.parser.assignment2a.MathematicalOperatorTest#testOperator\(java.lang.String,ast.AST\)\"",
        pointValue: 3
      },
      {
        description: "If without else",
        fullyQualifiedTestMethod: "\"tests.parser.assignment2a.IfStatementTest#testIfStatement\(lexer.ILexer,java.util.List\)\"",
        pointValue: 5
      },
      {
        description: "Iteration statement",
        fullyQualifiedTestMethod: "tests.parser.assignment2a.IterationStatementTest#testIterationStatement",
        pointValue: 16
      },
      {
        description: "Invalid iteration statements (4 cases)",
        fullyQualifiedTestMethod: "\"tests.parser.assignment2a.IterationStatementTest#testInvalidIterationStatement\(java.lang.String\)\"",
        pointValue: 8
      },
      {
        description: "Parser output test (new tokens and productions)",
        fullyQualifiedTestMethod: "tests.parser.assignment2a.ParserOutputTest#testParserOutput",
        pointValue: 10
      },
      {
        description: "Parser output test (simple.x)",
        fullyQualifiedTestMethod: "tests.parser.assignment2a.ParserOutputTest#testParserOutputSimpleX",
        pointValue: 4
      }
    ]
  }
];

module.exports = {
  TARBALL_NAME, TARBALL_REMOTE, JUNIT_JAR_NAME, JUNIT_JAR_REMOTE,
  DUE_DATE,
  SAMPLE_FILES,
  SOURCE_FILE,
  TESTS
}