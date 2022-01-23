const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSANAME = "hidden";
const USERNAME_KEY = "username";

function onLoginsubmit(event) {
    event.preventDefault();
    const userName = loginInput.value;
    localStorage.setItem(USERNAME_KEY, userName);
    loginForm.classList.add(HIDDEN_CLASSANAME);
    console.log(userName);
    paintGreeting(userName);
};

function paintGreeting(username) {
    const span = document.createElement("span");
    span.innerText = "님, 안녕하세요!";
    greeting.innerText = `${username}`;
    greeting.classList.remove(HIDDEN_CLASSANAME);

    greeting.appendChild(span);
};

const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
    loginForm.classList.remove(HIDDEN_CLASSANAME);
    loginForm.addEventListener("submit", onLoginsubmit);
} else {
    paintGreeting(savedUserName);
}