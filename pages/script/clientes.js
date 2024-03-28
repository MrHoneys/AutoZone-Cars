// Função para salvar os dados no LocalStorage e exibir na tabela
function salvarDados() {
    var form = document.getElementById('cadastroForm');
    var elements = form.elements;
    var dadosCliente = {};

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.type !== 'checkbox') {
            dadosCliente[element.id] = element.value;
        }
    }

    var dadosClientesExistente = JSON.parse(localStorage.getItem('DadosClientes')) || [];
    dadosClientesExistente.push(dadosCliente);
    localStorage.setItem('DadosClientes', JSON.stringify(dadosClientesExistente));

    alert('Dados salvos com sucesso!');

    limparCampos();
}

// Evento de envio do formulário
document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impedir o envio padrão do formulário
    salvarDados(); // Chamar a função para salvar os dados
});

// Função para limpar os campos do formulário
function limparCampos() {
    var form = document.getElementById('cadastroForm');
    var elements = form.elements;

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.type !== 'checkbox') {
            element.value = '';
        }
    }
}