document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleLink = document.getElementById('toggle-link');
    const formTitle = document.getElementById('form-title');
    const forgotForm = document.getElementById('forgot-password-form');
    const toggleLinkPass = document.getElementById('toggle-link-pass');


    //função alterna entre login e cadastro na pagina login.html
    toggleLink.addEventListener('click', function toggleForms() {
        if (loginForm.classList.contains('d-none')) {
            loginForm.classList.remove('d-none');
            registerForm.classList.add('d-none'); /*ativa login*/
            formTitle.textContent = 'Login';
            toggleLink.innerHTML = 'Não tem uma conta? <a href="sis/login.html" onclick="toggleForms()">Cadastre-se</a>';
        } else {
            loginForm.classList.add('d-none');
            registerForm.classList.remove('d-none'); /*ativa cadastro*/
            formTitle.textContent = 'Cadastro';
            toggleLink.innerHTML = 'Já tem uma conta? <a href="sis/login.html" onclick="toggleForms()">Faça login</a>';
        }
    })

    //função alterna login para esqueci senha
    toggleLinkPass.addEventListener('click', function togglePassword() {
        if (forgotForm.classList.contains('d-none')) {
            forgotForm.classList.remove('d-none');
            loginForm.classList.add('d-none'); /*ativa form red senha*/
            formTitle.textContent = 'Redefinir Senha';
            toggleLink.innerHTML = '<a href="sis/login.html" onclick="toggleForms()">Voltar ao Login</a>';
        }
    })


});