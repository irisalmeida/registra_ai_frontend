import { isLogged, openLoginWindow, logout } from "./auth.js";
import { getUserData } from "./user.js";

let $main = document.getElementById("main");

export function loadHomeView() {
  if (isLogged()) {
    loadLoggedView();
  } else {
    loadNotLoggedView();
  }
}

export function loadNotLoggedView() {
  let $template = document.getElementById("notLoggedView");
  $main.innerHTML = $template.innerHTML;

  let $loginButton = document.getElementById("loginButton");
  $loginButton.addEventListener("click", openLoginWindow);
}

export async function loadLoggedView() {
  let $template = document.getElementById("loggedView");
  $main.innerHTML = $template.innerHTML;

  let $logoutButton = document.getElementById("logoutButton");
  $logoutButton.addEventListener("click", logout);

  let $userName = document.getElementById("userName");
  let $userImage = document.getElementById("userImage");

  let userData = await getUserData();

  $userName.textContent = userData["username"];
  $userImage.src = userData["profile_pic"];
}
