



let add = document.querySelector(".addContainer");
let dataContainer = document.querySelector(".dataContainer");
let status;
let tasklistBtn = document.querySelector(".tasklist");
let completedTaskBtn = document.querySelector(".completed");
let id;
add.addEventListener("click", () => {
  completedTaskBtn.classList.remove("select");
  addItem();
});

function addItem(){
  let div = document.createElement("div");
  div.classList.add("todoData");
  div.innerHTML = `<input type="checkbox" name="check" class="check" unchecked>
    <input
      type="text"
      placeholder="Enter your task Here"
      class="title"
    />
    <i class="material-icons del">delete</i>`;

  var uid = new ShortUniqueId();
  let id = uid();
  let obj = {
    id: `${id}`,
    checkState: "unchecked",
    data: "",
  };

  // console.log(uid())
  ///local storage
  let todoLocalData = JSON.parse(localStorage.getItem("todoLocalData"));
  if (todoLocalData == null) todoLocalData = [];
  todoLocalData.push(obj);
  localStorage.setItem("todoLocalData", JSON.stringify(todoLocalData));

  let todoData = div;
  let checkBox = div.querySelector(".check");
  let title = div.querySelector(".title");

  checkBox.addEventListener("click", (e) => {
    checkedBox(e.currentTarget,id,todoData);
  });

  ////////////////////input box
  title.addEventListener("input", (e) => {
    changeValue(e.currentTarget,id);
  });

  div.querySelector(".del").addEventListener("click", (e) => {
    div.remove();
    deleteItem(id);
  });
  ///append data
  dataContainer.appendChild(div);
}


function checkedBox(target,id,todoData){
  if (target.getAttribute("checked") == null) {
    target.setAttribute("checked", "true");
    //////////////////////////add in completed

    ///local storage
    let todoLocalData = JSON.parse(localStorage.getItem("todoLocalData"));
    if (todoLocalData == null) todoLocalData = [];

    for (let i = 0; i < todoLocalData.length; i++) {
      if (todoLocalData[i].id == id) {
        todoLocalData[i].checkState = "checked";
      }
    }
    localStorage.setItem("todoLocalData", JSON.stringify(todoLocalData));
  } else {
    target.removeAttribute("checked");
    // todoData.classList.add("checkBox");

    let todoLocalData = JSON.parse(localStorage.getItem("todoLocalData"));
    if (todoLocalData == null) todoLocalData = [];

    for (let i = 0; i < todoLocalData.length; i++) {
      if (todoLocalData[i].id == id) {
        todoLocalData[i].checkState = "unchecked";
      }
    }

    localStorage.setItem("todoLocalData", JSON.stringify(todoLocalData));
  }
  todoData.classList.add("checkBox");

}

function changeValue(target,id) {
  let todoLocalData = JSON.parse(localStorage.getItem("todoLocalData"));
  if (todoLocalData == null) todoLocalData = [];

  for (let i = 0; i < todoLocalData.length; i++) {
    if (todoLocalData[i].id == id) {
      todoLocalData[i].data = target.value;
    }
  }

  localStorage.setItem("todoLocalData", JSON.stringify(todoLocalData));
}

function deleteItem(id) {
  let todoLocalData = JSON.parse(localStorage.getItem("todoLocalData"));
  if (todoLocalData == null) todoLocalData = [];

  todoLocalData = todoLocalData.filter((ele) => {
    return ele.id != id;
  });

  localStorage.setItem("todoLocalData", JSON.stringify(todoLocalData));
}
