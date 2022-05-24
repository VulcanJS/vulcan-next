#! /usr/bin/node
function run() {
  if ((process.env.PROJECT_CWD || "").match(/vulcan-npm/)) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}
run();
//#  @see https://yarnpkg.com/advanced/lifecycle-scripts/#environment-variables
//[[ "$PROJECT_CWD" == *"vulcan-npm"* ]]
