import { app, BrowserWindow, ipcMain, screen } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import { config } from 'dotenv';
import LocalStorage from './utils/LocalStorage.js';
import { STORAGE_KEYS, TASK_STORAGE_NAME } from './constants/storage-keys.js';
import { HANDLERS } from './constants/handlers.js';
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
  const storage = LocalStorage.getInstance({
    configName: TASK_STORAGE_NAME,
    defaults: {
      tasks: [],
    },
  });

  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  const width = Math.min(800, screenWidth);
  const height = Math.min(1000, screenHeight);

  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
  } else {
    const indexPath = path.join(__dirname, 'dist/index.html');
    win.loadFile(indexPath);
  }

  // win.webContents.openDevTools({ mode: 'undocked' });

  ipcMain.handle(HANDLERS.GET_TASKS, async () => storage.get(STORAGE_KEYS.TASKS));

  ipcMain.handle(HANDLERS.ADD_TASK, async (_, task) => {
    const tasks = storage.get(STORAGE_KEYS.TASKS);

    tasks.push(task);

    storage.set(STORAGE_KEYS.TASKS, tasks);
    return tasks;
  });

  ipcMain.handle(HANDLERS.UPDATE_TASK, async (_, task) => {
    const tasks = storage.get(STORAGE_KEYS.TASKS);
    console.log(task);

    const index = tasks.findIndex((t) => t.uuid === task.uuid);

    if (index === -1) {
      console.error('Task not found');
      return tasks;
    }

    tasks[index] = task;

    storage.set(STORAGE_KEYS.TASKS, tasks);
    return tasks;
  });

  ipcMain.handle(HANDLERS.DELETE_TASK, async (_, uuid) => {
    const tasks = storage.get(STORAGE_KEYS.TASKS);

    const index = tasks.findIndex((t) => t.uuid === uuid);

    if (index === -1) {
      console.error('Task not found');
      return tasks;
    }

    tasks.splice(index, 1);

    storage.set(STORAGE_KEYS.TASKS, tasks);
    return tasks;
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  Object.values(HANDLERS).forEach((handler) => ipcMain.removeHandler(handler));

  if (process.platform !== 'darwin') {
    app.quit();
  }
});
