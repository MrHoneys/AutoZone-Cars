document.addEventListener("DOMContentLoaded", function () {
    // Verifica se há informações de carros no armazenamento local
    if (localStorage.getItem("carros")) {
        // Parse dos dados JSON armazenados
        const carros = JSON.parse(localStorage.getItem("carros"));

        // Seleciona o elemento select
        const selectCarro = document.getElementById("carro");

        // Limpa as opções existentes
        selectCarro.innerHTML = "";

        // Adiciona uma opção padrão
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "Escolha um carro";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectCarro.appendChild(defaultOption);

        // Preenche o menu suspenso com as informações dos carros
        carros.forEach(carro => {
            const option = document.createElement("option");
            option.value = carro.nome; // Defina o valor da opção como o nome do carro
            option.text = carro.nome; // Defina o texto visível da opção como o nome do carro
            selectCarro.appendChild(option);
        });

        // Seleciona o elemento onde o resumo da venda será exibido
        const resumoVenda = document.getElementById("resumoVenda");

        // Adiciona um evento de alteração para exibir as informações do carro selecionado
        selectCarro.addEventListener("change", function () {
            // Limpa o resumo da venda
            resumoVenda.innerHTML = "";

            const carroSelecionado = carros.find(carro => carro.nome === selectCarro.value);
            if (carroSelecionado) {
                // Verifica se a propriedade 'preco' existe e possui um valor
                if (carroSelecionado.hasOwnProperty('preco') && carroSelecionado.preco) {
                    // Cria elementos para exibir as informações do carro no resumo da venda
                    const marcaElement = document.createElement("p");
                    marcaElement.textContent = "Marca: " + carroSelecionado.marca;

                    const precoElement = document.createElement("p");
                    precoElement.textContent = "Preço: " + carroSelecionado.preco;

                    const anoElement = document.createElement("p");
                    anoElement.textContent = "Ano: " + carroSelecionado.ano;

                    const tipoElement = document.createElement("p");
                    tipoElement.textContent = "Tipo: " + carroSelecionado.tipo;

                    // Adiciona os elementos ao resumo da venda
                    resumoVenda.appendChild(marcaElement);
                    resumoVenda.appendChild(precoElement);
                    resumoVenda.appendChild(anoElement);
                    resumoVenda.appendChild(tipoElement);
                } else {
                    // Se a propriedade 'preco' não existir ou não tiver um valor, exiba uma mensagem de erro
                    const erroElement = document.createElement("p");
                    erroElement.textContent = "Erro: O preço do carro não está disponível";
                    resumoVenda.appendChild(erroElement);
                }
            } else {
                // Se o carro selecionado não for encontrado, exiba uma mensagem de erro
                const erroElement = document.createElement("p");
                erroElement.textContent = "Erro: Carro não encontrado";
                resumoVenda.appendChild(erroElement);
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Verifica se há informações de carros no armazenamento local
    if (localStorage.getItem("carros")) {
        // Parse dos dados JSON armazenados
        const carros = JSON.parse(localStorage.getItem("carros"));

        // Seleciona o elemento select
        const selectCarro = document.getElementById("carro");

        // Limpa as opções existentes
        selectCarro.innerHTML = "";

        // Adiciona uma opção padrão
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "Escolha um carro";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectCarro.appendChild(defaultOption);

        // Preenche o menu suspenso com as informações dos carros
        carros.forEach(carro => {
            const option = document.createElement("option");
            option.value = carro.nome; // Defina o valor da opção como o nome do carro
            option.text = carro.nome; // Defina o texto visível da opção como o nome do carro
            selectCarro.appendChild(option);
        });

        // Seleciona o elemento select de opções de financiamento
        const selectFinanciamento = document.getElementById("opcaoFinanciamento");

        // Seleciona os elementos checkbox de extras
        const extrasCheckboxes = document.querySelectorAll('input[type="checkbox"]');

        // Seleciona o elemento onde o valor total da venda será exibido
        const valorTotalElement = document.getElementById("valorTotal");

        // Adiciona um evento de alteração para atualizar o preço total com base no carro selecionado, na opção de financiamento e nos extras
        selectCarro.addEventListener("change", atualizarValorTotal);
        selectFinanciamento.addEventListener("change", atualizarValorTotal);
        extrasCheckboxes.forEach(checkbox => {
            checkbox.addEventListener("change", atualizarValorTotal);
        });

        // Função para atualizar o valor total da venda
        function atualizarValorTotal() {
            const carroSelecionadoNome = selectCarro.value;
            const carroSelecionado = carros.find(carro => carro.nome === carroSelecionadoNome);

            // Calcula o preço total com base no carro selecionado
            let precoTotal = 0;
            if (carroSelecionado && carroSelecionado.hasOwnProperty('preco') && carroSelecionado.preco) {
                precoTotal = calcularPrecoTotal(carroSelecionado.preco);
            }

            // Calcula o valor dos extras
            let valorExtras = 0;
            extrasCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    valorExtras += parseFloat(checkbox.value);
                }
            });

            // Adiciona o valor dos extras ao preço total
            precoTotal += valorExtras;

            // Exibe o preço total formatado
            valorTotalElement.textContent = "Valor Total: R$ " + precoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        // Função para calcular o preço total do carro com base na opção de financiamento selecionada
        function calcularPrecoTotal(precoCarro) {
            let precoTotal;
            switch (selectFinanciamento.value) {
                case "1":
                    precoTotal = parseFloat(precoCarro.replace('R$', '').replace('.', '').replace(',', '.'));
                    break;
                case "1.1":
                    precoTotal = parseFloat(precoCarro.replace('R$', '').replace('.', '').replace(',', '.')) * 1.10;
                    break;
                case "1.2":
                    precoTotal = parseFloat(precoCarro.replace('R$', '').replace('.', '').replace(',', '.')) * 1.20;
                    break;
                default:
                    precoTotal = 0;
            }
            return precoTotal;
        }

        // Dispara o evento change para exibir o valor total inicialmente
        atualizarValorTotal();
    }
});



// Recupera os dados de clientes do localStorage
var dadosClientes = localStorage.getItem("DadosClientes");

// Verifica se existem dados de clientes
if (dadosClientes) {
    // Converte os dados para o formato JSON
    var clientes = JSON.parse(dadosClientes);

    // Seleciona o elemento select de clientes
    var selectCliente = document.getElementById("cliente");

    // Preenche o select com as opções de clientes
    clientes.forEach(function (cliente) {
        // Verifica se o objeto cliente possui a propriedade "nomeCliente"
        if (cliente.nomeCliente) {
            // Cria uma nova opção para o select
            var option = document.createElement("option");
            // Define o valor e o texto da opção como o nome do cliente
            option.value = cliente.nomeCliente;
            option.text = cliente.nomeCliente;
            // Adiciona a opção ao select
            selectCliente.appendChild(option);
        }
    });
}



document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o botão de cadastrar
    var btnCadastrar = document.getElementById("btnCadastrar");

    // Adiciona um evento de clique ao botão de cadastrar
    btnCadastrar.addEventListener("click", function () {
        // Captura os valores dos campos do formulário
        var carroSelecionado = document.getElementById("carro").value;
        var opcaoFinanciamento = document.getElementById("opcaoFinanciamento").value;

        // Captura os valores dos checkboxes de extras
        var extras = [];
        var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(function (checkbox) {
            extras.push({
                nome: checkbox.id,
                preco: parseFloat(checkbox.value)
            });
        });

        var clienteSelecionado = document.getElementById("cliente").value;

        // Calcula o valor total da venda
        var valorTotalText = document.getElementById("valorTotal").textContent.trim();
        var valorTotal = parseFloat(valorTotalText.replace(/[^\d.,-]/g, ''));

        // Limpa os campos do formulário
        document.getElementById("carro").value = "";
        document.getElementById("opcaoFinanciamento").value = "";
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
        document.getElementById("cliente").value = "";

        // Obtém a data atual
        var dataAtual = new Date();
        var dataFormatada = dataAtual.toLocaleDateString("pt-BR");

        // Cria um objeto com os dados do formulário
        var VendaCarro = {
            data: dataFormatada,
            carroSelecionado: carroSelecionado,
            opcaoFinanciamento: opcaoFinanciamento,
            extras: extras,
            clienteSelecionado: clienteSelecionado,
            valorTotal: valorTotal
        };

        // Recupera os dados já existentes no localStorage
        var vendasSalvas = localStorage.getItem("VendasCarros");
        var vendas = vendasSalvas ? JSON.parse(vendasSalvas) : [];

        // Adiciona os novos dados ao array existente
        vendas.push(VendaCarro);

        // Converte o objeto para uma string JSON e salva no localStorage
        localStorage.setItem("VendasCarros", JSON.stringify(vendas));

        // Exibe uma mensagem de sucesso (opcional)
        alert("Dados salvos com sucesso!");
    });
});
