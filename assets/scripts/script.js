const DEFAULT_LAT = -19.9167;
const DEFAULT_LON = -43.9333;
const DEFAULT_ZOOM = 13;
var markerLocalizacao = null;
var map = L.map("map").setView([DEFAULT_LAT, DEFAULT_LON], DEFAULT_ZOOM);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var layerBicicletas = L.layerGroup().addTo(map);
var layerCiclovias = L.layerGroup().addTo(map);
var layerOnibus = L.layerGroup().addTo(map);

document
  .getElementById("filtroBicicletas")
  .addEventListener("change", (e) =>
    toggleLayer(e.target.checked, layerBicicletas)
  );
document
  .getElementById("filtroCiclovias")
  .addEventListener("change", (e) =>
    toggleLayer(e.target.checked, layerCiclovias)
  );

function toggleLayer(checked, layer) {
  if (checked) map.addLayer(layer);
  else map.removeLayer(layer);
}

function carregarDadosLocais() {
  dadosBicicletas.forEach((element) => {
    var marker = L.marker([element.lat, element.lon]);
    var disponibilidade = Math.floor(Math.random() * 10);

    let classeDisponibilidade = "dispo-alta";
    if (disponibilidade < 5) classeDisponibilidade = "dispo-media";
    if (disponibilidade < 2) classeDisponibilidade = "dispo-baixa";

    var popupContent = `
  <b>${element.tags.name || "Estação"} (simulada)</b><br>
  Disponíveis: <strong class="${classeDisponibilidade}">${disponibilidade}</strong> bicicletas
 `;
    marker.bindPopup(popupContent).addTo(layerBicicletas);
  });
}
carregarDadosLocais();

function exibirCicloviaCorrespondente(nomeCiclovia) {
  const cicloviaSelecionada = dadosCiclovias.find(
    (c) => c.tags.name === nomeCiclovia
  );
  if (cicloviaSelecionada) {
    const coords = cicloviaSelecionada.geometry.map((g) => [g.lat, g.lon]);
    const line = L.polyline(coords, {
      weight: 4,
      opacity: 0.9,
      className: "ciclovia-path",
    });
    line.bindPopup(`<b>${cicloviaSelecionada.tags.name}</b>`);
    line.addTo(layerCiclovias);
  }
}

