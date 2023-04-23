import './style.css';
import Swal from 'sweetalert2';

// Capturar elementos
const btn = document.getElementById('btnPesquisar');
const container = document.getElementById('container'); // elemento pai
let emoji = '\u{1F4B0}';


// Event Listenner
btn.addEventListener('click', (event) => {
  event.preventDefault();
  container.innerText = '';
  const moeda = document.getElementById('inputMoeda').value.toUpperCase();

  const url = `https://api.exchangerate.host/latest?base=${moeda}`;

  fetch(url)
    .then((promise) => promise.json())
    .then((data) => {
      validarMoeda(moeda, data.rates);
      listarMoedas(moeda, data.rates);
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    });
});

function validarMoeda(moeda, obj) {
  const array = [];
  for (const chave in obj) { array.push(chave); }
  if (moeda === '') throw new Error('Você precisa passar uma moeda!');
  if (array.includes(moeda) === false) throw new Error('Moeda invávida');
}

function listarMoedas(moeda, obj) {
  const titulo = document.createElement('h2');
  titulo.innerText = `Valores referentes a 1 ${moeda}`;
  container.appendChild(titulo);

  for (const chave in obj) {
    const caixa = document.createElement('div');
    caixa.className = 'moedas';
    caixa.innerHTML = `${emoji} ${chave}  - <span>${obj[chave].toFixed(2)}</span>`;
    container.appendChild(caixa);
  }
}
