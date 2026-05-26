const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/extension/extension.ts'],
  bundle: true,
  outfile: 'out/extension/extension.js',
  external: ['vscode'],
  format: 'cjs',
  platform: 'node',
  sourcemap: true,
  minify: false,
}).catch(() => process.exit(1));