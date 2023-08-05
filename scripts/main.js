let $amountInput = document.getElementById("amountInput");
let $descriptionInput = document.getElementById("descriptionInput");

function register() {
    let amount = $amountInput.value;
    let description = $descriptionInput.value;

    console.log("registrando");
    console.log(amount);
    console.log(description);
}
