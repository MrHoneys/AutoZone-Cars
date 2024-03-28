// Função para ler carros do Local Storage
function lerCarrosDoLocalStorage() {
    // Verifica se há algum item no Local Storage
    if (localStorage.length > 0) {
        // Loop por todos os itens no Local Storage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);

            // Verifica se o valor é uma lista de carros
            if (key === "carros") {
                // Converte o valor de string para um objeto JavaScript
                const carros = JSON.parse(value);

                // Loop pelos carros e exibe-os na tela
                carros.forEach(carro => {
                    displayCarro(carro);
                });
            }
        }
    } else {
        // Se o Local Storage estiver vazio ou não contiver dados de carros, exibe uma mensagem na tela
        displayEmptyMessage();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Chama a função para ler carros do Local Storage
    lerCarrosDoLocalStorage();
});

// Adiciona um evento de 'submit' para o formulário de pesquisa
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = document.querySelector('input[type="search"]').value.trim().toLowerCase();
    const carros = document.querySelectorAll('.card');

    // Percorre todos os carros para verificar se o título corresponde ao termo de pesquisa
    carros.forEach(function (carro) {
        const titulo = carro.querySelector('.card-title').textContent.trim().toLowerCase();
        const displayStyle = titulo.includes(searchTerm) ? 'block' : 'none';
        carro.style.display = displayStyle;
    });

    // Scroll para a div de carros
    const carrosDiv = document.querySelector('.container.mt-5');
    carrosDiv.scrollIntoView({ behavior: 'smooth' });
});

// Função para exibir os dados de um carro na tela
function displayCarro(carro) {
    // Cria uma nova coluna para o carro
    const coluna = document.createElement("div");
    coluna.classList.add("col-md-4");
    
    // Cria a estrutura do card do carro
    const card = document.createElement("div");
    card.classList.add("card");
    
    const img = document.createElement("img");
    img.src = carro.foto;
    img.classList.add("card-img-top");
    img.alt = carro.nome;
    
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = carro.nome;
    
    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = carro.caracteristicas;

    const marca = document.createElement("p"); // Adiciona um parágrafo para exibir a marca
    marca.textContent = `Marca: ${carro.marca}`; // Adiciona a marca do carro ao parágrafo
    marca.style.color = "#6c757d"; // Define a cor do texto como branco

    const preco = document.createElement("p"); // Adiciona um parágrafo para exibir o preço
    preco.textContent = carro.preco; // Adiciona o preço do carro ao parágrafo
    preco.style.color = "#6c757d"; // Define a cor do texto como branco
    
    const link = document.createElement("a");
    link.href = "#";
    link.classList.add("btn", "btn-primary");
    link.textContent = "Comprar";
    
    // Adiciona os elementos ao card
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(marca); // Adiciona o parágrafo com a marca do carro
    cardBody.appendChild(preco); // Adiciona o parágrafo com o preço do carro
    cardBody.appendChild(link);
    
    card.appendChild(img);
    card.appendChild(cardBody);
    
    coluna.appendChild(card);
    
    // Adiciona a coluna à linha de carros
    const carrosContainer = document.querySelector('.container .row'); // Seleciona a div com a classe "row" dentro da div com a classe "container"
    carrosContainer.appendChild(coluna);
}


// Função para exibir mensagem de Local Storage vazio ou sem dados de carros
function displayEmptyMessage() {
    const message = document.createElement("p");
    message.textContent = "O Local Storage está vazio ou não contém dados de carros.";
    
    // Encontra a seção de carros na página HTML e insere a mensagem
    const carrosContainer = document.querySelector('.container .row'); // Seleciona a div com a classe "row" dentro da div com a classe "container"
    carrosContainer.appendChild(message);
}
