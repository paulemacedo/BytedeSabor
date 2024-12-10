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

const Login = () => {
    return (
        <>
        <form id="login-form">
            <div class="mb-3">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="email" placeholder="Digite seu e-mail"
                    required/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Senha</label>
                <input type="password" class="form-control" id="password" placeholder="Digite sua senha"
                    required/>
            </div>

            <div class="mb-3 text-center">
                <span id="toggle-link-pass"><a onclick="togglePassword()">Esqueci minha senha</a></span>
            </div>

            <div class="d-grid">
                <button type="submit" class="btn btn-dark">Entrar</button>
            </div>
        </form>

        <form id="register-form" class="d-none">
            <div class="mb-3">
                <label for="register-name" class="form-label">Nome</label>
                <input type="text" class="form-control" id="register-name" placeholder="Digite seu nome"
                    required/>
            </div>
            <div class="mb-3">
                <label for="register-email" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="register-email"
                    placeholder="Digite seu e-mail" required/>
            </div>
            <div class="mb-3">
                <label for="register-password" class="form-label">Senha</label>
                <input type="password" class="form-control" id="register-password"
                    placeholder="Digite sua senha" required/>
            </div>
            <div class="mb-3">
                <label for="confirm-password" class="form-label">Confirmar Senha</label>
                <input type="password" class="form-control" id="confirm-password"
                    placeholder="Confirme sua senha" required/>
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-dark">Cadastrar</button>
            </div>
        </form>


        <form id="forgot-password-form" class="d-none">
            <div class="mb-3">
                <label for="forgot-email" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="forgot-email"
                    placeholder="Digite seu e-mail registrado" required/>
            </div>
            <div class="mb-3">
                <label for="verification-code" class="form-label">Código de Verificação</label>
                <input type="text" class="form-control" id="verification-code"
                    placeholder="Digite o código enviado" required/>
            </div>
            <div class="mb-3">
                <label for="new-password" class="form-label">Nova Senha</label>
                <input type="password" class="form-control" id="new-password"
                    placeholder="Digite sua nova senha" required/>
            </div>
            <div class="mb-3">
                <label for="confirm-new-password" class="form-label">Confirmar Nova Senha</label>
                <input type="password" class="form-control" id="confirm-new-password"
                    placeholder="Confirme sua nova senha" required/>
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-dark">Redefinir Senha</button>
            </div>
        </form>



        <div class="mt-3 text-center">
            <span id="toggle-link">Não tem uma conta? <a onclick="toggleForms()">Cadastre-se</a></span>
        </div>
    </>
    )
};

export default Login;