document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.close-button');
    const menuContainer = document.querySelector('.menu-container');
    const navbarToggler = document.getElementById('navbar-toggler');
    const orderButton = document.querySelector('.order-button');
    const orderCount = document.getElementById('order-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    let orderCountValue = 0;

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

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            orderCountValue++;
            orderCount.textContent = orderCountValue;
            if (orderButton.style.display === 'none') {
                orderButton.style.display = 'block';
            }
        });
    });
});