
const dadosBicicletas = [
    { type: 'node', lat: -19.9329, lon: -43.9348, tags: { name: 'Estação Praça da Liberdade' } },
    { type: 'node', lat: -19.9300, lon: -43.9350, tags: { name: 'Estação Savassi' } },
    { type: 'node', lat: -19.9250, lon: -43.9400, tags: { name: 'Estação Av. Amazonas' } }
];

const dadosCiclovias = [
    { 
        type: 'way', 
        geometry: [ 
            {lat: -19.9305, lon: -43.9355}, 
            {lat: -19.9315, lon: -43.9380},
            {lat: -19.9330, lon: -43.9400}
        ], 
        tags: { name: 'Ciclovia Savassi (simulada)' } 
    },
    { 
        type: 'way', 
        geometry: [ 
            {lat: -19.9210, lon: -43.9370}, 
            {lat: -19.9230, lon: -43.9380}
        ], 
        tags: { name: 'Ciclovia Centro (simulada)' } 
    }
];