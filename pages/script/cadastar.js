function enviar(event) {
    event.preventDefault(); // Para evitar o envio do formulário

    var nome = document.getElementById("nome").value;
    var marca = document.getElementById("marca").value;
    var ano = document.getElementById("ano").value;
    var tipo = document.getElementById("tipo").value;
    var preco = document.getElementById("preco").value;
    var caracteristicas = document.getElementById("caracteristicas").value;

    // Obtendo o arquivo de imagem selecionado
    var foto = document.getElementById("foto").files[0];

    if (foto) {
        var reader = new FileReader();

        reader.onload = function (event) {
            var fotoBase64 = event.target.result;

            var carro = {
                nome: nome,
                marca: marca,
                ano: ano,
                tipo: tipo,
                preco: preco,
                caracteristicas: caracteristicas,
                foto: fotoBase64, // Salvando a imagem como base64
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
            document.getElementById("ano").value = "";
            document.getElementById("tipo").value = "";
            document.getElementById("preco").value = "";
            document.getElementById("caracteristicas").value = "";
            document.getElementById("foto").value = "";

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
    this.value = this.value ?  formatarMoeda(parseFloat(this.value) / 100): '';
});

// Função para remover os pontos e vírgulas e formatar a moeda quando o campo de preço perder o foco
document.getElementById('preco').addEventListener('blur', function() {
    this.value = this.value.replace(/\D/g, '');
    this.value = this.value ?  formatarMoeda(parseFloat(this.value) / 100): '';
});
