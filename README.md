# estranspile

Quickly transform source code with esbuild

- No bundling, only quick and dirty transpilation
- No import/export rewrite, append `.js` on your own!
- No JSX transformation

## Usage

```sh
npm install --save-dev @intrnl/estranspile
# pnpm install --save-dev @intrnl/estranspile
# yarn add --dev @intrnl/estranspile
```

```
estranspile [source] [output]
```

By default, it acts on `lib/` folder and outputs to `dist/` folder.
