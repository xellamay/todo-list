import { v4 as uuid } from "uuid";

class TaskListService {
  constructor(initialValues = []) {
    this._list = initialValues;
  }
  get list() {
    return this._list;
  }
  create(name) {
    this._list.push({
      id: uuid(),
      name: name,
      checked: false,
    })
  }
  updateById(id, payLoad = {}) {
    const findIndex = this._list.findIndex((el) => el.id === id);
    if (findIndex !== -1) {
      this._list[findIndex] = {
        ...payLoad,
        id: id
      }
    }
  }
  toggleTaskById(id) {
    const findIndex = this._list.findIndex((el) => el.id === id);
    if (findIndex !== -1) {
      const currentTask = this._list[findIndex];
      currentTask.checked = !currentTask.checked;
    }
  }
  deleteById(id) {
    this._list = this._list.filter((el) => el.id !== id)
  }
};

export default TaskListService;