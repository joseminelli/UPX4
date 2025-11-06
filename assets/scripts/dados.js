// -------------------- ESTAÇÕES DE BICICLETAS --------------------
const dadosBicicletas = [
  { lat: -19.9329, lon: -43.9348, tags: { name: 'Estação Praça da Liberdade' } },
  { lat: -19.9300, lon: -43.9350, tags: { name: 'Estação Savassi' } },
  { lat: -19.9250, lon: -43.9400, tags: { name: 'Estação Av. Amazonas' } },
  { lat: -19.9185, lon: -43.9380, tags: { name: 'Estação Praça Sete (Centro)' } },
  { lat: -19.9085, lon: -43.9385, tags: { name: 'Estação Antônio Carlos (UFMG)' } },
  { lat: -19.8660, lon: -43.9710, tags: { name: 'Estação Pampulha' } },
  { lat: -19.9755, lon: -44.0163, tags: { name: 'Estação Barreiro' } }
];

// -------------------- CICLOVIAS (Simuladas com base real) --------------------
const dadosCiclovias = [
  // Savassi
  {
    type: 'way',
    geometry: [
      { lat: -19.9325, lon: -43.9340 },
      { lat: -19.9305, lon: -43.9355 },
      { lat: -19.9280, lon: -43.9370 },
      { lat: -19.9250, lon: -43.9380 },
      { lat: -19.9200, lon: -43.9390 }
    ],
    tags: { name: 'Ciclovia Centro–Savassi (simulada)' }
  },
  // Pampulha
  {
    type: 'way',
    geometry: [
      { lat: -19.9185, lon: -43.9380 }, // Centro
      { lat: -19.9090, lon: -43.9350 }, // Antônio Carlos
      { lat: -19.8970, lon: -43.9430 }, // UFMG
      { lat: -19.8750, lon: -43.9600 }, // Av. Carlos Luz
      { lat: -19.8655, lon: -43.9710 }  // Lagoa da Pampulha
    ],
    tags: { name: 'Ciclovia Centro–Pampulha (simulada)' }
  },
  // Barreiro
  {
    type: 'way',
    geometry: [
      { lat: -19.9755, lon: -44.0163 }, // Barreiro
      { lat: -19.9600, lon: -43.9920 },
      { lat: -19.9400, lon: -43.9600 },
      { lat: -19.9250, lon: -43.9400 },
      { lat: -19.9185, lon: -43.9380 }  // Centro
    ],
    tags: { name: 'Ciclovia Barreiro–Centro (simulada)' }
  }
];

// -------------------- ROTAS DE ÔNIBUS (Aproximadas e realistas) --------------------
const dadosOnibus = [
  {
    nome: '5106 - Centro → Savassi',
    cor: 'red',
    ciclovia: 'Ciclovia Centro–Savassi (simulada)',
    rota: [
      [-19.91854, -43.93802], // Praça Sete
      [-19.92230, -43.93648],
      [-19.92940, -43.93510],
      [-19.93790, -43.93260]  // Savassi
    ]
  },
  {
    nome: '4103 - Centro → Pampulha',
    cor: 'red',
    ciclovia: 'Ciclovia Centro–Pampulha (simulada)',
    rota: [
      [-19.91854, -43.93802], // Praça Sete
      [-19.90770, -43.93590],
      [-19.89720, -43.94300],
      [-19.87500, -43.96000],
      [-19.86580, -43.97110]  // Lagoa da Pampulha
    ]
  },
  {
    nome: '9202 - Barreiro → Centro',
    cor: 'red',
    ciclovia: 'Ciclovia Barreiro–Centro (simulada)',
    rota: [
      [-19.97550, -44.01630], // Barreiro
      [-19.96080, -43.98760],
      [-19.94000, -43.96000],
      [-19.92500, -43.94000],
      [-19.91854, -43.93802]  // Praça Sete
    ]
  }
];

// -------------------- TEMPOS REALISTAS PARA COMPARAÇÃO --------------------
const temposMock = {
  "5106": { nome: "5106 - Centro → Savassi", tempo: 25, custo: 4.5, co2: "Médio", bike: 15 },
  "4103": { nome: "4103 - Centro → Pampulha", tempo: 55, custo: 4.5, co2: "Alto", bike: 35 },
  "9202": { nome: "9202 - Barreiro → Centro", tempo: 60, custo: 4.5, co2: "Alto", bike: 40 }
};
