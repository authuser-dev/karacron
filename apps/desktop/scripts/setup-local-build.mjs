import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const cacheDir = path.join(
	os.homedir(),
	'AppData',
	'Local',
	'electron-builder',
	'Cache',
	'winCodeSign',
);

fs.mkdirSync(cacheDir, { recursive: true });

console.log(`electron-builder cache ready at ${cacheDir}`);
