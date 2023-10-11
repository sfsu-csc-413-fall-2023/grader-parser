COMPILE_DIR=target
SOURCE_FILE=sources
JUNIT_JAR=junit-platform-console-standalone-1.9.3.jar
TARBALL=assignment-2a-tests.tar
ASSIGNMENT_GRADER=https://raw.githubusercontent.com/sfsu-csc-413-fall-2023/grader-lexical-analysis/main/

clean:
	@echo "Cleaning project workspace..."
	@find . -name "*.class" -type f -delete
	@rm -rf $(COMPILE_DIR)
	@rm -f $(SOURCE_FILE)
	@rm -f $(TEST_TAR)

# Updates or creates auto-generated files
tools: clean
	@echo "Regenerating files..."
	@javac -d $(COMPILE_DIR) tools/ToolRunner.java
	@java -cp $(COMPILE_DIR) tools.ToolRunner
	@rm -rf $(COMPILE_DIR)

# Cleans then compiles project including tests
all-tests: clean
	@echo "Compiling for testing..."
	@find . -name "*.java" > $(SOURCE_FILE)
	@javac -d $(COMPILE_DIR) -cp $(COMPILE_DIR):lib/$(JUNIT_JAR):. @$(SOURCE_FILE)
	@rm $(SOURCE_FILE)

# Runs all of the tests
test-all: tools all-tests
	@echo "Running tests..."
	@java -jar lib/$(JUNIT_JAR) -cp $(COMPILE_DIR) --disable-banner --include-classname=.* --scan-classpath

package-tests:
	@gtar cf $(TARBALL) tests
	@git add .
	@git commit -m "Test updates (tarball regenerated)"
	@git push