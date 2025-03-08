// eslint-disable-next-line no-undef
const electronApi = window.electron || {
  getTasks: async function () {
    return [];
  },
  addTask: async function (task) {
    return [task];
  },
  updateTask: async function (task) {
    return [task];
  },
  deleteTask: async function () {
    return [];
  },
};

export default electronApi;
