document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const btnEntrar = document.getElementById("btnEntrar");
    const loader = document.getElementById("loader");

    loader.classList.remove("hidden");
    btnEntrar.disabled = true;
    btnEntrar.textContent = "Entrando...";

    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            window.location.href = "painel.html"; // Redireciona para painel
        })
        .catch((error) => {
            let msg = "";
            if (error.code === 'auth/user-not-found') {
                msg = "Usuário não encontrado.";
            } else if (error.code === 'auth/wrong-password') {
                msg = "Senha incorreta.";
            } else if (error.code === 'auth/invalid-email') {
                msg = "Email inválido.";
            } else {
                msg = "Erro: " + error.message;
            }
            alert(msg);
        })
        .finally(() => {
            loader.classList.add("hidden");
            btnEntrar.disabled = false;
            btnEntrar.textContent = "Entrar";
        });
});
