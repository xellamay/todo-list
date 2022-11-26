document.addEventListener("DOMContentLoaded", init);

function init() {
  initAddTask();
};

function initAddTask() {
  const form = document.querySelector("#form");
  const inputName = form.name;
  const list = document.querySelector("#list");

  form.addEventListener("submit", function(e){
    e.preventDefault();
    e.stopPropagation();

    if (inputName.value) {
      const newTask = createToDoElement(inputName.value);
      list.append(newTask);
      form.reset();
    }
    
    inputName.focus();
  });
}

function createToDoElement(name) {
  const node = document.createElement("li");
  node.classList.add("list__item");
  node.innerHTML = `
    <label>
      <input type="checkbox">${name}
    </label>
    <button class="list__btn-del">-</button>
  `;
  return node;
}