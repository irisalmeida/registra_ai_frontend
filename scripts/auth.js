const API_URL = "https://127.0.0.1:8001";

export function openLoginWindow() {
  let windowPos = calculateWindowPos();
  let authWindow = window.open(`${API_URL}/login`, "_blank", windowPos);
  authWindow.focus();
}

export function loginCallback() {
  window.opener.focus();
  window.opener.location.reload();
  window.close();
}

export function logout() {
  fetch(API_URL + "/logout", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
  .then(response => {
    if (response.ok) {
      window.location.href = "/";
    } else {
      console.error("Logout failed:", response.statusText);
    }
  })
  .catch(err => {
    console.error("Fetch error:", err);
  });
}

export function calculateWindowPos() {
  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;
  let windowWidth = Math.floor(screenWidth * (2 / 5));
  let windowHeight = Math.floor(screenHeight * (2 / 3));
  let leftPosition = (screenWidth - windowWidth) / 2;
  let topPosition = (screenHeight - windowHeight) / 2;

  return `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=${topPosition}`;
}

export function getCookie(name) {
  let cookieArr = document.cookie.split(";");

  for(let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");

    if(name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

export function isLogged() {
  let logged = getCookie("logged");
  return logged === "true" ? true : false;
}
