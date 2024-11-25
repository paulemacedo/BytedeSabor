document.addEventListener('DOMContentLoaded', function () {
    const ordersContainer = document.getElementById('orders-container');
    let orders = JSON.parse(localStorage.getItem('orders')) || [];


    // Exibe os pedidos na página de "Meus Pedidos"
    function displayOrders() {
        ordersContainer.innerHTML = '';

        if (orders.length === 0) {
            ordersContainer.innerHTML = "<p class='text-white'>Você ainda não realizou nenhum pedido.</p>";
        } else {
            orders.forEach(order => {
                const orderElement = document.createElement("div");
                orderElement.classList.add('card', 'mb-4');
                orderElement.innerHTML = `
                <div class="card-header">
                    <h5 class="text-white">Pedido #${order.id}</h5>
                    <small class="text-white">Realizado em: ${order.date}</small>
                </div>
                <div class="card-body">
                    ${order.items.map(item => `
                        <div class="row mb-3">
                            <div class="col-md-2">
                                <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
                            </div>
                            <div class="col-md-10">
                                <h6>${item.name}</h6>
                                <p>${item.description}</p>
                                <p class="text-white">Preço: R$ ${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    `).join('')}
                    <hr>
                    <h5>Total: R$ ${order.total}</h5>
                </div>
            `;
                ordersContainer.appendChild(orderElement);// Adiciona o pedido à página
            });
        }
    }

    // Chama a função para exibir os pedidos
    displayOrders();

    // Exibir os pedidos ao carregar a página de pedidos
    if (window.location.pathname.includes("pedidos.html")) {
        displayOrders();
    }

});
