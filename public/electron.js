const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron')

const url = require('url');
const path = require('path');

function createMainWindow(){
    const scale = 0.8; //declare scale first
    const mainWindow = new BrowserWindow({
        title:'PomodoroTimer',
        width: Math.round(512*scale),
        height: Math.round(580*scale),
        resizable: false,
        frame: false,
        titleBarStyle: 'hidden',
        webPreferences:{
            preload: path.join (__dirname,"preload.js"), //path to preload script
            contextIsolation: true, //keep context isolated for security
            nodeIntegration: false, //disables Node.js in the renderer
        }
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'), //connect to the react app
        protocol: 'file:',
        slashes: true,

    });
    //the three dots
    mainWindow.setWindowButtonVisibility(false);
    //menu bar eg. file, edit
    mainWindow.setMenuBarVisibility(false);
    
    mainWindow.loadURL(startUrl); //load app in electron window

    mainWindow.webContents.on('did-finish-load',() =>{
        mainWindow.webContents.setZoomFactor(scale); //80% zoom
    })

    //listen for 'close-app' event
    ipcMain.on('close-app',() =>{
        app.quit();
    })


}

app.whenReady().then(createMainWindow)