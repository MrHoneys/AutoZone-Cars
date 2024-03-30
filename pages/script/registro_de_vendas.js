// Script para exibir os dados do Local Storage na tabela HTML
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há dados armazenados no Local Storage
    if(localStorage.getItem('VendasCarros')) {
        // Recupera os dados do Local Storage
        var vendasCarros = JSON.parse(localStorage.getItem('VendasCarros'));
        
        // Obtém a referência da tabela
        var tabela = document.getElementById('tabelaCarros');

        // Itera sobre os dados e os adiciona à tabela
        vendasCarros.forEach(function(venda) {
            // Cria uma nova linha na tabela
            var row = tabela.insertRow();

            // Insere as células na linha
            var modeloCell = row.insertCell(0);
            var clienteCell = row.insertCell(1);
            var financiamentoCell = row.insertCell(2);
            var extrasCell = row.insertCell(3); // Adiciona uma célula para os extras
            var valorTotalCell = row.insertCell(4);
            var dataVendaCell = row.insertCell(5);

            // Preenche as células com os dados da venda
            modeloCell.innerHTML = venda.carroSelecionado;
            clienteCell.innerHTML = venda.clienteSelecionado;

            // Verifica a opção de financiamento e define o texto correspondente
            var opcaoFinanciamentoTexto;
            if (venda.opcaoFinanciamento === "1") {
                opcaoFinanciamentoTexto = 'Sem financiamento';
            } else if (venda.opcaoFinanciamento === "1.1") {
                opcaoFinanciamentoTexto = 'Financiamento a 110% do valor do carro';
            } else if (venda.opcaoFinanciamento === "1.2") {
                opcaoFinanciamentoTexto = 'Financiamento a 120% do valor do carro';
            } else {
                opcaoFinanciamentoTexto = 'Opção de financiamento inválida';
            }
            financiamentoCell.innerHTML = opcaoFinanciamentoTexto;

            // Itera sobre os extras e exibe apenas o nome
            var extrasHTML = '';
            venda.extras.forEach(function(extra) {
                extrasHTML += extra.nome + '<br>';
            });
            extrasCell.innerHTML = extrasHTML;

            valorTotalCell.innerHTML = venda.valorTotal;
            dataVendaCell.innerHTML = venda.data;
        });
    }
});
