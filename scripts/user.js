const API_URL = "https://127.0.0.1:8001";

export async function getUserData() {
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
        let $userData = document.getElementById("userData");
        $userData.textContent = "User not logged.";
        let $loginButton = document.getElementById("loginButton");
        $loginButton.style.display = "";
        let $logoutButton = document.getElementById("logoutButton");
        $logoutButton.style.display = "none";
      } else {
        console.error("Fetch error:", err);
      }
    });
}