function atualizarComparador(linhasSelecionadas) {
  const painel = document.getElementById("comparador");
  const overlay = document.getElementById("overlay");
  painel.innerHTML = "";

  if (!linhasSelecionadas || linhasSelecionadas.length === 0) {
    // painel.style.display = "none";
    overlay.classList.remove("ativo");
    return;
  }

  const mock = temposMock;

  let html = `<h4 class="comparador-titulo">Comparador de Deslocamento</h4>`;

  linhasSelecionadas.forEach((codigo) => {
    const linha = mock[codigo];
    if (linha) {
      const diffTempo = linha.tempo - linha.bike;
      const diffTempoStr =
        diffTempo > 0
          ? `<span class='diff-positivo'>~${diffTempo} min mais rápido</span>`
          : `<span class='diff-neutro'>similar</span>`;

      html += `
  <div class="comparador-item">
    <b class="comparador-item-titulo">${linha.nome}</b>
      <hr />
    <div class="comparador-grid">
      <div class="comparador-coluna">
        <p class="coluna-titulo">Ônibus</p>
        <ul>
          <li>Tempo: ${linha.tempo} min</li>
          <li>Custo: R$ ${linha.custo.toFixed(2)}</li>
          <li>Impacto CO²: ${linha.co2}</li>
        </ul>
      </div>
      <div class="comparador-coluna separador"> </div>
      <div class="comparador-coluna">
        <p class="coluna-titulo">Bicicleta + Ciclovia</p>
        <ul>
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
  <div class="comparador-actions">
    <button id="btnFecharComparador">
      Fechar
    </button>
  </div>
`;

  painel.innerHTML = html;
  painel.classList.add("ativo");
  overlay.classList.add("ativo");

  document
    .getElementById("btnFecharComparador")
    .addEventListener("click", fecharComparador);

  overlay.addEventListener("click", fecharComparador);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharComparador();
  });
}

function fecharComparador() {
  const painel = document.getElementById("comparador");
  const overlay = document.getElementById("overlay");
  painel.classList.remove("ativo");
  overlay.classList.remove("ativo");
}

function exibirRotasSelecionadas() {
  layerOnibus.clearLayers();
  layerCiclovias.clearLayers();

  const select = document.getElementById("selectLinhas");
  const selecionadas = Array.from(select.selectedOptions).map(
    (opt) => opt.value
  );

  if (selecionadas.length === 0) {
    map.setView([DEFAULT_LAT, DEFAULT_LON], DEFAULT_ZOOM);
    return;
  }

  const todasCoords = [];

  selecionadas.forEach((valor) => {
    const linha = dadosOnibus.find((l) => l.nome.includes(valor));
    if (linha) {
      const rota = L.polyline(linha.rota, {
        weight: 4,
        opacity: 0.9,
        dashArray: "8, 8",
        className: "onibus-path",
      });
      rota.bindPopup(`<b>${linha.nome}</b><br>Rota simulada`);
      rota.addTo(layerOnibus);
      todasCoords.push(...linha.rota);

      if (linha.ciclovia) {
        exibirCicloviaCorrespondente(linha.ciclovia);
      }
    }
  });

  if (todasCoords.length > 0) {
    map.fitBounds(todasCoords, { padding: [50, 50] });
  }
}

function atualizarEstadoBotoes() {
  const select = document.getElementById("selectLinhas");
  const btnComparar = document.getElementById("btnComparar");
  const selecionadas = Array.from(select.selectedOptions);

  if (selecionadas.length === 0) {
    btnComparar.disabled = true;
  } else {
    btnComparar.disabled = false;
  }
}

document.getElementById("selectLinhas").addEventListener("change", () => {
  exibirRotasSelecionadas();
  atualizarEstadoBotoes();
});

document.getElementById("btnComparar").addEventListener("click", function () {
  const select = document.getElementById("selectLinhas");
  const selecionadas = Array.from(select.selectedOptions).map(
    (opt) => opt.value
  );

  if (selecionadas.length === 0) {
    return;
  }

  atualizarComparador(selecionadas);
});

const btnMobileToggle = document.getElementById("btnMobileToggle");
btnMobileToggle.addEventListener("click", () => {
  const controles = document.getElementById("controles");
  const comparador = document.getElementById("comparador");

  if (
    comparador.style.display === "block" ||
    comparador.classList.contains("ativo")
  ) {
    fecharComparador();
    return;
  }

  controles.classList.toggle("ativo");
});

layerCiclovias.clearLayers();
layerOnibus.clearLayers();

dadosBicicletas.forEach((element) => {
  var marker = L.marker([element.lat, element.lon]);
  var disponibilidade = Math.floor(Math.random() * 10);

  let classeDisponibilidade = "dispo-alta";
  if (disponibilidade < 5) classeDisponibilidade = "dispo-media";
  if (disponibilidade < 2) classeDisponibilidade = "dispo-baixa";

  var popupContent = `
 <b>${element.tags.name || "Estação"} (simulada)</b><br>
 Disponíveis: <strong class="${classeDisponibilidade}">${disponibilidade} bicicletas</strong> 
`;
  marker.bindPopup(popupContent).addTo(layerBicicletas);
});

document.getElementById("btnLocalizacao").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocalização não é suportada pelo seu navegador.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      map.setView([lat, lon], 16);

      if (markerLocalizacao) {
        map.removeLayer(markerLocalizacao);
      }

      markerLocalizacao = L.marker([lat, lon], {})
        .bindPopup(
          "<b>Você está aqui!</b> <br> <span id='locAproximada'>(Localização aproximada)</span>"
        )
        .addTo(map)
        .openPopup();
    },
    () => {
      alert("Não foi possível obter sua localização.");
    }
  );
});
atualizarEstadoBotoes();
