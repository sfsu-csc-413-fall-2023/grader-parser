const TARBALL_NAME = "assignment-2a-tests.tar";
const TARBALL_REMOTE = `https://github.com/sfsu-csc-413-fall-2023/grader-parser/raw/main/${TARBALL_NAME}`;
const JUNIT_JAR_NAME = "junit-platform-console-standalone-1.9.3.jar";
const JUNIT_JAR_REMOTE = `https://github.com/sfsu-csc-413-fall-2023/grader-parser/raw/main/lib/${JUNIT_JAR_NAME}`;

const DUE_DATE = "October 15, before midnight"

const SOURCE_FILE = "sources.txt";

const TESTS = [
  {
    group: "Regression Tests",
    tests: [
      {
        description: "Symbol#getLexeme()",
        fullyQualifiedTestMethod: "tests.lexer.daos.SymbolRegressionTest#testGetLexeme",
        pointValue: 1 / 2
      },
      {
        description: "Symbol#getTokenKind()",
        fullyQualifiedTestMethod: "tests.lexer.daos.SymbolRegressionTest#testGetTokenKind",
        pointValue: 1 / 2
      },
      {
        description: "Token#getLexeme()",
        fullyQualifiedTestMethod: "tests.lexer.daos.TokenRegressionTest#testGetLexeme",
        pointValue: 1 / 2
      },
      {
        description: "Token#getTokenKind()",
        fullyQualifiedTestMethod: "tests.lexer.daos.TokenRegressionTest#testGetTokenKind",
        pointValue: 1 / 2
      },
      {
        description: "Token#getLeftPosition()",
        fullyQualifiedTestMethod: "tests.lexer.daos.TokenRegressionTest#testGetLeftPosition",
        pointValue: 1 / 2
      },
      {
        description: "Token#getRightPosition()",
        fullyQualifiedTestMethod: "tests.lexer.daos.TokenRegressionTest#testGetRightPosition",
        pointValue: 1 / 2
      },
      {
        description: "Token#testPrint()",
        fullyQualifiedTestMethod: "tests.lexer.daos.TokenRegressionTest#testTestPrint",
        pointValue: 1 / 2
      },
      {
        description: "SourceFileReader#readOnEmptyFile()",
        fullyQualifiedTestMethod: "tests.lexer.readers.SourceFileReaderRegressionTest#testReadOnEmptyFile",
        pointValue: 1 / 2
      },
      {
        description: "SourceFileReader#readOnlyOneCharacter()",
        fullyQualifiedTestMethod: "tests.lexer.readers.SourceFileReaderRegressionTest#testReadOnlyOneCharacter",
        pointValue: 1 / 2
      },
      {
        description: "SourceFileReader#read()",
        fullyQualifiedTestMethod: "tests.lexer.readers.SourceFileReaderRegressionTest#testRead",
        pointValue: 1 / 2
      },
      {
        description: "SourceFileReader#readEndOfFile()",
        fullyQualifiedTestMethod: "tests.lexer.readers.SourceFileReaderRegressionTest#testReadEndOfFile",
        pointValue: 1 / 2
      },
      {
        description: "SourceFileReader#getColumnOnEmptyFile()",
        fullyQualifiedTestMethod: "tests.lexer.readers.SourceFileReaderRegressionTest#testGetColumnOnEmptyFile",
        pointValue: 1 / 2
      },
      {
        description: "SourceFileReader#getColumn()",
        fullyQualifiedTestMethod: "tests.lexer.readers.SourceFileReaderRegressionTest#testGetColumn",
        pointValue: 1 / 2
      },
      {
        description: "SourceFileReader#getLineNumberOnEmptyFile()",
        fullyQualifiedTestMethod: "tests.lexer.readers.SourceFileReaderRegressionTest#testGetLineNumberOnEmptyFile",
        pointValue: 1 / 2
      },
      {
        description: "SourceFileReader#getLineNumber()",
        fullyQualifiedTestMethod: "tests.lexer.readers.SourceFileReaderRegressionTest#testGetLineNumber",
        pointValue: 1 / 2
      },
      {
        description: "Lexer#endOfFile()",
        fullyQualifiedTestMethod: "tests.lexer.LexerTest#testEndOfFile",
        pointValue: 1 / 2
      },
      {
        description: "Lexer#whitespaceIsIgnored()",
        fullyQualifiedTestMethod: "tests.lexer.LexerTest#testWhitespaceIsIgnored",
        pointValue: 1 / 2
      },
      {
        description: "Lexer#builtInKeywords()",
        fullyQualifiedTestMethod: "\"tests.lexer.LexerTest#testBuiltInOperators\(java.lang.String,lexer.daos.TokenKind,int,int\)\"",
        pointValue: 1 / 2
      },
      {
        description: "Lexer#builtInOperators()",
        fullyQualifiedTestMethod: "\"tests.lexer.LexerTest#testBuiltInOperators\(java.lang.String,lexer.daos.TokenKind,int,int\)\"",
        pointValue: 1 / 2
      },
      {
        description: "Lexer#builtInSeparators()",
        fullyQualifiedTestMethod: "\"tests.lexer.LexerTest#testBuiltInSeparators\(java.lang.String,lexer.daos.TokenKind,int,int\)\"",
        pointValue: 1 / 2
      },
      {
        description: "Lexer#comments()",
        fullyQualifiedTestMethod: "tests.lexer.LexerTest#testComments",
        pointValue: 1 / 2
      },
      {
        description: "Lexer#identifiers()",
        fullyQualifiedTestMethod: "\"tests.lexer.LexerTest#testIdentifiers\(java.lang.String,lexer.daos.TokenKind,int,int\)\"",
        pointValue: 1 / 2
      },
      {
        description: "Lexer#integers()",
        fullyQualifiedTestMethod: "\"tests.lexer.LexerTest#testIntegers\(java.lang.String,lexer.daos.TokenKind,int,int\)\"",
        pointValue: 1 / 2
      },
    ]
  },
  {
    group: "Assignment 1 Tests",
    tests: [
      {
        description: "Token#Token(Symbol,int,int)",
        fullyQualifiedTestMethod: "tests.assignment_1.TokenTest#testLegacyConstructor",
        pointValue: 1 / 2
      },
      {
        description: "Token#Token(Symbol,int,int,int)",
        fullyQualifiedTestMethod: "tests.assignment_1.TokenTest#testNewConstructor",
        pointValue: 2 / 2
      },
      {
        description: "Token#toString()",
        fullyQualifiedTestMethod: "tests.assignment_1.TokenTest#testTokenStringRepresentation",
        pointValue: 4 / 2
      },
      {
        description: "Lexer new keywords",
        fullyQualifiedTestMethod: "\"tests.assignment_1.LexerTest#testAssignmentOneKeywords\(java.lang.String,lexer.daos.TokenKind,int,int\)\"",
        pointValue: 3 / 2
      },
      {
        description: "Lexer new operators",
        fullyQualifiedTestMethod: "\"tests.assignment_1.LexerTest#testAssignmentOneOperators\(java.lang.String,lexer.daos.TokenKind,int,int\)\"",
        pointValue: 1 / 2
      },
      {
        description: "Lexer new separators",
        fullyQualifiedTestMethod: "\"tests.assignment_1.LexerTest#testAssignmentOneSeparators\(java.lang.String,lexer.daos.TokenKind,int,int\)\"",
        pointValue: 1 / 2
      },
      {
        description: "Lexer binary literals",
        fullyQualifiedTestMethod: "\"tests.assignment_1.LexerTest#testBinaryLiterals\(java.lang.String,lexer.daos.TokenKind,int,int\)\"",
        pointValue: 36 / 2
      },
      {
        description: "Lexer failing binary literals",
        fullyQualifiedTestMethod: "\"tests.assignment_1.LexerTest#testFailingBinaryLiterals\(java.lang.String,java.util.List\)\"",
        pointValue: 18 / 2
      },
      {
        description: "Lexer char literals",
        fullyQualifiedTestMethod: "\"tests.assignment_1.LexerTest#testCharLiterals\(java.lang.String,lexer.daos.TokenKind,int,int\)\"",
        pointValue: 16 / 2
      },
      {
        description: "Lexer failing char lit 1",
        fullyQualifiedTestMethod: "tests.assignment_1.LexerTest#testFailingCharLiteralOne",
        pointValue: 5 / 2
      },
      {
        description: "Lexer failing char lit 2",
        fullyQualifiedTestMethod: "tests.assignment_1.LexerTest#testFailingCharLiteralTwo",
        pointValue: 5 / 2
      },
      {
        description: "Lexer failing char lit 3",
        fullyQualifiedTestMethod: "tests.assignment_1.LexerTest#testFailingCharLiteralThree",
        pointValue: 5 / 2
      },
      {
        description: "Lexer output test",
        fullyQualifiedTestMethod: "tests.assignment_1.LexerOutputTest#testLexerOutput",
        pointValue: 6 / 2
      },
      {
        description: "Lexer output test (simple.x)",
        fullyQualifiedTestMethod: "tests.assignment_1.LexerOutputTest#testLexerOutputSimpleX",
        pointValue: 14 / 2
      }
    ]
  }
];

module.exports = {
  TARBALL_NAME, TARBALL_REMOTE, JUNIT_JAR_NAME, JUNIT_JAR_REMOTE,
  DUE_DATE,
  SOURCE_FILE,
  TESTS
}