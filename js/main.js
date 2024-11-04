
let data =[
    {
        "title": "reading book",
        "date" : "31/10/2024",
        "isDone" : false
    },
    {
        "title": "creating project",
        "date" : "1/11/2024",
        "isDone" : false
    },
    {
        "title": "studying English",
        "date" : "2/11/2024",
        "isDone" : false
    },
    {
        "title": "visiting my friend",
        "date" : "3/11/2024",
        "isDone" :false
    },
    
    
]

let retrievedData = JSON.parse(localStorage.getItem("tasks"))
if (retrievedData == null){
    data= []
}
 else {
    data = retrievedData;
}


//-----------------------Read-Task------------------------
function ReadTask (){
    let tasks = document.querySelector(".tasks");
    tasks.innerHTML="";
    let index=0;
    for (task of data) {
        tasks.innerHTML += `
        <div class= " ${task.isDone ? 'achieved' : 'task' }">
                            <div class="taskName">
                                <h3>${task.title}</h3>
                                <div class="taskDate">
                                    <i class="fa-regular fa-calendar-days"></i>
                                    ${task.date}
                                </div>
                            </div>
                            <div class="icons">
                                <button class="edit circle"   onclick="EditTask(${index})"><i class="fa-regular fa-pen-to-square"></i></button>
                                ${task.isDone ? 
                                    ` <button class="notDone circle" onclick="DoneTask(${index})"><i class="fa-solid fa-x"></i></button>` 
                                    :`<button class="done circle" onclick="DoneTask(${index})"><i class="fa-solid fa-check"></i></button>`}
                               
                                <button class="delete circle" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
                                
                            </div>
                           </div>
        `
        index++;
    }
}

ReadTask()

//-----------------------Create-Task---------------------
let create = document.querySelector(".create");
create.addEventListener("click",function(){
    let taskName = prompt("please enter your taskName");
    let newDate = new Date();
    let taskDate = newDate.getDate() + "/" +(newDate.getMonth()+1) +"/"+ newDate.getFullYear() + " " + newDate.getHours() + ":" + newDate.getMinutes();
    let taskObj = {
        "title": taskName,
        "date" : taskDate,
        "done" : false
    }
    data.push(taskObj);
    storeTask()
    ReadTask()
})


//------------------------Delete-Task--------------------
function deleteTask(index){
  let isConfirmed = confirm(`are you sure to delete task : ${data[index].title}?`);
  if (isConfirmed){
    data.splice(index, 1);
   storeTask()
    ReadTask()
  }
}

//----------------------Update-Task----------------------

function EditTask (index){
let newName = prompt("enter your New Task Name", `${data[index].title}`);
data[index].title = newName;
storeTask()
ReadTask()
}

//---------------------Done-Task-------------------------
function DoneTask(index){
    if(data[index].isDone) {
        data[index].isDone =false
    }
    else {
        data[index].isDone = true
    }
   storeTask()
   ReadTask()
}

//------------------function-storage----------------------
function storeTask (){
    let dataString = JSON.stringify(data)
   localStorage.setItem("tasks", dataString);
}

