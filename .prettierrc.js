module.exports = {
  importOrder: ["^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
