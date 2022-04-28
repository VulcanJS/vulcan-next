/**
 * Generic helpers to build a lib that will collect styles in the Next application,
 * such as Material UI, Styled Components, Emotion...
 *
 * May help keeping the ugly logic out of your _document
 */

export interface Sheets {
  getStyleElements: (html: string) => Array<any>; //Element | Array<Element>;
}
// Generic interface to respect
export interface AppSheetsCollector {
  sheets: Sheets; // minimum spec to respect for a collector
  enhanceApp: Function; // function used in ctx.renderPage, so the sheet can collect styles
  finally?: Function;
}
