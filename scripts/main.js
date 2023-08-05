const url = 'http://localhost:8001'
let $amountInputGain = document.getElementById("amountInputGain");
let $descriptionInputGain = document.getElementById("descriptionInputGain");
let $amountInputExpense = document.getElementById("amountInputExpense");
let $descriptionInputExpense = document.getElementById("descriptionInputExpense");
let $balance = document.getElementById("balance");
const $ulElement = document.getElementById('history'); 

function registerGain() {
    let amount = $amountInputGain.value;
    let description = $descriptionInputGain.value;

    let data = {
        description: description,
        amount: parseFloat(amount)
    }

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(url + "/gain", fetchData)
        .then(res => {
            if (res.ok) return res.json();
            else {
                console.log("Erro ao registrar! Tente novamente");
                console.log(res);
            }
        })
        .then(data => {
            console.log("Registrado com sucesso!");
        });
}

function registerExpense() {
    let amount = $amountInputExpense.value;
    let description = $descriptionInputExpense.value;

    let data = {
        description: description,
        amount: parseFloat(amount)
    }

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(url + "/expense", fetchData)
        .then(res => {
            if (res.ok) return res.json();
            else {
                console.log("Erro ao registrar! Tente novamente");
                console.log(res);
            }
        })
        .then(data => {
            console.log("Registrado com sucesso!");
        });
}

function loadHistory() {
    let fetchData = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(url + "/history", fetchData)
        .then(res => {
            if (res.ok) return res.json();
            else {
                console.log("Erro ao recuperar histórico");
                console.log(res);
            }
        })
        .then(data => {
            console.log(data);

            data.forEach(item => {
                const $liElement = document.createElement('li');
                const formattedItem = `${item.amount} - ${item.description} - ${item.ts}`; 
                $liElement.textContent = formattedItem;
                $ulElement.appendChild($liElement);
            });
        });
}


function loadBalance(params) {
    let fetchData = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(url + "/balance", fetchData)
        .then(res => {
            if (res.ok) return res.json();
            else {
                console.log("Erro ao recuperar saldo");
                console.log(res);
            }
        })
        .then(data => {
            console.log(data);
            $balance.textContent = "Saldo: " + data.balance;
        });
    
}
