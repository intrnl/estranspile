import * as fs from 'fs/promises';
import * as path from 'path';
import * as process from 'process';
import esbuild from 'esbuild';


let FILE_RE = /(?<!\.d)\.ts$/;

let start = Date.now();

let src_dir = process.argv[2] || 'lib/';
let out_dir = process.argv[3] || 'dist/';
let entries = await recurs(src_dir, (file) => FILE_RE.test(file));


let { warnings } = await esbuild.build({
	entryPoints: entries,
	outdir: out_dir,
	format: 'esm',
	target: 'es2020',
});

for (let { text, location } of warnings) {
	console.warn(`warn: ${text}`);
	console.debug(`${location.file}:${location.line}:${location.column}`);
}

let end = Date.now();
console.log(`Build took ${end - start} ms`);


async function recurs (dirname, callback, prefix = dirname) {
	dirname = path.resolve('.', dirname);

	let listing = await fs.readdir(dirname, { withFileTypes: true });
	let items = [];

	for (let file of listing) {
		let relative = path.join(prefix, file.name);
		let absolute = path.join(dirname, file.name);

		if (file.isDirectory()) {
			items.push(...await recurs(absolute, callback, relative));
		} else {
			if (await callback(relative, absolute, file)) items.push(relative);
		}
	}

	return items;
}
