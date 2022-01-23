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

//////month select
/*
const monthAndYear = document.querySelector("#monthAndYear");
const selectMonth = document.querySelector(".seletMonth");

showCalendar(thisMonth, thisYear);

selectMonth.addEventListener("change", function(e) {
    const value = e.target.value;
    const yearMonArr = value.split("-");
    const selectedYear = Number(yearMonArr[0]);
    const selectedMonth = Number(yearMonArr[1]-1);
    thisMonth = selectedMonth;
    thisYear = selectedYear;
    showCalendar(selectedMonth, selectedYear);
})
*/
   
   
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


//////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////
/* delete all btn */

const deleteAllBtn = document.querySelector("#delete-all");

function deleteAll() {
    toDoList.innerHTML = "";
    toDos = [];
    localStorage.removeItem(onDateKey);
    notTodoCell(onDateKey);
}

deleteAllBtn.addEventListener("click", deleteAll);


////////////////////////////////////////////////
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

    /*
    const thisLi = e.target.offsetParent;
    const thisSpan = thisLi.children[1].lastChild;
    const form = document.createElement("form");
    const input = document.createElement("input");

    form.id = 'changeList';
    form.addEventListener("submit", editSubmit);

    input.type = "text";
    input.value = String(thisSpan.innerText);
    input.autofocus = 'true';
    input.className = "change-input";
    thisSpan.innerHTML = "";

    const thisId = parseInt(thisLi.id);
    const index = toDos.findIndex(i => i.id === thisId);
    changedObj = toDos[index];

    form.appendChild(input);
    thisLi.appendChild(form);
    */
}

function editSubmit(e) {
    e.preventDefault();

    const inputValue = e.target.lastChild.value;
    const span = e.path[1].children[1].lastChild;

    changedObj.text = inputValue; //배열 내용 업데이트
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

/*
//옆으로 밀기 이벤트 - touch
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

let moveType = -1;
let hSlope = ((window.innerHeight / 2) / window.innerWidth).toFixed(2) * 0.3;


function getMoveType(x, y) {
    moveType = -1;
    let nDis = x + y;
    if(nDis < 30) {return moveType};

    let slope = Math.abs(parseFloat((y / x).toFixed(2), 10)); 

    if(slope > hSlope) {
        moveType = 1;
    } else {
        moveType = 0;
    }

    return moveType;
}

function touchStart(e) {
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
};

function touchEnd (e) {
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;
    touchMove(e);
};

function touchMove(e) {
    let moveX = startX - endX;
    let moveY = startY - endY;
    moveType = getMoveType(moveX, moveY);

    const target = e.target.tagName;
    if (target == 'SPAN' && moveType === 0) {
        e.target.classList.add(HIDDEN_STYLE);
        promptFunc(e);
    };
};
   
toDoList.addEventListener("touchstart", touchStart, false);
toDoList.addEventListener("touchend", touchEnd, false);


//////custom popup page
const mainTitleArea = document.querySelector(".header--text-area");
const mainTitle = document.querySelector(".header--text-area h1");
const popupPage = document.querySelector(".custom-popup-page")
const editTitleForm = document.querySelector("#editTitleForm");
const editTitleInput = document.querySelector("#editTitle");
const colorBox = document.querySelectorAll(".colorBox");
const reSelectBtn = document.querySelector("#reSelectBtn");

const MAIN_COLOR = "--main-color";
const SUB_COLOR = "--sub-color";
const TITLE = "title";

let savedMainColor = localStorage.getItem(MAIN_COLOR);
let savedSubColor = localStorage.getItem(SUB_COLOR);
const savedTitle = localStorage.getItem(TITLE);

let haveMainColor = false;
let haveSubColor = false;
let mainColor;
let subColor;


function handlePopupClick() {
    popupPage.classList.toggle(HIDDEN_STYLE);
    editTitleInput.value = mainTitle.innerText;
};

function handleColorClick(e) {
    if (!haveMainColor && !haveSubColor) {
        getMainColor(e);
    } else if (haveMainColor && !haveSubColor) {
        getSubColor(e);
    };
};

function getMainColor(e) {
    haveMainColor = true;
    haveSubColor = false;

    const target = e.target;
    target.classList.add("clickedColor");
    mainColor = target.style.backgroundColor;
    document.documentElement.style.setProperty(MAIN_COLOR, mainColor);
    return mainColor;
};

function getSubColor(e) {
    haveMainColor = true;
    haveSubColor = true;
    
    const target = e.target;
    target.classList.add("clickedColor");
    subColor = target.style.backgroundColor;
    document.documentElement.style.setProperty(SUB_COLOR, subColor);
    return subColor
};

function clearClickedColor() {
    colorBox.forEach(target => {
        target.classList.remove("clickedColor");
    })
    haveMainColor = false;
    haveSubColor = false;
}

function handleCustomSub(e) {
    e.preventDefault();
    const value = e.target[1].value;
    
    if(value) {
        localStorage.setItem(TITLE, value);
        mainTitle.innerText = value;
    }else {
        localStorage.setItem(TITLE, ORIGINAL_TITLE);
        mainTitle.innerText = ORIGINAL_TITLE;
    }

    if(mainColor) {
        localStorage.setItem(MAIN_COLOR, mainColor);
    };

    if(subColor) {
        localStorage.setItem(SUB_COLOR, subColor);
    };
    
    popupPage.classList.toggle(HIDDEN_STYLE);
    clearClickedColor()
};


if(localStorage.getItem(TITLE)) {
    mainTitle.innerText = localStorage.getItem(TITLE);
};

if(!savedMainColor) {
    localStorage.setItem(MAIN_COLOR, "#654ea3");
    localStorage.setItem(SUB_COLOR, "#eaafc8");    
}else {
    document.documentElement.style.setProperty(MAIN_COLOR, savedMainColor);
    document.documentElement.style.setProperty(SUB_COLOR, savedSubColor);
}


mainTitleArea.addEventListener("click", handlePopupClick);

colorBox.forEach(target => {
    target.addEventListener("click", handleColorClick, {
        captue: true
    });
});
reSelectBtn.addEventListener("click", clearClickedColor);
editTitleForm.addEventListener("submit", handleCustomSub);
editTitleForm.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
    };
}, true);
*/

//////