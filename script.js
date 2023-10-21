const controls = document.querySelector('#controls');
const gridControls = document.querySelector('#grid-controls');

const configControls = [
  { name: 'Porta - Garagem', class: 'door' },
  { name: 'Porta - Frente', class: 'door' },
  { name: 'Luz 1 - Pátio', class: 'light' },
  { name: 'Luz 2 - Portaria', class: 'light' },
  { name: 'Luz 3 - Sala de estar', class: 'light' },
  { name: 'Luz 4 - Cozinha', class: 'light' },
  { name: 'Luz 5 - Quarto', class: 'light' },
  { name: 'Luz 6 - Quarto', class: 'light' },
  { name: 'Luz 7 - Quarto', class: 'light' },
  { name: 'Outra coisa', class: 'misc' },
  { name: 'Outra coisa', class: 'misc' },
];

async function fetchGet() {
  let values;
  await fetch('https://eco-life.onrender.com/valor')
    .then((resposta) => {
      return resposta.json();
    })
    .then((final) => {
      valores = final[0].values;
    })
    .finally(() => {
      document.getElementById('controls').classList.remove('loading');
    })
    .catch((erro) => {
      console.log(erro.message);
    });

  console.log(valores);

  configControls.forEach((item, number) => {
    const container = document.createElement('div');
    container.className = 'control-item ' + item.class;

    const icon = document.createElement('img');
    icon.setAttribute('src', 'img/objetos/' + item.class + '.svg');
    console.log(item);

    const title = document.createElement('h3');
    title.innerText = item.name;

    const btn = document.createElement('button');
    btn.addEventListener('click', patch);

    if (valores[number] === 'true') {
      btn.className = 'on';
      container.classList.add('on');
    } else if (valores[number] === 'false') {
      btn.className = 'off';
      container.classList.add('off');
    }

    container.dataset.id = number;
    container.appendChild(icon);
    container.appendChild(title);
    container.appendChild(btn);

    gridControls.appendChild(container);
  });
}

fetchGet();

async function patch(e) {
  const number = e.target.parentElement.dataset.id;
  console.log(number);
  e.target.disabled = true;

  await fetch('https://eco-life.onrender.com/valor/' + number, {
    method: 'PATCH',
  })
    .then((r) => {
      console.log(r);

      if(e.target.parentElement.classList.contains('off')){
        e.target.parentElement.classList.remove('off');
        e.target.parentElement.classList.add('on');
      } else {
        e.target.parentElement.classList.remove('on');
        e.target.parentElement.classList.add('off');
      }
    })
    .finally(() => {
      e.target.disabled = false;
    });
}
