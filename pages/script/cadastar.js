function enviar(event) {
    event.preventDefault(); // Para evitar o envio do formulário

    var nome = document.getElementById("nome").value;
    var marca = document.getElementById("marca").value;
    var loja = document.getElementById("loja").value;
    var preco = document.getElementById("preco").value;
    var descricao = document.getElementById("descricao").value;

    // Obtendo o arquivo de imagem selecionado
    var foto = document.getElementById("foto").files[0];

    if (foto) {
        var reader = new FileReader();

        reader.onload = function (event) {
            var fotoBase64 = event.target.result;

            var carro = {
                nome: nome,
                marca: marca,
                loja: loja,
                preco: preco,
                foto: fotoBase64, // Salvando a imagem como base64
                descricao: descricao
            };

            // Obtendo os carros existentes ou inicializando uma lista vazia
            var carros = JSON.parse(localStorage.getItem('carros')) || [];
            // Adicionando o novo carro à lista
            carros.push(carro);
            // Salvando a lista de carros no localStorage
            localStorage.setItem('carros', JSON.stringify(carros));

            // Limpa os campos do formulário
            document.getElementById("nome").value = "";
            document.getElementById("marca").value = "";
            document.getElementById("loja").value = "";
            document.getElementById("preco").value = "";
            document.getElementById("foto").value = "";
            document.getElementById("descricao").value = "";

            // Exibe mensagem de sucesso
            var mensagemDiv = document.createElement("div");
            mensagemDiv.classList.add("alert", "alert-success", "d-flex", "align-items-center");
            mensagemDiv.setAttribute("role", "alert");
            mensagemDiv.innerHTML = `
                <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                    Carro adicionado com sucesso!
                </div>
            `;
            document.getElementById("mensagem").appendChild(mensagemDiv);

            // Rola para a div de mensagem
            document.getElementById("mensagem").scrollIntoView({ behavior: 'smooth' });
        };

        reader.readAsDataURL(foto);
    }
}


    // Função para formatar o valor para o formato de moeda brasileira (R$)
    function formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    }

    // Função para remover os pontos e vírgulas e formatar a moeda quando o campo de preço ganhar foco
    document.getElementById('preco').addEventListener('focus', function() {
        this.value = this.value.replace(/\D/g, '');
        this.value = formatarMoeda(parseFloat(this.value) / 100);
    });

    // Função para remover os pontos e vírgulas e formatar a moeda quando o campo de preço perder o foco
    document.getElementById('preco').addEventListener('blur', function() {
        this.value = this.value.replace(/\D/g, '');
        this.value = formatarMoeda(parseFloat(this.value) / 100);
    });

    // Função para exibir as opções de lojas cadastradas
    function exibirLojas() {
        // Recuperar os dados do localStorage
        var dadosClientes = JSON.parse(localStorage.getItem('DadosClientes'));

        // Verificar se existem dados
        if (dadosClientes && dadosClientes.length > 0) {
            var selectLoja = document.getElementById('loja');

            // Limpar opções anteriores
            selectLoja.innerHTML = '<option value="">Selecione a loja</option>';

            // Iterar sobre os dados e adicionar opções ao select
            dadosClientes.forEach(function(cliente) {
                var option = document.createElement('option');
                option.value = cliente.nomeLoja;
                option.textContent = cliente.nomeLoja;
                selectLoja.appendChild(option);
            });
        } else {
            // Se não houver dados, exibir uma mensagem
            document.getElementById('loja').innerHTML = '<option value="">Nenhuma loja cadastrada</option>';
        }
    }

    // Chamada inicial para exibir as lojas
    exibirLojas();