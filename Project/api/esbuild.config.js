import esbuild from 'esbuild';
import {nodeExternalsPlugin}  from 'esbuild-node-externals';

esbuild.build({
  entryPoints: ['./src/server.ts'],
  outfile: './dist/bundle.js',
  bundle: true,
  loader: {
    '.ts': 'ts', // Specify the TypeScript loader
  },
  plugins: [nodeExternalsPlugin()],
}).catch(() => process.exit(1));