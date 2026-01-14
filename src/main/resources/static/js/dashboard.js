const token = localStorage.getItem("token");

const mensagem = document.getElementById("mensagem");
const form = document.getElementById("formAtualizar");
const logoutBtn = document.getElementById("logout");

if (!token) {
    window.location.href = "/login.html";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const dadosAtualizados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value
    };

    fetch("http://localhost:8080/usuarios", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(dadosAtualizados)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(() => {
            mensagem.innerText = "Dados atualizados com sucesso!";
            mensagem.style.color = "green";
        })
        .catch(error => {
            mensagem.innerText = error.message;
            mensagem.style.color = "red";
        });
});

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
});
