const API_URL = "https://127.0.0.1:8001";

let $main = document.getElementById("main");

init();

function init() {
  let hash = window.location.hash;

  switch (hash) {
    case "#login-callback":
      loginCallback();
      break;
    default:
      loadHomeView();
      break;
  }
}

function loadHomeView() {
  if (isLogged()) {
    loadLoggedView();
  } else {
    loadNotLoggedView();
  }
}

function calculateWindowPos() {
  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;
  let windowWidth = Math.floor(screenWidth * (2 / 5));
  let windowHeight = Math.floor(screenHeight * (2 / 3));
  let leftPosition = (screenWidth - windowWidth) / 2;
  let topPosition = (screenHeight - windowHeight) / 2;

  return `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=${topPosition}`;
}

function loginCallback() {
  window.opener.focus();
  window.opener.location.reload()
  window.close()
}

function openLoginWindow() {
  let windowPos = calculateWindowPos();
  let authWindow = window.open(`${API_URL}/login`, "_blank", windowPos);

  authWindow.focus();
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
  $loginButton.addEventListener("click", openLoginWindow);
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
