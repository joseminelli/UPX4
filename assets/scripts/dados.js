// ===================== DADOS MOCK (SIMULADOS) =====================

// -------------------- ESTAÇÕES DE BICICLETAS --------------------
const dadosBicicletas = [
  { lat: -19.9329, lon: -43.9348, tags: { name: 'Estação Praça da Liberdade' } },
  { lat: -19.9300, lon: -43.9350, tags: { name: 'Estação Savassi' } },
  { lat: -19.9250, lon: -43.9400, tags: { name: 'Estação Av. Amazonas' } },
  { lat: -19.9185, lon: -43.9380, tags: { name: 'Estação Praça Sete (Centro)' } },
  { lat: -19.9085, lon: -43.9385, tags: { name: 'Estação Antônio Carlos (UFMG)' } },
  { lat: -19.8660, lon: -43.9710, tags: { name: 'Estação Pampulha' } },
  { lat: -19.9755, lon: -44.0163, tags: { name: 'Estação Barreiro' } },
  { lat: -19.9170, lon: -43.9310, tags: { name: 'Estação Praça da Estação' } },
  { lat: -19.9210, lon: -43.9420, tags: { name: 'Estação Mercado Central' } },
  { lat: -19.9130, lon: -43.9400, tags: { name: 'Estação Rodoviária' } },
  { lat: -19.8650, lon: -43.9810, tags: { name: 'Estação Mineirão' } }
];

// -------------------- CICLOVIAS (Simuladas com base real) --------------------
const dadosCiclovias = [
  // Savassi (AGORA PARTE DA AFONSO PENA)
  {
    type: 'way',
    geometry: [
      { lat: -19.9200, lon: -43.9390 }, // Perto Pça Sete
      { lat: -19.9250, lon: -43.9380 },
      { lat: -19.9280, lon: -43.9370 },
      { lat: -19.9305, lon: -43.9355 } // Perto Savassi
    ],
    tags: { name: 'Ciclovia Centro–Savassi (simulada)' }
  },
  // Pampulha (MAIS REALISTA)
  {
    type: 'way',
    geometry: [
      { lat: -19.9185, lon: -43.9380 }, // Centro
      { lat: -19.9090, lon: -43.9350 }, // Av. Antônio Carlos
      { lat: -19.8870, lon: -43.9560 }, // Perto da UFMG
      { lat: -19.8700, lon: -43.9690 }, // Av. Otacílio
      { lat: -19.8655, lon: -43.9710 }  // Lagoa da Pampulha
    ],
    tags: { name: 'Ciclovia Centro–Pampulha (simulada)' }
  },
  // Barreiro (MAIS REALISTA - ROTA PELA AV. AMAZONAS)
  {
    type: 'way',
    geometry: [
      { lat: -19.9755, lon: -44.0163 }, // Barreiro
      { lat: -19.9550, lon: -43.9800 }, // Av. Amazonas (altura Gameleira)
      { lat: -19.9300, lon: -43.9500 }, // Av. Amazonas (Barro Preto)
      { lat: -19.9185, lon: -43.9380 }  // Centro
    ],
    tags: { name: 'Ciclovia Barreiro–Centro (simulada)' }
  },
  // Av. Afonso Pena
  {
    type: 'way',
    geometry: [
      { lat: -19.9170, lon: -43.9310 }, // Praça da Estação
      { lat: -19.9230, lon: -43.9350 }, // Av. Afonso Pena
      { lat: -19.9329, lon: -43.9348 }, // Praça da Liberdade
      { lat: -19.9380, lon: -43.9290 }  // Fim Afonso Pena
    ],
    tags: { name: 'Ciclovia Av. Afonso Pena (simulada)' }
  },
  // Av. do Contorno (Trecho)
  {
    type: 'way',
    geometry: [
      { lat: -19.9350, lon: -43.9480 }, // Contorno (Prado)
      { lat: -19.9250, lon: -43.9550 }, // Contorno (Barro Preto)
      { lat: -19.9130, lon: -43.9400 }, // Contorno (Rodoviária)
      { lat: -19.9170, lon: -43.9250 }, // Contorno (Floresta)
      { lat: -19.9300, lon: -43.9220 }  // Contorno (Santa Efigênia)
    ],
    tags: { name: 'Ciclovia Av. Contorno (simulada)' }
  }
];

