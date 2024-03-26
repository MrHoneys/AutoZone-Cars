document.addEventListener("DOMContentLoaded", function() {
    // Verifica se há algum item no Local Storage
    if(localStorage.length > 0) {
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
});

// Adiciona um evento de 'submit' para o formulário de pesquisa
// Adiciona um evento de 'submit' para o formulário de pesquisa
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.querySelector('input[type="search"]').value.trim().toLowerCase();
    const carros = document.querySelectorAll('.card');

    // Percorre todos os carros para verificar se o título corresponde ao termo de pesquisa
    carros.forEach(function(carro) {
        const titulo = carro.querySelector('.card-title').textContent.trim().toLowerCase();
        const displayStyle = titulo.includes(searchTerm) ? 'block' : 'none';
        carro.style.display = displayStyle;
    });

    // Ordena os carros para mostrar primeiro os que correspondem ao termo de pesquisa
    const carrosContainer = document.querySelector('#carros');
    const carrosArray = Array.from(carrosContainer.children);
    carrosArray.sort((a, b) => {
        const titleA = a.querySelector('.card-title').textContent.trim().toLowerCase();
        const titleB = b.querySelector('.card-title').textContent.trim().toLowerCase();
        const containsTermA = titleA.includes(searchTerm);
        const containsTermB = titleB.includes(searchTerm);
        if (containsTermA && !containsTermB) return -1;
        if (!containsTermA && containsTermB) return 1;
        return 0;
    });
    // Limpa os carros do container
    carrosContainer.innerHTML = '';
    // Adiciona os carros ordenados de volta ao container
    carrosArray.forEach(carro => {
        carrosContainer.appendChild(carro);
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
    description.textContent = carro.descricao;
    
    const link = document.createElement("a");
    link.href = "#";
    link.classList.add("btn", "btn-primary");
    link.textContent = "Ver Detalhes";
    
    // Adiciona os elementos ao card
    cardBody.appendChild(title);
    cardBody.appendChild(description);
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
