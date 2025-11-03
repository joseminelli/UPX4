var lat = -19.9167;
var lon = -43.9333;
var map = L.map('map').setView([lat, lon], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var layerBicicletas = L.layerGroup().addTo(map);
var layerCiclovias = L.layerGroup().addTo(map);
var layerOnibusMockup = L.layerGroup().addTo(map);

document.getElementById('filtroBicicletas').addEventListener('change', (e) => toggleLayer(e.target.checked, layerBicicletas));
document.getElementById('filtroCiclovias').addEventListener('change', (e) => toggleLayer(e.target.checked, layerCiclovias));
document.getElementById('filtroOnibus').addEventListener('change', (e) => toggleLayer(e.target.checked, layerOnibusMockup));

function toggleLayer(checked, layer) {
    if (checked) {
        map.addLayer(layer);
    } else {
        map.removeLayer(layer);
    }
}

var btnBuscar = document.getElementById('btnBuscar');
var btnFecharComparador = document.getElementById('btnFecharComparador');
var painelComparador = document.getElementById('comparador');

btnBuscar.addEventListener('click', function() {
    painelComparador.style.display = 'block';
    
    layerOnibusMockup.clearLayers(); 
    
    var rotaOnibus = [
        [-19.9209, -43.9378],
        [-19.9250, -43.9390],
        [-19.9330, -43.9350]
    ];
    var linha = L.polyline(rotaOnibus, {color: 'red', dashArray: '5, 10'});
    linha.bindPopup("<b>Linha 5106 (Mockup)</b><br>Próximo: 5 min (simulado)");
    linha.addTo(layerOnibusMockup);
    
    map.fitBounds(linha.getBounds());
});

btnFecharComparador.addEventListener('click', function() {
    painelComparador.style.display = 'none';
});

function carregarDadosLocais() {
    
    dadosBicicletas.forEach(element => {
        var marker = L.marker([element.lat, element.lon]);
        
        var disponibilidade = Math.floor(Math.random() * 10);
        var popupContent = `
            <b>${element.tags.name || 'Estação'} (simulada)</b>
            <br>Disponíveis: ${disponibilidade} (simulado)
        `;
        
        marker.bindPopup(popupContent).addTo(layerBicicletas);
    });

    dadosCiclovias.forEach(element => {
        var coords = element.geometry.map(geom => [geom.lat, geom.lon]);
        var line = L.polyline(coords, { color: 'blue' });
        var popupContent = `<b>${element.tags.name || 'Ciclovia'} (simulada)</b>`;
        line.bindPopup(popupContent).addTo(layerCiclovias);
    });
}

carregarDadosLocais();