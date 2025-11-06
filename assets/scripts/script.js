// ===================== CONFIGURAÇÃO DO MAPA =====================
var lat = -19.9167;
var lon = -43.9333;
var map = L.map("map").setView([lat, lon], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// ===================== CAMADAS =====================
var layerBicicletas = L.layerGroup().addTo(map);
var layerCiclovias = L.layerGroup().addTo(map);
var layerOnibus = L.layerGroup().addTo(map);

// ===================== FILTROS =====================
document.getElementById("filtroBicicletas").addEventListener("change", (e) =>
  toggleLayer(e.target.checked, layerBicicletas)
);
document.getElementById("filtroCiclovias").addEventListener("change", (e) =>
  toggleLayer(e.target.checked, layerCiclovias)
);

function toggleLayer(checked, layer) {
  if (checked) map.addLayer(layer);
  else map.removeLayer(layer);
}

// ===================== ESTAÇÕES DE BICICLETAS =====================
function carregarDadosLocais() {
  dadosBicicletas.forEach((element) => {
    var marker = L.marker([element.lat, element.lon]);
    var disponibilidade = Math.floor(Math.random() * 10);
    var popupContent = `
      <b>${element.tags.name || "Estação"} (simulada)</b><br>
      Disponíveis: ${disponibilidade} bicicletas
    `;
    marker.bindPopup(popupContent).addTo(layerBicicletas);
  });
}
carregarDadosLocais();

// ===================== EXIBIR CICLOVIA CORRESPONDENTE =====================
function exibirCicloviaCorrespondente(nomeCiclovia) {
  layerCiclovias.clearLayers();

  const cicloviaSelecionada = dadosCiclovias.find(
    (c) => c.tags.name === nomeCiclovia
  );
  if (cicloviaSelecionada) {
    const coords = cicloviaSelecionada.geometry.map((g) => [g.lat, g.lon]);
    const line = L.polyline(coords, {
      color: "green",
      weight: 4,
      opacity: 0.9
    });
    line.bindPopup(`<b>${cicloviaSelecionada.tags.name}</b>`);
    line.addTo(layerCiclovias);
  }
}

// ===================== COMPARADOR (MODAL POPUP) =====================
function atualizarComparador(linhasSelecionadas) {
  const painel = document.getElementById("comparador");
  const overlay = document.getElementById("overlay");
  painel.innerHTML = "";

  if (!linhasSelecionadas || linhasSelecionadas.length === 0) {
    painel.style.display = "none";
    overlay.classList.remove("ativo");
    return;
  }

  const mock = temposMock;

  let html = `<h4 class="text-lg font-semibold text-sky-700 mb-2">Comparador de Deslocamento</h4>`;

  linhasSelecionadas.forEach((codigo) => {
    const linha = mock[codigo];
    if (linha) {
      const diffTempo = linha.tempo - linha.bike;
      const diffTempoStr =
        diffTempo > 0
          ? `<span class='text-emerald-600'>~${diffTempo} min mais rápido</span>`
          : `<span class='text-gray-500'>similar</span>`;

      html += `
        <div class="border-t border-gray-300 mt-2 pt-2">
          <b class="block text-sky-800">${linha.nome}</b>

          <div class="grid grid-cols-2 gap-3 text-sm mt-2">
            <div>
              <p class="font-semibold text-gray-700 mb-1">Ônibus</p>
              <ul class="ml-4 list-none">
                <li>Tempo: ${linha.tempo} min</li>
                <li>Custo: R$ ${linha.custo.toFixed(2)}</li>
                <li>Impacto CO²: ${linha.co2}</li>
              </ul>
            </div>

            <div>
              <p class="font-semibold text-gray-700 mb-1">Bicicleta + Ciclovia</p>
              <ul class="ml-4 list-none">
                <li>Tempo: ${linha.bike} min (${diffTempoStr})</li>
                <li>Custo: R$ 2,90</li>
                <li>Impacto CO²: Nulo</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }
  });

  html += `
    <div class="mt-4">
      <button id="btnFecharComparador"
        class="w-full py-2 bg-sky-700 hover:bg-sky-800 text-white font-medium rounded-md">
        Fechar
      </button>
    </div>
  `;

  painel.innerHTML = html;

  // Exibe popup com overlay
  painel.style.display = "block";
  painel.classList.add("ativo");
  overlay.classList.add("ativo");

  document
    .getElementById("btnFecharComparador")
    .addEventListener("click", fecharComparador);

  // Fecha clicando fora
  overlay.addEventListener("click", fecharComparador);

  // Fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharComparador();
  });
}

function fecharComparador() {
  const painel = document.getElementById("comparador");
  const overlay = document.getElementById("overlay");
  painel.classList.remove("ativo");
  overlay.classList.remove("ativo");
  setTimeout(() => {
    painel.style.display = "none";
  }, 200);
}

// ===================== EXIBIR LINHAS E CICLOVIAS =====================
document.getElementById("btnMostrarLinhas").addEventListener("click", function () {
  layerOnibus.clearLayers();
  layerCiclovias.clearLayers();

  const select = document.getElementById("selectLinhas");
  const selecionadas = Array.from(select.selectedOptions).map((opt) => opt.value);

  if (selecionadas.length === 0) {
    alert("Selecione ao menos uma linha para exibir.");
    document.getElementById("comparador").style.display = "none";
    return;
  }

  const todasCoords = [];

  selecionadas.forEach((valor) => {
    const linha = dadosOnibus.find((l) => l.nome.includes(valor));
    if (linha) {
      const rota = L.polyline(linha.rota, {
        color: "#e63946",
        weight: 4,
        opacity: 0.9,
        dashArray: "8, 8"
      });
      rota.bindPopup(`<b>${linha.nome}</b><br>Rota simulada`);
      rota.addTo(layerOnibus);
      todasCoords.push(...linha.rota);

      // Exibe ciclovia associada
      exibirCicloviaCorrespondente(linha.ciclovia);
    }
  });

  if (todasCoords.length > 0) map.fitBounds(todasCoords);
});

// ===================== BOTÃO COMPARAR ROTAS =====================
document.getElementById("btnComparar").addEventListener("click", function () {
  const select = document.getElementById("selectLinhas");
  const selecionadas = Array.from(select.selectedOptions).map(opt => opt.value);

  if (selecionadas.length === 0) {
    alert("Selecione ao menos uma linha para comparar.");
    return;
  }

  atualizarComparador(selecionadas);
});

// ===================== BOTÃO MOBILE (MENU RESPONSIVO) =====================
const btnMobileToggle = document.getElementById("btnMobileToggle");
btnMobileToggle.addEventListener("click", () => {
  const controles = document.getElementById("controles");
  const comparador = document.getElementById("comparador");

  if (comparador.style.display === "block") {
    comparador.style.display = "none";
  }

  const visivel = controles.classList.contains("ativo");

  if (visivel) {
    controles.classList.remove("ativo");
    controles.style.transform = "translateY(110%)";
  } else {
    controles.classList.add("ativo");
    controles.style.transform = "translateY(0)";
  }
});

// ===================== INICIALIZAÇÃO LIMPA =====================
layerCiclovias.clearLayers();
layerOnibus.clearLayers();
layerBicicletas.clearLayers();

dadosBicicletas.forEach((element) => {
  var marker = L.marker([element.lat, element.lon]);
  var disponibilidade = Math.floor(Math.random() * 10);
  var popupContent = `
    <b>${element.tags.name || "Estação"} (simulada)</b><br>
    Disponíveis: ${disponibilidade} bicicletas
  `;
  marker.bindPopup(popupContent).addTo(layerBicicletas);
});
