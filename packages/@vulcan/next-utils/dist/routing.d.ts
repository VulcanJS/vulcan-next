import React from "react";
import { NextPage, NextPageContext } from "next";
export declare const redirectServer: (ctx: NextPageContext) => (pathname: string) => void;
interface RedirectResult {
    authProps?: Object;
    redirection?: string;
    isAllowed: boolean;
}
interface PrivateAccessOptions {
    defaultRedirection?: string;
    isAllowedServer: (pageProps: any, ctx: NextPageContext) => Promise<RedirectResult>;
    isAllowedClient: (props: any, ctx?: NextPageContext) => Promise<RedirectResult>;
    LoaderComponent: React.ComponentType;
}
interface PrivatePageProps {
    isStaticExport?: boolean;
    isServerRender?: boolean;
    isAllowedDuringSSR?: boolean;
}
export declare const withPrivateAccess: (hocOptions?: Partial<PrivateAccessOptions>) => (Page: NextPage, pageOptions?: Partial<PrivateAccessOptions>) => React.FunctionComponent<PrivatePageProps> & {
    getInitialProps?(context: NextPageContext): PrivatePageProps | Promise<PrivatePageProps>;
};
export {};
