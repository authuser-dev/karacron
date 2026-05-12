import { spawnSync } from "node:child_process";
import process from "node:process";

const env = {
	...process.env,
	PORT: process.env.PORT || "3001",
};

const result = spawnSync(
	"node",
	["scripts/go-with-cache.mjs", "run", "main.go"],
	{
		stdio: "inherit",
		env,
		shell: process.platform === "win32",
	},
);

process.exit(typeof result.status === "number" ? result.status : 1);
