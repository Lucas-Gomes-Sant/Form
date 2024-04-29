(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_clientes')) ?? [];
}

function setLocalStorage(bd_clientes) {
  localStorage.setItem('bd_clientes', JSON.stringify(bd_clientes));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_clientes = getLocalStorage();
  let index = 0;
  for (cliente of bd_clientes) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${cliente.nome}</td>
        <td>${cliente.nomePai}</td>
        <td>${cliente.nomeMae}</td>
        <td>${cliente.turno}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.area}</td>

        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const cliente = {
    nome: document.getElementById('nome').value,
    nomePai: document.getElementById('nomePai').value,
    nomeMae: document.getElementById('nomeMae').value,
    turno: document.getElementById('turno').value,
    cpf: document.getElementById('cpf').value,
    area: document.getElementById('area').value
  }
  const bd_clientes = getLocalStorage();
  bd_clientes.push(cliente);
  setLocalStorage(bd_clientes);
  atualizarTabela();
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const bd_clientes = getLocalStorage();
  bd_clientes.splice(index, 1);
  setLocalStorage(bd_clientes);
  atualizarTabela();
}

function validarCPF() { // Adaptação da função validar (10 pontos)
  const bd_clientes = getLocalStorage();
  for (cliente of bd_clientes) {
    if (celular.value == cliente.cpf) {
      cpf.setCustomValidity("Este cpf já existe!");
      feedbackCelular.innerText = "Este cpf já existe!";
      return false;
    } else {
      celular.setCustomValidity("");
      feedbackCelular.innerText = "Informe o CPF corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const cpf = document.getElementById("cpf");
const feedbackcpf = document.getElementById("feedbackcpf");
cpf.addEventListener('input', validarCPF);