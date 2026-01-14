document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const mensagem = document.getElementById("mensagem");
    const tabela = document.getElementById("tabelaUsuarios");

    function carregarUsuarios() {
        fetch("http://localhost:8080/usuarios", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    logout();
                    return [];
                }
                return response.json();
            })
            .then(usuarios => {
                tabela.innerHTML = "";

                usuarios.forEach(usuario => {
                    const linha = document.createElement("tr");

                    linha.innerHTML = `
                        <td>${usuario.id}</td>
                        <td>
                            <input type="text" id="nome-${usuario.id}" value="${usuario.nome}">
                        </td>
                        <td>
                            <input type="email" id="email-${usuario.id}" value="${usuario.email}">
                        </td>
                        <td>
                            <button onclick="atualizarUsuario(${usuario.id})">Salvar</button>
                        </td>
                    `;

                    tabela.appendChild(linha);
                });
            })
            .catch(() => {
                mensagem.innerText = "Erro ao carregar usuários";
                mensagem.style.color = "red";
            });
    }

    window.atualizarUsuario = function (id) {
        const nome = document.getElementById(`nome-${id}`).value;
        const email = document.getElementById(`email-${id}`).value;

        fetch(`http://localhost:8080/usuarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ nome, email })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                mensagem.innerText = "Usuário atualizado com sucesso";
                mensagem.style.color = "green";
            })
            .catch(() => {
                mensagem.innerText = "Erro ao atualizar usuário";
                mensagem.style.color = "red";
            });
    };

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    }

    carregarUsuarios();
});
