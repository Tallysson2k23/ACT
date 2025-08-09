import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

const app = getApp();
const db = getFirestore(app);

document.getElementById("cadastroForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const dias = parseInt(document.getElementById("dias").value);
    const osFinalizadas = parseInt(document.getElementById("os").value);

    if (dias <= 0) {
        alert("Dias trabalhados deve ser maior que 0.");
        return;
    }

    try {
        await addDoc(collection(db, "tecnicos"), {
            nome: nome,
            tipo: tipo,
            dias: dias,
            osFinalizadas: osFinalizadas,
            media: (osFinalizadas / dias).toFixed(2)
        });
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar: " + error.message);
    }
});
