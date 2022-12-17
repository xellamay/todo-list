import { v4 as uuid } from "uuid";

class TaskListService {
  constructor(initialValues = [], onUpdate) {
    this._list = initialValues;
    this._onUpdate = onUpdate;
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

    this._onUpdate(this._list)
  }
  updateById(id, payLoad = {}) {
    const findIndex = this._list.findIndex((el) => el.id === id);
    if (findIndex !== -1) {
      this._list[findIndex] = {
        ...payLoad,
        id: id
      }

      this._onUpdate(this._list)
    }
  }
  toggleTaskById(id) {
    const findIndex = this._list.findIndex((el) => el.id === id);
    if (findIndex !== -1) {
      const currentTask = this._list[findIndex];
      currentTask.checked = !currentTask.checked;

      this._onUpdate(this._list)
    }
  }
  deleteById(id) {
    this._list = this._list.filter((el) => el.id !== id);

    this._onUpdate(this._list)
  }
};

export default TaskListService;