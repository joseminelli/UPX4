// ===================== DADOS MOCK (SIMULADOS) =====================

// -------------------- ESTAÇÕES DE BICICLETAS --------------------
const dadosBicicletas = [
  {
    lat: -19.9329,
    lon: -43.9348,
    tags: { name: "Estação Praça da Liberdade" },
    capacity: 15,
  },
  {
    lat: -19.93,
    lon: -43.935,
    tags: { name: "Estação Praça da Savassi" },
    capacity: 20,
  },
  {
    lat: -19.9335,
    lon: -43.9398,
    tags: { name: "Estação Rua Alagoas (Lourdes)" },
    capacity: 12,
  },
  {
    lat: -19.9402,
    lon: -43.9355,
    tags: { name: "Estação Pátio Savassi" },
    capacity: 18,
  },
  {
    lat: -19.925,
    lon: -43.94,
    tags: { name: "Estação Av. Amazonas (Pça Raul Soares)" },
    capacity: 15,
  },
  {
    lat: -19.9185,
    lon: -43.938,
    tags: { name: "Estação Praça Sete (Centro)" },
    capacity: 20,
  },
  {
    lat: -19.922,
    lon: -43.9378,
    tags: { name: "Estação Rua da Bahia (Centro)" },
    capacity: 12,
  },
  {
    lat: -19.921,
    lon: -43.942,
    tags: { name: "Estação Mercado Central" },
    capacity: 18,
  },
  {
    lat: -19.917,
    lon: -43.931,
    tags: { name: "Estação Praça da Estação" },
    capacity: 15,
  },
  {
    lat: -19.913,
    lon: -43.94,
    tags: { name: "Estação Rodoviária" },
    capacity: 15,
  },
  {
    lat: -19.9118,
    lon: -43.929,
    tags: { name: "Estação Bairro Floresta" },
    capacity: 12,
  },
  {
    lat: -19.9215,
    lon: -43.925,
    tags: { name: "Estação Av. Andradas (Santa Efigênia)" },
    capacity: 12,
  },
  {
    lat: -19.9282,
    lon: -43.927,
    tags: { name: "Estação Área Hospitalar" },
    capacity: 18,
  },
  {
    lat: -19.9085,
    lon: -43.9385,
    tags: { name: "Estação Antônio Carlos (UFMG)" },
    capacity: 20,
  },
  {
    lat: -19.866,
    lon: -43.971,
    tags: { name: "Estação Mineirão" },
    capacity: 15,
  },
  {
    lat: -19.9755,
    lon: -44.0163,
    tags: { name: "Estação Barreiro" },
    capacity: 20,
  },
  // --- NOVOS DADOS PAMPULHA/CASTELO ---
  {
    lat: -19.8548,
    lon: -43.97,
    tags: { name: "Estação Casa do Baile" },
    capacity: 12,
  },
  {
    lat: -19.872,
    lon: -43.987,
    tags: { name: "Estação Av. Fleming" },
    capacity: 15,
  },
  {
    lat: -19.86,
    lon: -43.9945,
    tags: { name: "Estação Parque Ecológico" },
    capacity: 12,
  },
  {
    lat: -19.891,
    lon: -44,
    tags: { name: "Estação Av. dos Engenheiros (Castelo)" },
    capacity: 15,
  },
];

