import { isLogged, openLoginWindow, logout } from "./auth.js";
import { getUserData, register } from "./api.js";

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

  document.getElementById("logoutButton").addEventListener("click", logout);

  let userData = await getUserData();
  document.getElementById("userName").textContent = userData["username"];
  document.getElementById("userImage").src = userData["profile_pic"];

  let $gainAmount = document.getElementById("gainAmount");
  let $expenseAmount = document.getElementById("expenseAmount");
  $gainAmount.addEventListener("input", function(event) {
    $gainAmount.classList.remove("is-danger");
    formatMoneyInput(event);
  });
  $expenseAmount.addEventListener("input", function(event) {
    $expenseAmount.classList.remove("is-danger");
    formatMoneyInput(event);
  });

  let $gainDescription = document.getElementById("gainDescription");
  let $expenseDescription = document.getElementById("expenseDescription");

  document.getElementById("gainButton").addEventListener("click", function() {
    let amountStr = $gainAmount.value;
    let description = $gainDescription.value;
    let amount = brlStringToFloat(amountStr);

    if (amount === 0) {
      $gainAmount.classList.add("is-danger")
      return
    }
    $gainAmount.classList.remove("is-danger");
    $gainAmount.value = "R$ 0,00";
    $gainDescription.value = "";

    register("gain", amount, description);
  });

  document.getElementById("expenseButton").addEventListener("click", function() {
    let amountStr = $expenseAmount.value;
    let description = $expenseDescription.value;
    let amount = brlStringToFloat(amountStr);

    if (amount === 0) {
      $expenseAmount.classList.add("is-danger")
      return
    }
    $expenseAmount.classList.remove("is-danger");
    $expenseAmount.value = "R$ 0,00";
    $expenseDescription.value = "";

    register("expense", amount, description);
  });
}

function brlStringToFloat(brlString) {
    // Remove the "R$" prefix
    brlString = brlString.replace("R$", "").trim();
    // Remove thousand separators
    brlString = brlString.replace(/\./g, "");
    // Replace the decimal comma with a dot
    brlString = brlString.replace(",", ".");
    // Convert to float
    return parseFloat(brlString);
}

function formatMoneyInput(event) {
  function formatMoney(value) {
    let integerPart = value.replace(/^0+/, '');
    let decimalPart = integerPart.length <= 2 ? integerPart.padStart(2, '0') : integerPart.slice(-2);
    let formattedInteger = integerPart.length <= 2 ? '0' : integerPart.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedInteger},${decimalPart}`;
  }
  let inputValue = event.target.value;
  let numericValue = inputValue.replace(/\D/g, '');
  let formattedMoney = formatMoney(numericValue);
  let amount = `R$ ${formattedMoney}`
  event.target.value = amount;
}
