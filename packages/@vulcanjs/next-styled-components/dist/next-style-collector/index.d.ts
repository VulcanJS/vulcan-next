export interface AppSheetsCollector {
    sheets: {
        getStyleElement: Function;
    };
    enhanceApp: Function;
    finally?: Function;
}