// -------------------- CICLOVIAS (Simuladas com base real) --------------------
const dadosCiclovias = [
  {
    type: "way",
    geometry: [
      { lat: -19.917, lon: -43.931 },
      { lat: -19.9195, lon: -43.9338 },
      { lat: -19.923, lon: -43.935 },
      { lat: -19.928, lon: -43.9352 },
      { lat: -19.9329, lon: -43.9348 },
      { lat: -19.935, lon: -43.9335 },
      { lat: -19.938, lon: -43.929 },
      { lat: -19.9415, lon: -43.9265 },
    ],
    tags: { name: "Ciclovia Eixo Av. Afonso Pena (simulada)" },
  },
  {
    type: "way",
    geometry: [
      { lat: -19.913, lon: -43.94 },
      { lat: -19.909, lon: -43.935 },
      { lat: -19.9, lon: -43.945 },
      { lat: -19.887, lon: -43.956 },
      { lat: -19.879, lon: -43.962 },
      { lat: -19.87, lon: -43.969 },
      { lat: -19.8655, lon: -43.971 },
    ],
    tags: { name: "Ciclovia Eixo Centro–Pampulha (simulada)" },
  },
  {
    type: "way",
    geometry: [
      { lat: -19.9755, lon: -44.0163 },
      { lat: -19.968, lon: -44.005 },
      { lat: -19.96, lon: -43.992 },
      { lat: -19.951, lon: -43.978 },
      { lat: -19.942, lon: -43.965 },
      { lat: -19.935, lon: -43.958 },
    ],
    tags: { name: "Ciclovia Av. Tereza Cristina (simulada)" },
  },
  {
    type: "way",
    geometry: [
      { lat: -19.935, lon: -43.965 },
      { lat: -19.93, lon: -43.95 },
      { lat: -19.925, lon: -43.945 },
      { lat: -19.921, lon: -43.941 },
      { lat: -19.9185, lon: -43.938 },
    ],
    tags: { name: "Ciclovia Av. Amazonas (Centro)" },
  },
  {
    type: "way",
    geometry: [
      { lat: -19.935, lon: -43.958 },
      { lat: -19.94, lon: -43.95 },
      { lat: -19.942, lon: -43.943 },
      { lat: -19.9402, lon: -43.9355 },
      { lat: -19.935, lon: -43.928 },
      { lat: -19.9282, lon: -43.927 },
      { lat: -19.925, lon: -43.923 },
    ],
    tags: { name: "Ciclovia Av. do Contorno (Sul)" },
  },
  {
    type: "way",
    geometry: [
      { lat: -19.917, lon: -43.931 },
      { lat: -19.919, lon: -43.928 },
      { lat: -19.9215, lon: -43.925 },
      { lat: -19.915, lon: -43.918 },
      { lat: -19.908, lon: -43.91 },
    ],
    tags: { name: "Ciclovia Av. Andradas (Leste)" },
  },
  {
    type: "way",
    geometry: [
      { lat: -19.875, lon: -43.985 },
      { lat: -19.879, lon: -43.99 },
      { lat: -19.882, lon: -43.995 },
      { lat: -19.889, lon: -44.005 },
    ],
    tags: { name: "Ciclovia Eixo Castelo (Av. Engenheiros)" },
  },
];

