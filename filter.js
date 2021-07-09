



tasklistBtn.addEventListener("click", (e) => {
  changeFilter(e.currentTarget,completedTaskBtn,"unchecked")

  });
  
  completedTaskBtn.addEventListener("click", (e) => {
    changeFilter(e.currentTarget,tasklistBtn,"checked")
  });
  
 function changeFilter(target,nbr,check){

  if (target.classList.contains("select") == false) {
    target.classList.add("select");
    nbr.classList.remove("select");

    dataContainer.innerHTML = ``;

    let todoLocalData = JSON.parse(localStorage.getItem("todoLocalData"));
    if (todoLocalData == null) todoLocalData = [];

    let local = todoLocalData.filter((ele)=>{
      return ele.checkState == check;
    })

    for(let i =0 ; i<local.length;i++){
      addFiltredData(check,local[i].data,local[i].id)
    }

  }

 }

  function addFiltredData(checkedState,data,id){
    let div = document.createElement("div");
  div.classList.add("todoData");

  if(checkedState == "unchecked"){
    div.innerHTML = `<input type="checkbox" name="check" class="check" unchecked >
    <input
      type="text"
      placeholder="Enter your task Here"
      class="title"
      value = "${data}"
    />
    <i class="material-icons del">delete</i>`;
  }else{
    div.innerHTML = `<input type="checkbox" name="check" class="check" checked >
    <input
      type="text"
      placeholder="Enter your task Here"
      class="title"
      value ="${data}"
    />
    <i class="material-icons del">delete</i>`;
  }

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

  dataContainer.appendChild(div);


  }

function onRefresh(){
  let todoLocalData = JSON.parse(localStorage.getItem("todoLocalData"));
  if (todoLocalData == null) todoLocalData = [];
  
  let local = todoLocalData.filter((ele)=>{
    return ele.checkState == "unchecked";
  })
  
  for(let i =0 ; i<local.length;i++){
    addFiltredData("unchecked",local[i].data,local[i].id)
  }
}

onRefresh();