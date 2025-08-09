import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const db = getFirestore();

async function carregarDashboard() {
    const dashboardContainer = document.getElementById("dashboardContainer");
    dashboardContainer.innerHTML = ""; // Limpa antes de carregar

    const querySnapshot = await getDocs(collection(db, "tecnicos"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement("div");
        card.classList.add("tecnico-card");
        card.innerHTML = `
            <h3>${data.nome} (${data.tipo})</h3>
            <p>O.S Finalizadas: ${data.osFinalizadas}</p>
            <p>Dias Trabalhados: ${data.dias}</p>
            <p><strong>Média Diária: ${data.media}</strong></p>
        `;
        dashboardContainer.appendChild(card);
    });
}

carregarDashboard();
