const API_URL = "https://127.0.0.1:8001";

let $main = document.getElementById("main");

init();

function init() {
  if (isLogged()) {
    loadLoggedView();
  } else {
    loadNotLoggedView();
  }
}

function login() {
  window.location.href = `${API_URL}/login`;
}

function logout() {
  fetch(API_URL + "/logout", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
  .then(response => {
    if (response.ok) {
      window.location.href = "/";
    } else {
      console.error('Logout failed:', response.statusText);
    }
  })
  .catch(err => {
    console.error('Fetch error:', err);
  });
}

function loadNotLoggedView() {
  let $template = document.getElementById("notLoggedView");
  $main.innerHTML = $template.innerHTML;

  let $loginButton = document.getElementById("loginButton");
  $loginButton.addEventListener("click", login);
}

async function loadLoggedView() {
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

async function getUserData() {
  return fetch(API_URL + "/user_data", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then(res => {
      if (res.status === 401) {
        throw new Error("User not logged");
      }
      return res.json();
    })
    .catch(err => {
      if (err.message === "User not logged") {
        $userData.textContent = "User not logged.";
        $loginButton.style.display = "";
        $logoutButton.style.display = "none";
      } else {
        console.error('Fetch error:', err);
      }
    });
}

function getCookie(name) {
  let cookieArr = document.cookie.split(";");

  for(let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");

    if(name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

function isLogged() {
  let logged = getCookie("logged");
  return logged === "true" ? true : false;
}
