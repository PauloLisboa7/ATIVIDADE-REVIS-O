// services.js
// Simulação de API com atrasos e possíveis erros

const _fakeData = [
  { id: 1, name: 'Item Alpha', value: 10 },
  { id: 2, name: 'Item Beta', value: 20 },
  { id: 3, name: 'Item Gamma', value: 30 }
];

const _randomDelay = () => Math.floor(Math.random() * 1200) + 300;

const fetchItems = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([..._fakeData]), _randomDelay());
  });
};

const fetchItemById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = _fakeData.find((x) => x.id === Number(id));
      if (found) resolve(found);
      else reject(new Error('Item não encontrado'));
    }, _randomDelay());
  });
};

// Função que depende do resultado de outra (encadeamento)
const fetchRelatedInfo = async (id) => {
  const item = await fetchItemById(id);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: item.id, extra: `${item.name} - detalhe` }), _randomDelay());
  });
};

// Expor as funções para uso no app (navegador) e também como módulo (Node)
if (typeof window !== 'undefined') {
  window.services = {
    fetchItems,
    fetchItemById,
    fetchRelatedInfo
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    fetchItems,
    fetchItemById,
    fetchRelatedInfo
  };
}
