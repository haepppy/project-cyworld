const todoArea = document.querySelector(".todo-area");
const preMonthBtn = document.querySelector("#previous");
const nextMonthBtn = document.querySelector("#next");

const dateSpan = document.createElement("h2");

const today = new Date();
let thisDate = today.getDate();
let thisMonth = today.getMonth();
let thisMonthStr = String(thisMonth + 1).padStart(2, "0");
let thisYear = today.getFullYear();

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
let onDateKey;

let toDos = [];
const toDoForm = document.querySelector("#todoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");
const checkboxArr = document.querySelectorAll("input[type='checkbox']");

const TODOS_KEY = "toDos";
const HIDDEN_STYLE = "hidden";
const ORIGINAL_TITLE = "𝐶𝑎𝑙𝑒𝑛𝑑𝑎𝑟 𝑤𝑖𝑡ℎ 𝑇𝑜 𝑑𝑜 𝑙𝑖𝑠𝑡";

showCalendar(thisMonth, thisYear);

//////calendar
function next(e) {
    console.dir(e)
    thisYear = (thisMonth === 11) ? thisYear + 1 : thisYear;
    thisMonth = (thisMonth + 1) % 12;
    thisStrMonth = String(thisMonth +1).padStart(2, "0");

    showCalendar(thisMonth, thisYear);
};

function previous(e) {
    console.dir(e)
    thisYear = (thisMonth === 0) ? thisYear - 1 : thisYear;
    thisMonth = (thisMonth === 0) ? 11 : thisMonth - 1;
    thisStrMonth = String(thisMonth +1).padStart(2, "0");

    showCalendar(thisMonth, thisYear);
};

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    
    const tBody = document.querySelector(".cal-body");
    tBody.innerHTML = "";

    monthAndYear.innerHTML = "";
    const spanYear = document.createElement("span");
    const spanMonth = document.createElement("span");

    spanYear.innerHTML = year;
    spanMonth.innerHTML = String(month + 1).padStart(2, "0");
    monthAndYear.appendChild(spanYear);
    monthAndYear.appendChild(spanMonth);

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                const cell = document.createElement("td");
                const cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);

            } else if (date > daysInMonth(month, year)) {
                break;

            } else {
                const cell = document.createElement("td");
                const cellText = document.createTextNode(date);
                cell.addEventListener("click", clickDate);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("today-bg");
                };

                let dateKey = `${year}년 ${spanMonth.innerHTML}월 ${date}일`;
                
                let storageValue = localStorage.getItem(dateKey);
                if (storageValue && storageValue !== "[]") {
                    cell.classList.add("haveTodo");
                } else {
                    cell.classList.remove("haveTodo");
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            };

            if(row.children[0]) {
                row.children[0].classList.add("sun-red");
            };
    
            if(row.children[6]) {
                row.children[6].classList.add("sat-blue");
            };
        };
        tBody.appendChild(row);
        
        
    }
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}


function clickDate(e) {
    const cell = e.target;
    const date = e.target.innerText;
    const month = monthAndYear.children[1].innerText;
    const year = monthAndYear.children[0].innerText;

    const clickedCell = document.querySelector(".clicked-bg");

    if (clickedCell) {
        dateSpan.innerText = `${year}년 ${month}월 ${date}일`;

        cell.classList.toggle("clicked-bg");
        clickedCell.classList.remove("clicked-bg");

        if (cell === clickedCell) {
            dateSpan.innerText = `${thisYear}년 ${thisMonthStr}월 ${thisDate}일`;   
        };
    } else {
        console.log(dateSpan)
        dateSpan.innerText = `${year}년 ${month}월 ${date}일`;
        cell.classList.toggle("clicked-bg");
    };

    onDateKey = dateSpan.innerText;

    if (onDateKey) {
        clickDateShowToDo();
    };
};

if (today) {
    
    dateSpan.innerHTML = `${thisYear}년 ${thisMonthStr}월 ${thisDate}일`;
    onDateKey = dateSpan.innerHTML;

    const savedToDos = localStorage.getItem(onDateKey);
    if (savedToDos !== null) {
        let parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos; 
        parsedToDos.forEach(paintToDo); 
    };
};

preMonthBtn.addEventListener("click", previous);
nextMonthBtn.addEventListener("click", next);


/* to do list */


function saveToDos() {
    localStorage.setItem(onDateKey, JSON.stringify(toDos));
    const storageValue = localStorage.getItem(onDateKey);
    
    if(!storageValue || storageValue === "[]") {
        notTodoCell(onDateKey);
    } else {
        haveTodoCell(onDateKey)
    };
};

function deleteToDo(e) {
    const thisLi = e.target.parentElement.parentElement;
    thisLi.remove();
    toDos = toDos.filter((todo) => todo.id !== parseInt(thisLi.id)); 
    saveToDos(); 

};

