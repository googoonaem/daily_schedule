const login_form = document.querySelector("#login-form");
const login_input = login_form.querySelector("input");
const greeting = document.querySelector("#greeting");
const main_container = document.querySelector("#main-container");
const schedule_boxes = main_container.querySelectorAll("div");
const clock = document.querySelector("h2#clock");
const popup = main_container.querySelector("#popup");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function paintGreetings(username) {
  greeting.innerText = `Hello, ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  main_container.classList.remove(HIDDEN_CLASSNAME);
  clock.style.top = "300px";
  clock.style.left = "60px";
  clock.style.transform = "translate(0, 0)";
}

function onLoginSubmit(e) {
  e.preventDefault();
  const username = login_input.value;
  if (username === "") {
    alert("please write your name.👇🏻");
    return;
  } else if (username.length > 15) {
    alert("your name is too long.😥");
    return;
  }
  login_form.classList.add(HIDDEN_CLASSNAME);
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  //show form
  login_form.classList.remove(HIDDEN_CLASSNAME);
  login_form.addEventListener("submit", onLoginSubmit);
} else {
  //show greeting
  login_form.classList.add(HIDDEN_CLASSNAME);
  paintGreetings(savedUsername);
}

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000);

const showPopup = (contentHtml) => {
  popup.innerHTML = contentHtml;
  if (popup.classList.contains(HIDDEN_CLASSNAME)) {
    popup.classList.remove(HIDDEN_CLASSNAME);
  }
};
const onPopupSubmit = (e) => {
  e.preventDefault;
};

const onHandleScheduleBoxClick = (e) => {
  e.stopPropagation();
  const box = e.currentTarget;
  const content = box.querySelector(".content").innerHTML;

  popup.innerHTML = content;
  const popup_form = popup.querySelector("form");
  if (popup_form) {
    popup_form.addEventListener("submit", onPopupSubmit);
  }

  popup.classList.toggle("hidden");
};

schedule_boxes.forEach((schedule_box) => {
  schedule_box.addEventListener("click", onHandleScheduleBoxClick);
});
document.body.addEventListener("click", (e) => {
  if (!popup.contains(e.target)) {
    popup.classList.add("hidden");
  }
});
