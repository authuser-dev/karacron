import { mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const workspaceRoot = process.cwd();
const localCacheRoot = path.join(workspaceRoot, ".cache");
const goCacheDir = process.env.GOCACHE || path.join(localCacheRoot, "go-build");
const localAppDataDir =
	process.env.LocalAppData || path.join(localCacheRoot, "localappdata");

mkdirSync(goCacheDir, { recursive: true });
mkdirSync(localAppDataDir, { recursive: true });

const args = process.argv.slice(2);
if (args.length === 0) {
	console.error("Usage: node scripts/go-with-cache.mjs <go-args...>");
	process.exit(1);
}

const result = spawnSync("go", args, {
	stdio: "inherit",
	env: {
		...process.env,
		GOCACHE: goCacheDir,
		LocalAppData: localAppDataDir,
	},
	shell: process.platform === "win32",
});

if (typeof result.status === "number") {
	process.exit(result.status);
}

process.exit(1);
