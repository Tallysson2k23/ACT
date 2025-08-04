document.getElementById("cadastroForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const dias = parseInt(document.getElementById("dias").value);
    const os = parseInt(document.getElementById("os").value);

    db.collection("tecnicos").add({
        nome: nome,
        tipo: tipo,
        dias_trabalhados: dias,
        os_finalizadas: os
    }).then(() => {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "dashboard.html";
    }).catch((error) => {
        alert("Erro ao cadastrar: " + error.message);
    });
});