// -------------------- ROTAS DE ÔNIBUS (Aproximadas e realistas) --------------------
const dadosOnibus = [
  {
    nome: '5106 - Centro → Savassi',
    cor: 'red',
    // AGORA USANDO A CICLOVIA MAIS REALISTA DA AFONSO PENA
    ciclovia: 'Ciclovia Av. Afonso Pena (simulada)',
    rota: [
      [-19.91854, -43.93802], // Praça Sete
      [-19.92500, -43.93600], // Av. Afonso Pena
      [-19.93200, -43.93300], // Av. Getúlio Vargas
      [-19.93790, -43.93260]  // Savassi
    ]
  },
  {
    nome: '4103 - Centro → Pampulha',
    cor: 'red',
    ciclovia: 'Ciclovia Centro–Pampulha (simulada)',
    // ROTA MAIS REALISTA
    rota: [
      [-19.91854, -43.93802], // Praça Sete
      [-19.91300, -43.93900], // Av. Oiapoque
      [-19.90770, -43.93590], // Av. Antônio Carlos
      [-19.88500, -43.95500], // Perto da UFMG
      [-19.86900, -43.96800], // Av. Otacílio
      [-19.86580, -43.97110]  // Lagoa da Pampulha
    ]
  },
  {
    nome: '9202 - Barreiro → Centro',
    cor: 'red',
    ciclovia: 'Ciclovia Barreiro–Centro (simulada)',
    // ROTA MAIS REALISTA
    rota: [
      [-19.97550, -44.01630], // Barreiro
      [-19.96000, -43.99500], // Av. Tereza Cristina
      [-19.93500, -43.96000], // Av. Tereza Cristina (perto Carlos Prates)
      [-19.92800, -43.95200], // Av. Contorno
      [-19.91854, -43.93802]  // Praça Sete
    ]
  },
  {
    nome: 'SC01 - Contorno (Circular)',
    cor: 'red',
    ciclovia: 'Ciclovia Av. Contorno (simulada)',
    rota: [
      [-19.9350, -43.9480],
      [-19.9250, -43.9550],
      [-19.9130, -43.9400],
      [-19.9170, -43.9250],
      [-19.9300, -43.9220],
      [-19.9350, -43.9480] // Fecha o círculo
    ]
  },
  {
    nome: '2104 - Nova Gameleira',
    cor: 'red',
    ciclovia: 'Ciclovia Barreiro–Centro (simulada)', // Reusa a ciclovia da Amazonas
    rota: [
      [-19.9450, -43.9800], // Nova Gameleira
      [-19.9350, -43.9650], // Av. Amazonas
      [-19.9210, -43.9420], // Mercado Central
      [-19.91854, -43.93802] // Praça Sete
    ]
  },
  {
    nome: '8001 - Santa Inês',
    cor: 'red',
    ciclovia: 'Ciclovia Av. Afonso Pena (simulada)', // Usa como exemplo
    rota: [
      [-19.8950, -43.9000], // Santa Inês
      [-19.9100, -43.9200], // Horto
      [-19.9170, -43.9310], // Praça da Estação
      [-19.91854, -43.93802] // Praça Sete
    ]
  }
];

// -------------------- TEMPOS REALISTAS PARA COMPARAÇÃO --------------------
const temposMock = {
  "5106": { nome: "5106 - Centro → Savassi", tempo: 25, custo: 4.5, co2: "Médio", bike: 15 },
  "4103": { nome: "4103 - Centro → Pampulha", tempo: 55, custo: 4.5, co2: "Alto", bike: 35 },
  "9202": { nome: "9202 - Barreiro → Centro", tempo: 60, custo: 4.5, co2: "Alto", bike: 40 },
  "SC01": { nome: "SC01 - Contorno (Circular)", tempo: 45, custo: 4.5, co2: "Alto", bike: 30 },
  "2104": { nome: "2104 - Nova Gameleira", tempo: 35, custo: 4.5, co2: "Médio", bike: 20 },
  "8001": { nome: "8001 - Santa Inês", tempo: 40, custo: 4.5, co2: "Médio", bike: 25 }
};