// -------------------- ROTAS DE ÔNIBUS (Aproximadas e realistas) --------------------
const dadosOnibus = [
  {
    nome: "5106 - Centro → Savassi",
    ciclovia: "Ciclovia Eixo Av. Afonso Pena (simulada)",
    rota: [
      [-19.91854, -43.93802],
      [-19.925, -43.936],
      [-19.932, -43.933],
      [-19.9379, -43.9326],
    ],
  },
  {
    nome: "4103 - Centro → Pampulha",
    ciclovia: "Ciclovia Eixo Centro–Pampulha (simulada)",
    rota: [
      [-19.91854, -43.93802],
      [-19.913, -43.939],
      [-19.9077, -43.9359],
      [-19.885, -43.955],
      [-19.869, -43.968],
      [-19.8658, -43.9711],
    ],
  },
  {
    nome: "9202 - Barreiro → Centro",
    ciclovia: "Ciclovia Av. Tereza Cristina (simulada)",
    rota: [
      [-19.9755, -44.0163],
      [-19.968, -44.005],
      [-19.96, -43.995],
      [-19.951, -43.978],
      [-19.942, -43.965],
      [-19.935, -43.958],
      [-19.928, -43.952],
      [-19.91854, -43.93802],
    ],
  },
  {
    nome: "SC01 - Contorno (Circular)",
    ciclovia: "Ciclovia Av. do Contorno (Sul)",
    rota: [
      [-19.935, -43.958],
      [-19.94, -43.95],
      [-19.942, -43.943],
      [-19.9402, -43.9355],
      [-19.935, -43.928],
      [-19.9282, -43.927],
      [-19.925, -43.923],
    ],
  },
  {
    nome: "2104 - Nova Gameleira",
    ciclovia: "Ciclovia Av. Amazonas (Centro)",
    rota: [
      [-19.945, -43.98],
      [-19.935, -43.965],
      [-19.93, -43.95],
      [-19.921, -43.942],
      [-19.91854, -43.93802],
    ],
  },
  {
    nome: "8001 - Santa Inês",
    ciclovia: "Ciclovia Av. Andradas (Leste)",
    rota: [
      [-19.908, -43.91],
      [-19.915, -43.918],
      [-19.917, -43.931],
      [-19.91854, -43.93802],
    ],
  },
  {
    nome: "9103 - Santa Efigênia",
    ciclovia: "Ciclovia Av. do Contorno (Sul)",
    rota: [
      [-19.9282, -43.927],
      [-19.935, -43.928],
      [-19.93, -43.935],
      [-19.925, -43.938],
      [-19.91854, -43.93802],
    ],
  },
  {
    nome: "4111 - Dom Cabral",
    ciclovia: "Ciclovia Av. Amazonas (Centro)",
    rota: [
      [-19.92, -43.975],
      [-19.925, -43.96],
      [-19.921, -43.942],
      [-19.91854, -43.93802],
    ],
  },
  // --- NOVAS LINHAS PAMPULHA/CASTELO ---
  {
    nome: "5201 - Circular Pampulha",
    ciclovia: "Ciclovia Orla da Lagoa (simulada)",
    rota: [
      [-19.866, -43.971],
      [-19.856, -43.968],
      [-19.845, -43.972],
      [-19.839, -43.979],
      [-19.85, -43.985],
      [-19.865, -43.981],
      [-19.866, -43.971],
    ],
  },
  {
    nome: "S54 - Castelo / Ouro Preto",
    ciclovia: "Ciclovia Eixo Castelo (Av. Engenheiros)",
    rota: [
      [-19.889, -44.005],
      [-19.882, -43.995],
      [-19.879, -43.99],
      [-19.875, -43.985],
      [-19.87, -43.979],
      [-19.87, -43.969],
    ],
  },
];

// -------------------- TEMPOS REALISTAS PARA COMPARAÇÃO --------------------
const temposMock = {
  5106: {
    nome: "5106 - Centro → Savassi",
    tempo: 25,
    custo: 4.5,
    co2: "Médio",
    bike: 15,
  },
  4103: {
    nome: "4103 - Centro → Pampulha",
    tempo: 55,
    custo: 4.5,
    co2: "Alto",
    bike: 35,
  },
  9202: {
    nome: "9202 - Barreiro → Centro",
    tempo: 60,
    custo: 4.5,
    co2: "Alto",
    bike: 40,
  },
  SC01: {
    nome: "SC01 - Contorno (Circular)",
    tempo: 45,
    custo: 4.5,
    co2: "Alto",
    bike: 30,
  },
  2104: {
    nome: "2104 - Nova Gameleira",
    tempo: 35,
    custo: 4.5,
    co2: "Médio",
    bike: 20,
  },
  8001: {
    nome: "8001 - Santa Inês",
    tempo: 40,
    custo: 4.5,
    co2: "Médio",
    bike: 25,
  },
  9103: {
    nome: "9103 - Santa Efigênia",
    tempo: 30,
    custo: 4.5,
    co2: "Médio",
    bike: 18,
  },
  4111: {
    nome: "4111 - Dom Cabral",
    tempo: 40,
    custo: 4.5,
    co2: "Médio",
    bike: 25,
  },
  // --- NOVOS MOCKS PAMPULHA/CASTELO ---
  5201: {
    nome: "5201 - Circular Pampulha",
    tempo: 50,
    custo: 4.5,
    co2: "Médio",
    bike: 30,
  },
  S54: {
    nome: "S54 - Castelo / Ouro Preto",
    tempo: 25,
    custo: 4.5,
    co2: "Baixo",
    bike: 15,
  },
};
