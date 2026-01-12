const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

function carregarUsuarios() {
    fetch("http://localhost:8080/usuarios")
        .then(response => response.json())
        .then(usuarios => {
            const tabela = document.getElementById("tabelaUsuarios");
            tabela.innerHTML = "";

            usuarios.forEach(usuario => {
                const linha = document.createElement("tr");

                linha.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>
                        <input type="text" value="${usuario.nome}" id="nome-${usuario.id}">
                    </td>
                    <td>
                        <input type="email" value="${usuario.email}" id="email-${usuario.id}">
                    </td>             
                    <td>
                        <button onclick="atualizarUsuario(${usuario.id})">Salvar</button>
                        <button onclick="excluirUsuario(${usuario.id})">Excluir</button>
                    </td>
                `;

                tabela.appendChild(linha);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar usuários", error);
        });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
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
            mensagem.innerText = "Usuário cadastrado com sucesso";
            mensagem.style.color = "green";
            form.reset();
            carregarUsuarios();
        })
        .catch(error => {
            mensagem.innerText = error.message;
            mensagem.style.color = "red";
        });
});

document.addEventListener("DOMContentLoaded", carregarUsuarios);

function excluirUsuario(id) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) {
        return;
    }

    fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "DELETE"
    })
        .then(response => {
            if(!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.text();
        })
        .then(msg => {
            mensagem.innerText = msg;
            mensagem.style.color = "green";
            carregarUsuarios();
        })
        .catch(error => {
            mensagem.innerText = error.message;
            mensagem.style.color = "red";
        });
}

function atualizarUsuario(id) {
    const nome = document.getElementById(`nome-${id}`).value;
    const email = document.getElementById(`email-${id}`).value;

    fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: "123"
        })
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
            mensagem.innerText = "Usuário atualizado com sucesso";
            mensagem.style.color = "green";
            carregarUsuarios();
        })
        .catch(error => {
            mensagem.innerText = error.message;
            mensagem.style.color = "red";
        });
}
