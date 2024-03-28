// Função para carregar os dados do LocalStorage e exibir na tabela
function carregarDadosClientes() {
    var tabelaClientes = document.getElementById('tabelaClientes');
    tabelaClientes.innerHTML = ''; // Limpa o conteúdo atual da tabela

    // Recupera os dados do LocalStorage
    var dadosClientes = JSON.parse(localStorage.getItem('DadosClientes'));

    // Verifica se há dados no LocalStorage
    if (dadosClientes && dadosClientes.length > 0) {
        // Itera sobre os dados e adiciona cada cliente à tabela
        dadosClientes.forEach(function(cliente, index) {
            var newRow = tabelaClientes.insertRow();

            var cellNome = newRow.insertCell(0);
            var cellTelefone = newRow.insertCell(1);
            var cellEndereco = newRow.insertCell(2);
            var cellEmail = newRow.insertCell(3);
            var cellEdicao = newRow.insertCell(4);

            cellNome.innerHTML = cliente.nomeCliente;
            cellTelefone.innerHTML = cliente.telefone;
            cellEndereco.innerHTML = cliente.endereco;
            cellEmail.innerHTML = cliente.email;

            // Adiciona emojis de lápis e "x" na coluna de edição
            cellEdicao.innerHTML = '<span class="editar edicao-cell" onclick="editarCliente(' + index + ')" title="Editar">&#9998;</span> <span class="excluir edicao-cell" onclick="excluirCliente(' + index + ')" title="Excluir">&#10060;</span>';
        });
    } else {
        // Se não houver dados, exibe uma mensagem na tabela
        var newRow = tabelaClientes.insertRow();
        var cellMessage = newRow.insertCell(0);
        cellMessage.colSpan = 5;
        cellMessage.innerHTML = 'Nenhum cliente cadastrado.';
    }
}

// Função para excluir um cliente do LocalStorage
function excluirCliente(index) {
    var confirmacao = confirm('Tem certeza que deseja excluir este cliente?');
    if (confirmacao) {
        var dadosClientes = JSON.parse(localStorage.getItem('DadosClientes'));
        dadosClientes.splice(index, 1);
        localStorage.setItem('DadosClientes', JSON.stringify(dadosClientes));
        carregarDadosClientes(); // Recarrega os dados na tabela após a exclusão
    }
}


// Função para editar um cliente
function editarCliente(index) {
    var dadosClientes = JSON.parse(localStorage.getItem('DadosClientes'));
    var cliente = dadosClientes[index];
    
    // Preenche o modal com os dados do cliente
    document.getElementById('novoValor').value = "";
    
    // Mostra o modal
    var modal = new bootstrap.Modal(document.getElementById('editarCampoModal'));
    modal.show();
    
    // Armazena o índice do cliente a ser editado no localStorage
    localStorage.setItem('ClienteIndex', index);
}

// Função para salvar as alterações feitas no modal
function salvarEdicao() {
    var campo = document.getElementById('campoEditar').value;
    var novoValor = document.getElementById('novoValor').value;
    
    var dadosClientes = JSON.parse(localStorage.getItem('DadosClientes'));
    var index = Number(localStorage.getItem('ClienteIndex'));
    
    if (index !== null && dadosClientes && dadosClientes[index] && dadosClientes[index].hasOwnProperty(campo)) {
        dadosClientes[index][campo] = novoValor;
        localStorage.setItem('DadosClientes', JSON.stringify(dadosClientes));
        carregarDadosClientes(); // Recarrega os dados na tabela após a edição
    } else {
        alert("Erro ao salvar alterações.");
    }
    
    // Fecha o modal após salvar as alterações
    var modal = bootstrap.Modal.getInstance(document.getElementById('editarCampoModal'));
    modal.hide();
}

// Chama a função para carregar os dados dos clientes quando a página é carregada
window.addEventListener('load', carregarDadosClientes);

