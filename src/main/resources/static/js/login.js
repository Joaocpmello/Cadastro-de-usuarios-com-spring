const form = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const dadosLogin = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosLogin)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Email ou senha inválidos");
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            mensagem.innerText = error.message;
            mensagem.style.color = "red";
        });
});
