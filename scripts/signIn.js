
document.getElementById('botaoEntrarLogin').addEventListener('click', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        });
        const result = await response.json();
        console.log()

        if (result.success) {
            sessionStorage.setItem('email', result.email);


            window.location.href = './assets/telas/search.html';
        }
    } catch (error) {
        console.error(error);
    }
});

document.getElementById('botaoCadastrarRegister').addEventListener('click', async function (event) {
    event.preventDefault();
    const password = document.getElementById('passwordCadastro').value;
    const email = document.getElementById('inputemailCadastro').value;
    const username = document.getElementById('nomeCadastro').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, email: email, password: password })
        });

        const data = await response.json();

        // Atualiza o conteúdo da página com a mensagem da resposta
        document.getElementById('registerResponse').innerHTML = data.message;

        // Verifica se o cadastro foi bem-sucedido
        if (data.success) {
            window.location.href = './assets/telas/search.html';
        }
    } catch (err) {
        console.error(err);
    }
});