const inputText = document.querySelector(".input input");
const addBtn = document.querySelector(".input button");
const todoList = document.querySelector(".todoList");
const clearAllBtn = document.querySelector(".footer button")

inputText.onkeyup = () => {
    let userData = inputText.value;

    if (userData.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}


showTask();

addBtn.onclick = () => {
    let userData = inputText.value;

    if (userData != '') {
        let getLocalStorage = localStorage.getItem("New Todo");

        if (getLocalStorage === null) {
            todoArr = [];
        } else {
            todoArr = JSON.parse(getLocalStorage);
        }

        todoArr.push(userData);
        localStorage.setItem("New Todo", JSON.stringify(todoArr));
        showTask();
    } else {
        alert("Error: Your todo text is empty!")
    }
}

function showTask() {
    let getLocalStorage = localStorage.getItem("New Todo");

    if (getLocalStorage == null) {
        todoArr = [];
    } else {
        todoArr = JSON.parse(getLocalStorage);
        // console.log(todoArr);
    }

    const pendingTodo = document.querySelector(".pendingTodo");
    pendingTodo.innerHTML = todoArr.length;

    if (todoArr.length > 0) {
        clearAllBtn.classList.add("active");
    } else {
        clearAllBtn.classList.remove("active");
    }

    let newLiTag = '';
    todoArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="done" onclick="done(${index})"><i class="fa-solid fa-circle-check"></i></span> <span onclick="delTodo(${index})"><i class="fa-solid fa-trash-can"></i></span></li>`;
    });

    todoList.innerHTML = newLiTag;
    inputText.value = '';
}


function delTodo(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    todoArr = JSON.parse(getLocalStorage);

    todoArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(todoArr));
    showTask();
}

function done(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    todoArr = JSON.parse(getLocalStorage);

    todoArr[index] = todoArr[index].strike();
    localStorage.setItem("New Todo", JSON.stringify(todoArr));
    showTask();

}

clearAllBtn.onclick = () => {
    localStorage.removeItem("New Todo");
    addBtn.classList.remove("active");
    clearAllBtn.classList.remove("active");
    showTask();
}