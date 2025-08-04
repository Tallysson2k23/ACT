auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
    } else {
        carregarDados();
    }
});

function carregarDados() {
    const tabela = document.getElementById("tabelaDados");
    tabela.innerHTML = "";

    db.collection("tecnicos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const media = (data.os_finalizadas / data.dias_trabalhados).toFixed(2);

            const row = `
                <tr>
                    <td>${data.nome}</td>
                    <td>${data.tipo}</td>
                    <td>${data.dias_trabalhados}</td>
                    <td>${data.os_finalizadas}</td>
                    <td>${media}</td>
                </tr>
            `;
            tabela.innerHTML += row;
        });
    });
}
