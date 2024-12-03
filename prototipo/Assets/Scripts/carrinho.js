document.addEventListener('DOMContentLoaded', function () {
    const orderButton = document.querySelector('.order-button');
    const orderCount = document.getElementById('order-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Recupera o carrinho do LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Atualiza o botão "Ver Carrinho"
    function updateOrderButton() {
        if (orderButton && orderCount) {
            if (cart.length > 0) {
                orderCount.textContent = cart.length;
                orderButton.style.display = 'block';
            } else {
                orderCount.textContent = 0;
                orderButton.style.display = 'none';
            }
        }
    }

    // Adiciona um item ao carrinho
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productCard = button.closest('.product-card');
                const productName = productCard.querySelector('h5').textContent;
                const productDescription = productCard.querySelector('.product-description').textContent;
                const productPrice = parseFloat(
                    productCard.querySelector('.price').textContent.replace('R$', '').replace(',', '.')
                );
                const productImage = productCard.querySelector('img').src;

                const product = { name: productName, description: productDescription, price: productPrice, image: productImage };

                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart)); // Salva no LocalStorage
                updateOrderButton(); // Atualiza o botão
            });
        });
    }


    // Atualiza a interface do carrinho
    function displayCartItems() {
        if (!cartItemsContainer || !totalPriceElement || !checkoutBtn) return;

        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-white">Seu carrinho está vazio.</p>';
            checkoutBtn.style.display = 'none';
        } else {
            checkoutBtn.style.display = 'block';
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('card', 'mb-3');
                itemElement.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-2">
                            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
                        </div>
                        <div class="col-md-10">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">${item.description}</p>
                                <p class="card-text text-white">Preço: R$ ${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
                totalPrice += item.price;
            });
        }

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    // Finaliza o pedido
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            alert('Pedido finalizado com sucesso!');
            localStorage.removeItem('cart');
            cart = [];
            displayCartItems();
        });
    }


    // Atualiza os elementos ao carregar a página
    updateOrderButton();
    displayCartItems();

    // Navegação para o carrinho
    window.cart = function () {
        window.location.href = 'prototipo/sis/carrinho.html';
    };

});