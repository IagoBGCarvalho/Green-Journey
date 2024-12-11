
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

// fetchCepas();

// Esconde overlay de carregamento após carregar a página
$(window).on('load', function () {
    setTimeout(function () {
        $('#loading-overlay').fadeOut();
        $('#nav-loading').hide();
    }, 1000);
});

$(document).ready(function () {
    $.ajax({
        url: 'https://api.otreeba.com/v1/strains?count=50&sort=-createdAt',
        method: 'GET',
        beforeSend: function () {
            $('#loading').show();
            $('#cepas-tb').hide();
        },
        success: function (response) {
            const tbody = document.querySelector('#cepas-tb-body');
            $('#loading').hide();
            $('#cepas-tb').fadeIn();

            if (!response.data || response.data.length === 0) {
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.setAttribute('colspan', '6');
                td.className = 'text-center text-muted py-4';
                td.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Não há sementes disponíveis.';
                tr.appendChild(td);
                tbody.appendChild(tr);
            } else {
                response.data.forEach(item => {
                    let tr = document.createElement('tr');
                    tr.className = 'align-middle';

                    let tdId = document.createElement('td');
                    tdId.textContent = item.id || '-';
                    tr.appendChild(tdId);

                    let tdImagem = document.createElement('td');
                    let img = document.createElement('i');

                    img.setAttribute('class', 'fas fa-cannabis me-2')

                    tdImagem.appendChild(img);
                    tr.appendChild(tdImagem);

                    let tdCepa = document.createElement('td');
                    tdCepa.textContent = item.name || 'Nome não informado';
                    tdCepa.className = 'nomeCepa fw-bold'; // Usar classe em vez de ID
                    tr.appendChild(tdCepa);

                    let tdBanco = document.createElement('td');
                    tdBanco.textContent = item.seedCompany?.name || 'Banco não informado';
                    tr.appendChild(tdBanco);

                    let tdAncestralidade = document.createElement('td');
                    tdAncestralidade.textContent = item.genetics?.names || 'Não informado';
                    tr.appendChild(tdAncestralidade);

                    let tdLinhagem = document.createElement('td');
                    if (item.lineage && typeof item.lineage === 'object') {
                        // Extrai as chaves e valores do objeto lineage
                        tdLinhagem.textContent = Object.entries(item.lineage)
                            .map(([key, value]) => `${key}: ${value || 'Sem nome'}`) // Combina chave e valor
                            .join(', '); // Une as entradas com vírgulas
                    } else {
                        tdLinhagem.textContent = 'Não informado';
                    }
                    tr.appendChild(tdLinhagem);



                    tbody.appendChild(tr);
                });

                // Chamar loadStation() uma vez após carregar as cepas
                loadStation();
            }
        },
        error: function (xhr, status, error) {
            console.error(`Erro ao carregar os dados: ${error}`);
            $('#loading').hide();

            const tbody = document.querySelector('#cepas-tb-body');
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.setAttribute('colspan', '6');
            td.className = 'text-center text-danger py-4';
            td.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Erro ao carregar os dados. Tente novamente mais tarde.';
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    });
});

document.getElementById('busca').addEventListener('input', function (e) {
    const termoDeBusca = e.target.value.toLowerCase();
    const linhasTabela = document.querySelectorAll('#cepas-tb-body tr');

    linhasTabela.forEach(linha => {
        const nomeCepaElement = linha.querySelector('.nomeCepa');
        if (nomeCepaElement) {
            const nomeCepa = nomeCepaElement.textContent.toLowerCase();
            if (nomeCepa.includes(termoDeBusca)) {
                linha.style.display = '';
                linha.style.animation = 'fadeIn 0.5s';
            } else {
                linha.style.display = 'none';
            }
        }
    });
});