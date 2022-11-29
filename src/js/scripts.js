import { v4 as uuid } from 'uuid';
document.addEventListener("DOMContentLoaded", init);

const tasks = [
  {
    id: uuid(),
    name: "накидать HTML",
    checked: false
  },
  {
    id: uuid(),
    name: "накидать CSS",
    checked: false
  },
  {
    id: uuid(),
    name: "Сделать чекбоксы",
    checked: false
  },
]

function init() {
  initAddTaskForm();
  renderTaskList()
};

function initAddTaskForm() {
  const form = document.querySelector("#form");
  const submitBtn = document.querySelector("#form-submit-btn");
  const inputName = form.name;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    e.stopPropagation();

    if (inputName.value) {
      tasks.push({
        id: uuid(),
        name: inputName.value,
        checked: false
      });
      renderTaskList();
      form.reset();
    }
    
    inputName.focus();
  });
  
  inputName.addEventListener("keyup", function() {
    if (inputName.value) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  })
}

function renderTaskList() {
  const list = document.querySelector("#list");
  list.innerHTML = "";
  tasks.forEach(function(task) {
    const newTask = createToDoElement(task)
    list.append(newTask)
  })
}

function createToDoElement(task) {
  const node = document.createElement("li");
  node.classList.add("list__item");
  node.innerHTML = `
    <label>
      <input type="checkbox">${task.name}
    </label>
    <button class="list__btn-del">-</button>
  `;
  return node;
}
