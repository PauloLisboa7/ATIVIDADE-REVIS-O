// app.js
// Utiliza arrow functions e async/await para controlar o mini-dashboard

const $ = (sel) => document.querySelector(sel);
const logArea = $('#logs');
const results = $('#results');

const appendLog = (msg) => {
  const p = document.createElement('div');
  p.textContent = `${new Date().toLocaleTimeString()} — ${msg}`;
  logArea.prepend(p);
};

const renderList = (items) => {
  results.innerHTML = '';
  items.forEach((it) => {
    const d = document.createElement('div');
    d.className = 'item';
    d.textContent = `#${it.id} - ${it.name} (valor: ${it.value})`;
    results.appendChild(d);
  });
};

// Handlers (arrow functions)
const handleLoad = async () => {
  appendLog('Iniciando carregamento de itens...');
  try {
    const items = await window.services.fetchItems();
    renderList(items);
    appendLog('Lista carregada com sucesso');
  } catch (err) {
    appendLog('Erro ao carregar itens: ' + err.message);
  }
};

const handleSearch = async () => {
  const id = $('#searchId').value.trim();
  if (!id) {
    appendLog('Informe um ID válido');
    return;
  }
  appendLog(`Pesquisando item ${id}...`);
  try {
    const item = await window.services.fetchItemById(id);
    renderList([item]);
    appendLog('Pesquisa concluída com sucesso');
  } catch (err) {
    appendLog('Erro na pesquisa: ' + err.message);
  }
};

// Exemplo de encadeamento: busca um item e depois informações relacionadas
const handleChain = async () => {
  const id = $('#searchId').value.trim() || '1';
  appendLog(`Iniciando sequência encadeada para id=${id}`);
  try {
    const item = await window.services.fetchItemById(id);
    appendLog(`Item encontrado: ${item.name}`);
    const related = await window.services.fetchRelatedInfo(item.id);
    appendLog(`Info relacionada: ${related.extra}`);
    renderList([item]);
  } catch (err) {
    appendLog('Erro na cadeia: ' + err.message);
  }
};

const handleClear = () => {
  logArea.innerHTML = '';
  results.innerHTML = '';
};

// Conectar eventos (arrow functions como handlers)
$('#btnLoad').addEventListener('click', () => handleLoad());
$('#btnSearch').addEventListener('click', () => handleSearch());
$('#btnChain').addEventListener('click', () => handleChain());
$('#btnClear').addEventListener('click', () => handleClear());

// Instrução rápida para desenvolvedor: testes manuais
appendLog('Dashboard pronto — use os botões acima para testar.');
