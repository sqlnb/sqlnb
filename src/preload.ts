import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {

    name: "MyCoolAPI",

    greet: (name: string = "World") => `Hello, ${name}!`,
    
});

