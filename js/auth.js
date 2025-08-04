document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
        window.location.href = "dashboard.html";
    })
    .catch((error) => {
        alert("Erro ao fazer login: " + error.message);
    });
});
