module.exports = {
  importOrder: ["^@foo/(.*)$", "^[./]"],
  importOrderSeparation: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
