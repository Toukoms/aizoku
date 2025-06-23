const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = process.env.NODE_ENV === "development";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 920,
    height: 780,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenuBarVisibility(false);

  if (isDev) {
    // In development, load from localhost
    win.loadURL("http://localhost:3000");
  } else {
    // In production, load the built Next.js app
    const startUrl = path.join(__dirname, ".next/standalone/server.js");

    // Start the Next.js server
    const { spawn } = require("child_process");
    const server = spawn("node", [startUrl], {
      env: { ...process.env, PORT: "3000" },
    });

    // Wait a bit for server to start, then load the URL
    setTimeout(() => {
      win.loadURL("http://localhost:3000");
    }, 2000);
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
