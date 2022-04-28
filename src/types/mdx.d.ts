// @see https://mdxjs.com/advanced/typescript
declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
declare module "*.md" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
