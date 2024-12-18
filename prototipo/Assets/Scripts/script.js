document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector('.close-button');
    const menuContainer = document.querySelector('.menu-container');
    const navbarToggler = document.getElementById('navbar-toggler');

    if (closeButton) {
        closeButton.addEventListener('click', function () {
            menuContainer.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                menuContainer.classList.remove('active');
            }, 300);
        });
    }

    if (navbarToggler) {
        navbarToggler.addEventListener('click', function () {
            menuContainer.classList.toggle('active');
        });
    }

});