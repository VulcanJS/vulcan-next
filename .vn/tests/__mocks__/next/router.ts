// https://klzns.github.io/how-to-use-type-script-and-jest-mocks
// Doesn't work well, so we mock functions one by one
//const router = jest.genMockFromModule("next/router");

// FXIME: We can't import the actual lib in the mock, so we can't type it correctly
// import { NextRouter } from "next/router" // TODO: use this type + jest.Mock to improve typings
let routerMock = {};

// named export will be used by the actual code when writing "import { useRouter } from "next/router"
export const useRouter = jest.fn(() => ({
  // default mock
  query: {},
  pathname: "",
  replace: jest.fn(),
  push: jest.fn(),
  // custom mock
  ...routerMock,
}));

// helpers to change some return values
const __mockUseRouterResult = (mockedRes: Object): void => {
  routerMock = mockedRes;
};
const __resetUseRouterResult = (mockedRes: Object): void => {
  routerMock = {};
};

// Export used when we write "import router from "next/router"", eg in tests
// We can add aditionnal imports here, see example test for useMapQueryParams for usage
export default {
  useRouter,
  __mockUseRouterResult,
  __resetUseRouterResult,
};
