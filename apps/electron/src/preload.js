const { contextBridge, ipcRenderer } = require('electron');

const promiseToNode = (key) => (value) => {
  return ipcRenderer.invoke(key, value);
};

contextBridge.exposeInMainWorld('electron', {
  getTasks: () => promiseToNode('getTasks')(),
  addTask: (task) => promiseToNode('handleAddTask')(task),
  updateTask: (task) => promiseToNode('handleUpdateTask')(task),
  deleteTask: (uuid) => promiseToNode('handleDeleteTask')(uuid),
});
