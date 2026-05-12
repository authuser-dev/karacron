import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('karaDesktop', {
	platform: process.platform,
});
