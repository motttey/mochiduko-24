// Global declarations for style imports.
//
// Next.js ships typings for CSS Modules, but plain side-effect CSS imports
// (e.g. `import "@mantine/core/styles.css";`) may still need a module
// declaration depending on TS config.

declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";

declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
declare module "*.module.scss" {
  const classes: Record<string, string>;
  export default classes;
}
declare module "*.module.sass" {
  const classes: Record<string, string>;
  export default classes;
}
declare module "*.module.less" {
  const classes: Record<string, string>;
  export default classes;
}