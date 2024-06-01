import { loadHomeView } from "./view.js";
import { loginCallback } from "./auth.js";

document.addEventListener("DOMContentLoaded", init);

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
