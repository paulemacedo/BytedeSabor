document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.close-button');
    const menuContainer = document.querySelector('.menu-container');
    const navbarToggler = document.getElementById('navbar-toggler');
    const orderButton = document.querySelector('.order-button');
    const orderCount = document.getElementById('order-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const ordersContainer = document.getElementById("orders-container");

    let orderCountValue = 0;
    let cart = [];

    // Verifica se estamos na página index.html
    if (window.location.pathname.endsWith('index.html')) {
        if (orderButton) {
            orderButton.style.display = 'none';
        }
    }

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            menuContainer.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                menuContainer.classList.remove('active');
            }, 300);
        });
    }

    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            menuContainer.classList.toggle('active');
        });
    }

    // Função para adicionar produto ao carrinho
    function addToCart(product) {
        cart.push(product);
        orderCountValue++;
        updateOrderCount();
        if (orderButton.style.display === 'none') {
            orderButton.style.display = 'block';
        }
        displayOrders();
    }

    // Atualiza o contador de itens no carrinho
    function updateOrderCount() {
        orderCount.textContent = orderCountValue;
    }

    // Exibe os pedidos na página de "Meus Pedidos"
    function displayOrders() {
        if (cart.length === 0) {
            ordersContainer.innerHTML = "<p class='text-white'>Você ainda não realizou nenhum pedido.</p>";
        } else {
            ordersContainer.innerHTML = "";
            cart.forEach(product => {
                const orderItem = document.createElement("div");
                orderItem.classList.add("order-item");
                orderItem.innerHTML = `
                    <div class="order-item-content">
                        <img src="${product.image}" alt="${product.name}" class="order-item-image">
                        <div class="order-item-info">
                            <h5>${product.name}</h5>
                            <p>${product.description}</p>
                            <span class="price">R$ ${product.price}</span>
                        </div>
                    </div>
                `;
                ordersContainer.appendChild(orderItem);
            });
        }
    }

    // Adiciona o evento de click para cada botão "Adicionar ao Carrinho"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productCard = event.target.closest(".product-card");
            const productName = productCard.querySelector("h5").textContent;
            const productDescription = productCard.querySelector(".product-description").textContent;
            const productPrice = productCard.querySelector(".price").textContent.replace("R$", "").trim();
            const productImage = productCard.querySelector(".product-image").src;

            const product = {
                name: productName,
                description: productDescription,
                price: parseFloat(productPrice),
                image: productImage
            };

            addToCart(product);
        });
    });

    // Finaliza o pedido
    if (orderButton) {
        orderButton.addEventListener("click", () => {
            alert("Pedido finalizado com sucesso!");
            cart = []; // Limpar o carrinho após finalizar
            orderCountValue = 0;
            updateOrderCount();
            displayOrders();
        });
    }

    // Exibir os pedidos ao carregar a página de pedidos
    if (window.location.pathname.includes("pedidos.html")) {
        displayOrders();
    }
});
