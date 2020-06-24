import { NextPageContext } from "next";

export const isServerRenderCtx = (ctx?: NextPageContext) =>
  !!(ctx && ctx.res && ctx.res.writeHead);

export const isStaticExportCtx = (ctx?: NextPageContext) =>
  !!(ctx && ctx.req && !ctx.req.headers);

export const isClientRender = () => typeof window !== "undefined";