function checkedI(e) {
    let thisCheckedId = parseInt(e.target.id);
    let index = toDos.findIndex(i => i.checkedId === thisCheckedId);
    let obj = toDos[index];
    const trueValue = true;
    const falseValue = false;
    if (obj.checked) {
        obj.checked = falseValue
    } else {
        obj.checked = trueValue;
    }
    saveToDos();
};

function paintToDo(newTodo) { 
    const li = document.createElement("li");
    li.id = newTodo.id; 

    const span = document.createElement("span");
    span.innerText = newTodo.text; 

    const btn = document.createElement("button");
    const btnSpan = document.createElement("span");
    btnSpan.innerText = "×";
    btn.addEventListener("click", deleteToDo, {capture: true});

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    const checkId = newTodo.checkedId;
    checkBox.id = checkId;
    const thisCheck = newTodo.checked;
    checkBox.checked = thisCheck;
    checkBox.addEventListener("click", checkedI);
    
    const label = document.createElement("label");
    label.htmlFor = checkId;

    const editBtn = document.createElement("span");
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", clickEditBtn);

    li.appendChild(checkBox);
    li.appendChild(label);
    label.appendChild(span);
    btn.appendChild(btnSpan);
    li.appendChild(btn); 
    li.appendChild(editBtn); 
    toDoList.appendChild(li); 
};

function handleToDoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value; 
    toDoInput.value = ""; 
    let newToDoObj = {
        text: newTodo,
        id: Date.now(),
        checkedId: Math.floor(Date.now()/2),
        checked: false,
    }
    toDos.push(newToDoObj);
    paintToDo(newToDoObj); 
    saveToDos();
    console.log(toDoList.scrollTop);
    toDoList.scrollTop = -(toDoList.scrollHeight);
};

function haveTodoCell(e) {
    const cell = document.querySelectorAll("td");
    const regex = /[^0-9]/g;
    const keyCode = String(e.replace(regex, ""));
    const keyCodeOfDate = keyCode.slice(-2);
    
    for(let i = 0; i <= cell.length; i++) {
        if(cell[i].innerText === keyCodeOfDate) {
            cell[i].classList.add("haveTodo");
            break;
        };
    };
};

function notTodoCell(e) {
    const cell = document.querySelectorAll("td");
    const regex = /[^0-9]/g;
    const keyCode = String(e.replace(regex, ""));
    const keyCodeOfDate = keyCode.slice(-2);
    
    for(let i = 0; i <= cell.length; i++) {
        if(cell[i].innerText === keyCodeOfDate) {
            cell[i].classList.remove("haveTodo");
            break;
        };
    };
};

toDoForm.addEventListener("submit", handleToDoSubmit);

function clickDateShowToDo() {
    toDoList.innerHTML = "";
    toDos = [];

    const savedToDos = localStorage.getItem(onDateKey);

    if (savedToDos !== null) {
        const parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos; 
        parsedToDos.forEach(paintToDo); 
    };
}


/* delete all btn */

const deleteAllBtn = document.querySelector("#delete-all");

function deleteAll() {
    toDoList.innerHTML = "";
    toDos = [];
    localStorage.removeItem(onDateKey);
    notTodoCell(onDateKey);
}

deleteAllBtn.addEventListener("click", deleteAll);


/* edit event */

let changedObj;

function pressEnter(e) {
    if(e.keyCode == 13) {
        e.preventDefault();
        console.dir(e);
        const value = e.target.value;
        const span = e.path[2].children[1].lastChild;

        changedObj.text = value;
        span.innerText = String(value);

        e.target.parentElement.remove();
        saveToDos();
    };
};

function clickEditBtn(e) {
    const editOn = e.target.parentElement.children[4];
    console.dir(e);

    if (!editOn) {
        paintEditInput(e);

    } else if(editOn) {
        editClickSubmit(e);
    };
};

function paintEditInput(e) {
    const thisLi = e.target.offsetParent;
    const thisSpan = thisLi.children[1].lastChild;
    const form = document.createElement("form");
    const textArea = document.createElement("textarea");

    textArea.value = String(thisSpan.innerText);
    textArea.className = "edit-textarea";
    textArea.autofocus = true;
    textArea.focus();
    textArea.addEventListener("keydown", pressEnter);

    const thisId = parseInt(thisLi.id);
    const index = toDos.findIndex(i => i.id === thisId);
    changedObj = toDos[index];

    form.appendChild(textArea);
    thisLi.appendChild(form);
}

function editSubmit(e) {
    e.preventDefault();

    const inputValue = e.target.lastChild.value;
    const span = e.path[1].children[1].lastChild;

    changedObj.text = inputValue;
    span.innerText = String(inputValue);

    e.target.remove();
    saveToDos();
}

function editClickSubmit(e) {
    const inputValue = e.target.parentElement.lastChild.firstChild.value;
    const span = e.target.parentElement.children[1].children[0];
    console.dir(e)
    changedObj.text = inputValue;
    span.innerText = String(inputValue);

    e.target.parentElement.lastChild.remove();
    saveToDos();
}