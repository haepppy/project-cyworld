const homeTab = document.querySelector("#homeTab");
const settingTab = document.querySelector("#settingTab");
const home = document.querySelector("#home");
const setting = document.querySelector("#setting");

const editTitleForm = document.querySelector("#editTitleForm");
const editTitle = document.querySelector("#editTitle");
const title = document.querySelector(".title");

const btn = document.querySelectorAll(".skin-color");

const ORIGINAL = "나의 미니홈피♬";
const CLASS_HIDDEN = "hidden";
const CLASS_TAB_ON = "tab-on";
const TITLE = "title";

const MAIN_COLOR = "--main-color";
const SUB_COLOR = "--sub-color";
const SKIN_COLOR = "--skin-color";

function handleSettingClick() {
  homeTab.classList.remove(CLASS_TAB_ON);
  settingTab.classList.add(CLASS_TAB_ON);

  home.classList.add(CLASS_HIDDEN);
  setting.classList.remove(CLASS_HIDDEN);

  editTitle.value = title.innerText;
}

function handleHomeClick() {
  settingTab.classList.remove(CLASS_TAB_ON);
  homeTab.classList.add(CLASS_TAB_ON);

  setting.classList.add(CLASS_HIDDEN);
  home.classList.remove(CLASS_HIDDEN);
}

function handleColorClick(e) {
  let haveOn;
  btn.forEach(target =>{
    const value = target.classList.contains("clicked-btn");
    if(value) {
      haveOn = true;
    };
  })
  console.log(haveOn);
  if(haveOn) {
    btn.forEach(target =>{
      target.classList.remove("clicked-btn");
    })
    e.target.classList.toggle("clicked-btn");
    getcolor(e);
  } else {
    e.target.classList.toggle("clicked-btn");
    getcolor(e);
  };

}

function getcolor(e) {
  const regex = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
  const mainColor = getComputedStyle(e.target).backgroundColor;
  const subColor = regex.exec(getComputedStyle(e.target).border)[0];

  document.documentElement.style.setProperty(MAIN_COLOR, mainColor);
  document.documentElement.style.setProperty(SUB_COLOR, subColor);

  localStorage.setItem(MAIN_COLOR, mainColor);
  localStorage.setItem(SUB_COLOR, subColor);
}

function handleEditTitleSub(e) {
  e.preventDefault();

  const value = e.target[0].value;
    
  if(value) {
      localStorage.setItem(TITLE, value);
      title.innerText = value;
  }else {
      localStorage.setItem(TITLE, ORIGINAL);
      title.innerText = ORIGINAL;
  }
}



settingTab.addEventListener("click", handleSettingClick);
homeTab.addEventListener("click", handleHomeClick);
editTitleForm.addEventListener("submit", handleEditTitleSub)

btn.forEach(target => {
  target.addEventListener("click", handleColorClick);
});

let savedMainColor = localStorage.getItem(MAIN_COLOR);
let savedSubColor = localStorage.getItem(SUB_COLOR);

if(!savedMainColor) {
  localStorage.setItem(MAIN_COLOR, "#b3d0dd");
  localStorage.setItem(SUB_COLOR, "#4889b5");    
}else {
  document.documentElement.style.setProperty(MAIN_COLOR, savedMainColor);
  document.documentElement.style.setProperty(SUB_COLOR, savedSubColor);
}

if(localStorage.getItem(TITLE)) {
  title.innerText = localStorage.getItem(TITLE);
};