import { app, BrowserWindow, Menu } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
	const window = new BrowserWindow({
		width: 1440,
		height: 960,
		minWidth: 1100,
		minHeight: 760,
		autoHideMenuBar: true,
		backgroundColor: '#0a0a0a',
		webPreferences: {
			preload: path.join(__dirname, '../preload/index.js'),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	if (!app.isPackaged) {
		void window.loadURL('http://localhost:3000');
		window.webContents.openDevTools({ mode: 'detach' });
		return;
	}

	const bundledIndex = path.join(process.resourcesPath, 'web', 'index.html');
	void window.loadFile(bundledIndex);
}

app.whenReady().then(() => {
	Menu.setApplicationMenu(null);
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
