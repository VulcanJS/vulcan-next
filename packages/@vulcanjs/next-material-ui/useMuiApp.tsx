// @see https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
import { useEffect } from "react";

const useMuiApp = () => {
  useEffect(() => {
    // Remove the server-side injected CSS on each render
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
};
export default useMuiApp;
