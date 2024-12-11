document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById('toggle-theme');
    const body = document.body;

    // Alternar Modo Escuro
    button.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            button.textContent = 'Alternar para Modo Claro';
        } else {
            button.textContent = 'Alternar para Modo Escuro';
        }
    });

    // Carregar informações das cepas
    const cannabisApiUrl = "https://the-cannabis-api-endpoint-url/strains";
    const cepasContainer = document.getElementById("cepas-container");

    async function fetchCepas() {
        try {
            const response = await fetch(cannabisApiUrl);
            const cepas = await response.json();

            cepasContainer.innerHTML = "";

            cepas.forEach(cepa => {
                const cepaCard = document.createElement("div");
                cepaCard.className = "cepa-card";
                cepaCard.innerHTML = `
                    <h2>${cepa.name}</h2>
                    <p><strong>Tipo:</strong> ${cepa.race}</p>
                    <p><strong>Efeitos Positivos:</strong> ${cepa.effects.positive.join(", ")}</p>
                    <p><strong>Efeitos Negativos:</strong> ${cepa.effects.negative.join(", ")}</p>
                    <p><strong>Sabores:</strong> ${cepa.flavors.join(", ")}</p>
                `;
                cepasContainer.appendChild(cepaCard);
            });
        } catch (error) {
            console.error("Erro ao buscar as cepas:", error);
            cepasContainer.innerHTML = "<p>Erro ao carregar informações das cepas.</p>";
        }
    }

    // Carregar estação de rádio
    const radioApiUrl = "https://de1.api.radio-browser.info/json/stations/search?name=0%20N%20-%20Reggae%20on%20Radio";
    const stationContainer = document.getElementById("station-container");

    async function loadStation() {
        try {
            const response = await fetch(radioApiUrl);
            const stations = await response.json();

            if (stations.length > 0) {
                const station = stations[0]; 
                stationContainer.innerHTML = `
                    <div class="station">
                        <h2>${station.name}</h2>
                        <audio controls>
                            <source src="${station.url_resolved}" type="audio/mpeg">
                            Seu navegador não suporta o player de áudio.
                        </audio>
                    </div>
                `;
            } else {
                stationContainer.innerHTML = "<p>Estação não encontrada.</p>";
            }
        } catch (error) {
            stationContainer.innerHTML = "<p>Erro ao carregar a estação.</p>";
            console.error("Erro ao buscar estação:", error);
        }
    }

    fetchCepas();
    loadStation();
});
 