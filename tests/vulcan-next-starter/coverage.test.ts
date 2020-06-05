import path from "path";
import fs from "fs";
import shell from "shelljs";
import { spawn } from "child_process";

const isDebug = !!process.env.DEBUG;
const rootDir = path.resolve(__dirname, "../../");
describe("code coverage", () => {
  beforeAll(() => {
    const res = shell.exec("COVERAGE=1 npm run build", {
      async: false,
      silent: !isDebug,
    });
    expect(res.code).toEqual(0);
  }, 10000);
  test("instruments code in e2e test and compute coverage", (done) => {
    shell.rm("-rf", "coverage-e2e");
    shell.rm("-rf", ".nyc_output");
    const npmBin = path.resolve(rootDir, "node_modules/.bin");
    const runAppTestMode = " npm run start:test";
    const runBasicTest = `${npmBin}/cypress run --spec cypress/integration/vulcan-next-starter/basic.spec.ts`;
    const rawCmd = `${npmBin}/start-server-and-test`;
    const args = [runAppTestMode, "http://localhost:3000", runBasicTest];
    const cmdStr = `COVERAGE=1 ${rawCmd} ${args.join(" ")}`;
    // @see https://stackoverflow.com/questions/56016550/node-js-cannot-kill-process-executed-with-child-process-exec
    // We need the detached spawn hack, because child.kill do not kill subprocesses
    // => creates issues with Jest
    //const child = shell.exec(cmdStr, {
    //  async: true,
    //  silent: !process.env.DEBUG,
    //});
    const child = spawn(rawCmd, args, {
      env: { ...process.env, COVERAGE: "1" },
      detached: true,
    });
    child.stdout.on("data", (data) => {
      if (isDebug) console.log("STDOUT:", data.toString());
    });
    child.stderr.on("data", (data) => {
      if (isDebug) console.log("STDERR:", data.toString());
    });
    child.on("exit", (code) => {
      try {
        //child.kill();
        process.kill(-child.pid); // kill subprocess too
        expect(code).toEqual(0);
        const nycFolder = path.resolve(__dirname, "../../.nyc_output");
        expect(fs.existsSync(nycFolder)).toBe(true);
        const nycOutputPath = path.resolve(nycFolder, "out.json");
        const nycOutputStr = fs.openSync(nycOutputPath, "r").toString();
        const nycOutputJSON = JSON.parse(nycOutputStr);
        expect(nycOutputJSON).not.toEqual({});
      } finally {
        done();
      }
    });
  }, 25000 /* bigger timeout */);
  test.skip("instruments code in unit test and compute coverage", () => {
    shell.rm("-rf", "coverage-unit");
    shell.rm("-rf", ".nyc_output");
  });
});
