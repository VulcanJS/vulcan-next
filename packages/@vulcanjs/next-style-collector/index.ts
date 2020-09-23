/**
 * Generic helpers to build a lib that will collect styles in the Next application,
 * such as Material UI, Styled Components...
 *
 * May become unnecessary when Next introduces packages?
 */

// Generic interface to respect
export interface AppSheetsCollector {
  sheets: { getStyleElement: Function }; // minimum spec to respect for a collector
  enhanceApp: Function; // function used in ctx.renderPage, so the sheet can collect styles
  finally?: Function;
}
