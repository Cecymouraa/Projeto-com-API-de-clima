
//Chave de acesso para usar a API- Código que libera o acesso- você precisa dela para usar o serviço
const apiKey = '559e28e5e7b122a95590725f19297365';
// Função que será chamada quando o usuário quiser buscar o clima
function buscarClima() {
  const cidade = document.getElementById('city').value.trim(); // Captura o valor digitado no input com id="city" e remove espaços extras
  if (!cidade) {   // Se o campo estiver vazio, exibe um alerta e interrompe a função
    alert('Digite uma cidade!');
    return; 
  }
  // Faz a requisição para a API de previsão do tempo com a cidade digitada
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`) //pedir os dados de previsão do tempo
    .then(res => res.json()) // Converte a resposta da API para JSON
    .then(data => {  // Verifica se o código de retorno é diferente de "200" (sucesso)
      if (data.cod !== "200") {
        alert('Cidade não encontrada.'); // Mostra alerta de erro
        return;
      }
      mostrarPrevisao(data);  // Se os dados estiverem corretos, chama a função que mostra a previsão
    })
    .catch(error => { // Caso aconteça algum erro na requisição (ex: falta de internet)
      console.error(error);
      alert('Erro ao buscar a cidade.'); //um alerta no console.log
    });
}
// Função que recebe os dados da API e exibe a previsão do tempo
function mostrarPrevisao(data) { // Seleciona a div onde a previsão será exibida
  const previsao = document.getElementById('previsao'); 
  // Limpa o conteúdo anterior (caso já tenha uma previsão na tela)
  previsao.innerHTML = '';

  // Filtra os dados para mostrar só os que tem horário 12:00:00 (meio-dia)
  const listaFiltrada = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  listaFiltrada.slice(0, 4).forEach(item => { //escolhe os quatro dias para mostar a previsão
    // Converte a data e formata para dia da semana + dia/mês
    const dataFormatada = new Date(item.dt * 1000).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit'
    });
    // Adiciona dinamicamente um card HTML com os dados do dia: data, temperatura e descrição do clima
    previsao.innerHTML += ` 
      <div class="card"> 
        <h3>${dataFormatada}</h3>
        <p>Temp: ${item.main.temp.toFixed(1)}°C</p>
        <p>${item.weather[0].description}</p>
      </div>
    `;
  });
} 

// Função que atualiza o horário em tempo real
function atualizarRelogio() {
  const agora = new Date(); // Pega a hora atual
  const hora = agora.toLocaleTimeString('pt-BR', {
    hour: '2-digit', // Exibe somente 2 dígitos para hora
    minute: '2-digit'  // Exibe somente 2 dígitos para minuto
  });
  // Atualiza o conteúdo do elemento com id="horario"
  document.getElementById('horario').textContent = hora;
}

// Quando a página terminar de carregar
window.onload = function() {
  atualizarRelogio(); // Mostra a hora imediatamente
  setInterval(atualizarRelogio, 1000); // Atualiza o relógio a cada segundo
};
