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
  const bikeIconSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0284c7" width="28px" height="28px"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8-3.3 3.3-1.4-1.4.8-.8 1.7 1.7zM20.4 10.5c-2.2.3-4.2-1.3-4.5-3.5-.3-2.2 1.3-4.2 3.5-4.5 2.2-.3 4.2 1.3 4.5 3.5.3 2.2-1.3 4.2-3.5 4.5zm-1-6.9c-.8.2-1.4 1-1.5 1.8-.2.8.2 1.6.9 2 .8.4 1.7.2 2.1-.6s.2-1.7-.6-2.1c-.5-.2-1-.2-1.5-.1zM10 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/></svg>';

  const bikeIcon = L.divIcon({
    html: bikeIconSVG,
    className: "bike-station-icon",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });

  dadosBicicletas.forEach((element) => {
    var marker = L.marker([element.lat, element.lon], { icon: bikeIcon });

    var disponibilidade = Math.floor(Math.random() * (element.capacity + 1));

    let classeDisponibilidade = "dispo-alta";
    if (disponibilidade < 5) classeDisponibilidade = "dispo-media";
    if (disponibilidade < 2) classeDisponibilidade = "dispo-baixa";

    var popupContent = `
      <b>${element.tags.name || "Estação"} (simulada)</b><br>
      Disponíveis: <strong class="${classeDisponibilidade}">${disponibilidade}</strong>
      <span class="capacidade-info">/ ${element.capacity} vagas</span>
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

map.on("click", () => {
  if (window.innerWidth > 768) {
    return;
  }

  const controles = document.getElementById("controles");
  const comparador = document.getElementById("comparador");
  const btnMobileToggle = document.getElementById("btnMobileToggle");

  if (comparador.classList.contains("ativo")) {
    fecharComparador();
    btnMobileToggle.innerText = "☰";
    btnMobileToggle.classList.remove("ativo");
  }
  else if (controles.classList.contains("ativo")) {
    controles.classList.remove("ativo");
    btnMobileToggle.innerText = "☰";
    btnMobileToggle.classList.remove("ativo");
  }
});

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
    btnMobileToggle.innerText = "☰";
    btnMobileToggle.classList.remove("ativo");
    fecharComparador();
    return;
  }

  controles.classList.toggle("ativo");

  if (controles.classList.contains("ativo")) {
    btnMobileToggle.innerText = "✕";
    btnMobileToggle.classList.add("ativo");
  } else {
    btnMobileToggle.innerText = "☰";
    btnMobileToggle.classList.remove("ativo");
  }
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
