import esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import esbuildPluginTsc from 'esbuild-plugin-tsc'

esbuild.build({
  entryPoints: ['./src/server.ts'],
  outfile: './dist/bundle.js',
  bundle: true,
  loader: {
    '.ts': 'ts', // Specify the TypeScript loader
  },
  format: 'esm',  // Ensure output is in ES module format
  plugins: [nodeExternalsPlugin(), esbuildPluginTsc()],
  platform: 'node',  // Target platform is Node.js
}).catch(() => process.exit(1));
