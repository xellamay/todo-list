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
  renderTaskList();
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
  node.dataset.id = task.id;
  node.innerHTML = `
    <label class="list__inner">
      <input class="list__checkbox" type="checkbox">
        <div class="list__text">${task.name}</div>
    </label>
    <button class="list__btn-del">-</button>
  `;

  // Подготовка checkbox
  const checkboxNode = node.querySelector(".list__checkbox");
  checkboxNode.onclick = doneTask;
  checkboxNode.checked = task.checked;

  // Зачеркивание
  if (task.checked) {
    node.querySelector(".list__text").classList.add("list__text_line");
  }

  // Подготовка кнопки
  node.querySelector("button").onclick = deleteToDoElement;

  return node;
}

function deleteToDoElement(event) {
  const parentNode = event.target.parentNode;
  const taskId = parentNode.dataset.id; 
  const taskIndex = tasks.findIndex(function(el) {
    return el.id === taskId
  });
  
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    renderTaskList();
  }
}

function doneTask(event) {
  const parentNode = event.target.parentNode.parentNode;
  const taskId = parentNode.dataset.id;
  const taskIndex = tasks.findIndex(function(el) {
    return el.id === taskId
  });
  
  if (taskIndex !== -1) {
    const task = tasks[taskIndex]
    task.checked = !task.checked;
    renderTaskList();
  }
}

