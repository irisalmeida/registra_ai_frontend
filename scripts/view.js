import { isLogged, openLoginWindow, logout } from "./auth.js";
import { getUserData, registerGain, registerExpense } from "./api.js";

let $main = document.getElementById("main");

export async function loadHomeView() {
  if (isLogged()) {
    await loadLoggedView();
  } else {
    await loadNotLoggedView();
  }
}

async function fetchTemplate(url) {
  const response = await fetch(url);
  const text = await response.text();
  const temp = document.createElement("div");
  temp.innerHTML = text;
  return temp.querySelector("template");
}

export async function loadNotLoggedView() {
  const template = await fetchTemplate("templates/notLoggedView.html");
  $main.innerHTML = template.innerHTML;

  let $loginButton = document.getElementById("loginButton");
  $loginButton.addEventListener("click", openLoginWindow);
}

export async function loadLoggedView() {
  const template = await fetchTemplate("templates/loggedView.html");
  $main.innerHTML = template.innerHTML;

  let $logoutButton = document.getElementById("logoutButton");
  $logoutButton.addEventListener("click", logout);

  let userData = await getUserData();
  let $userName = document.getElementById("userName");
  let $userImage = document.getElementById("userImage");
  $userName.textContent = userData["username"];
  $userImage.src = userData["profile_pic"];

  let $gainButton = document.getElementById("gainButton");
  let $expenseButton = document.getElementById("expenseButton");
  $gainButton.addEventListener("click", registerGain);
  $expenseButton.addEventListener("click", registerExpense);
}
