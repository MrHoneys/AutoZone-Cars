// Modifique a função carregarDadosCarros para incluir um evento de clique para o emoji "X"
function carregarDadosCarros() {
    var tabelaCarros = document.getElementById('tabelaCarros');
    tabelaCarros.innerHTML = ''; // Limpa o conteúdo atual da tabela

    // Recupera os dados do LocalStorage
    var dadosCarros = JSON.parse(localStorage.getItem('carros'));

    // Verifica se há dados no LocalStorage
    if (dadosCarros && dadosCarros.length > 0) {
        // Itera sobre os dados e adiciona cada carro à tabela
        dadosCarros.forEach(function(carro, index) {
            var newRow = tabelaCarros.insertRow();

            var cellModelo = newRow.insertCell(0);
            var cellMarca = newRow.insertCell(1);
            var cellAno = newRow.insertCell(2);
            var cellTipo = newRow.insertCell(3);
            var cellPreco = newRow.insertCell(4);
            var cellCaracteristicas = newRow.insertCell(5);
            var cellEdicao = newRow.insertCell(6);

            cellModelo.innerHTML = carro.nome;
            cellMarca.innerHTML = carro.marca;
            cellAno.innerHTML = carro.ano;
            cellTipo.innerHTML = carro.tipo;
            cellPreco.innerHTML = carro.preco;
            cellCaracteristicas.innerHTML = carro.caracteristicas;

            // Adiciona emojis de lápis e "x" na coluna de edição
            cellEdicao.innerHTML = '<span class="editar edicao-cell" onclick="abrirModalEdicao(' + index + ')" title="Editar">&#9998;</span> <span class="excluir edicao-cell" onclick="excluirCarro(' + index + ')" title="Excluir">&#10060;</span>';
        });
    } else {
        // Se não houver dados, exibe uma mensagem na tabela
        var newRow = tabelaCarros.insertRow();
        var cellMessage = newRow.insertCell(0);
        cellMessage.colSpan = 7; // Colspan 7 para ocupar todas as colunas
        cellMessage.innerHTML = 'Nenhum carro cadastrado.';
    }
}

// Função para abrir o modal de edição com os dados do carro correspondente
function abrirModalEdicao(index) {
    // Preenche o modal com os dados do carro correspondente
    var dadosCarros = JSON.parse(localStorage.getItem('carros'));
    var carro = dadosCarros[index];
    
    document.getElementById('novoValor').value = carro.nome; // Preencha com o valor desejado

    // Se você quiser preencher o campo "Campo a Editar" com o campo correspondente do carro, você pode fazer algo como:
    // document.getElementById('campoEditar').value = 'nome'; // Substitua 'nome' pelo campo correspondente do carro
    
    // Mostra o modal
    var modal = new bootstrap.Modal(document.getElementById('editarCampoModal'));
    modal.show();

    // Armazena o índice do carro a ser editado no localStorage
    localStorage.setItem('CarroIndex', index);
}

// Função para salvar as alterações feitas no modal
function salvarEdicao() {
    var campo = document.getElementById('campoEditar').value;
    var novoValor = document.getElementById('novoValor').value;
    
    var dadosCarros = JSON.parse(localStorage.getItem('carros'));
    var index = Number(localStorage.getItem('CarroIndex'));
    
    if (index !== null && dadosCarros && dadosCarros[index] && dadosCarros[index].hasOwnProperty(campo)) {
        dadosCarros[index][campo] = novoValor;
        localStorage.setItem('carros', JSON.stringify(dadosCarros));
        carregarDadosCarros(); // Recarrega os dados na tabela após a edição
        
        // Fecha o modal após salvar as alterações
        var modal = bootstrap.Modal.getInstance(document.getElementById('editarCampoModal'));
        modal.hide();
    } else {
        alert("Erro ao salvar alterações.");
    }
}

// Adicionar evento de clique ao botão "Salvar Alterações"

// Função para excluir um carro do LocalStorage
function excluirCarro(index) {
    // Confirmação com o usuário
    var confirmacao = confirm("Tem certeza que deseja excluir este carro?");
    
    if (confirmacao) {
        var dadosCarros = JSON.parse(localStorage.getItem('carros'));

        // Remove o carro correspondente do array
        dadosCarros.splice(index, 1);

        // Atualiza o LocalStorage com os novos dados
        localStorage.setItem('carros', JSON.stringify(dadosCarros));

        // Recarrega os dados na tabela após a exclusão
        carregarDadosCarros();
    }
}




// Função para inicializar a página
function init() {
    // Chama a função para carregar os dados dos carros quando a página é carregada
    carregarDadosCarros();
}

// Chama a função init quando a página é carregada
window.addEventListener('load', init);
document.getElementById('botaoSalvar').addEventListener('click', salvarEdicao);
