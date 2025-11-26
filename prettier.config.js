//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  semi: true,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn', 'cva'],
  tailwindStylesheet: './src/styles.css',
}

export default config
