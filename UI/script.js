const workToDoContainer = document.querySelector(".work-todo-container");
// const addButton = document.querySelector(".add-button");
const addWorkBackground = document.querySelector(".add-work-background");
const addWorkContainer = document.querySelector(".add-work-container");
const workInfoTitle = document.querySelector("#work-info-title");
const workInfoDescription = document.querySelector("#work-info-description");
const workCancelButton = document.querySelector(".work-cancel-button");
const workAddButton = document.querySelector(".work-add-button");
const workEditButton = document.querySelector(".work-edit-button");
const workDeleteButton = document.querySelector(".work-delete-button");

function showAddWork() {
  addWorkBackground.classList.add("add");
  addWorkContainer.classList.add("slide");
}

function addWork() {
  if (
    !(workInfoTitle.value.trim() === "") &&
    !(workInfoDescription.value.trim() === "")
  ) {
    let toDoId = Math.random().toString(36).substring(2, 7);

    pywebview.api
      .save_task(
        toDoId,
        workInfoTitle.value,
        workInfoDescription.value,
        false,
        Date().toLocaleString(),
      )
      .then(function () {
        let rawHTML = `
        <div class="work-todo" id="${toDoId}">
          <label for="checkbox-${toDoId}" class="todo-checkbox-label">
            <input
              type="checkbox"
              class="todo-checkbox"
              id="checkbox-${toDoId}"
              onchange="checkToDo(this, '${toDoId}')"
            />
            <svg viewBox="0 -960 960 960">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label class="todo-info" onclick="viewToDo('${toDoId}')">
            ${workInfoTitle.value.trim()}
          </label>
          <button class="todo-edit-button" onlclick="editToDo()">
            <svg viewBox="0 -960 960 960">
              <path
                d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
              />
            </svg>
          </button>
          <button class="todo-delete-button" onclick="deleteToDo()">
            <svg viewBox="0 -960 960 960">
              <path
                d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"
              />
            </svg>
          </button>
        </div>`;

        workToDoContainer.lastElementChild.insertAdjacentHTML(
          "beforebegin",
          rawHTML,
        );
        workInfoTitle.value = "";
        workInfoDescription.value = "";
        addWorkBackground.classList.remove("add");
        addWorkContainer.classList.remove("slide");
      });
  }
}

function cancelAddWork() {
  addWorkBackground.classList.remove("add");
  addWorkBackground.classList.remove("view");
  addWorkContainer.classList.remove("slide");
}

function checkToDo(checkbox, id) {
  let toDo = document.querySelector(`#${id}`);
  if (checkbox.checked) {
    toDo.querySelector(".todo-checkbox-label").classList.add("check");
  } else {
    toDo.querySelector(".todo-checkbox-label").classList.remove("check");
  }
}

function viewToDo() {
  addWorkBackground.classList.add("view");
  addWorkContainer.classList.add("slide");
  // workInfoTitle.value =
}
