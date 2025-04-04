document.addEventListener('DOMContentLoaded', function() {
    // criamos lugares de armazenamentos de valores basedo nos id declarados no HTML
    const form = document.getElementById('cadastroForm');
    const cpfInput = document.getElementById('cpf');
    const creciInput = document.getElementById('creci');
    const nomeInput = document.getElementById('nome');

    // Adicionamos uma função para monitorar oq esta sendo declarado dentro do input
    cpfInput.addEventListener('input', function(event) {
        
        // removemos qualquer tipo de valor que não seja um numero 
        let cpf = cpfInput.value.replace(/\D/g, '');
        
        // caso cpf tenha mais que 11 caracteres removemos e deixamos apenas os 11 primeiros 
        if (cpf.length > 11) {
            cpf = cpf.substring(0, 11); 
        }

        // adicionamos o valor de cpf na const
        cpfInput.value = cpf;
    });
    
    // Removemos todos o caracteres do Creci para que seja aceito apenas numeros 
    creciInput.addEventListener('input', function(event) {
        let creci = creciInput.value.replace(/\D/g, ''); // Remove tudo o que não for número
        creciInput.value = creci; // Atualiza o campo com o valor numérico
    });

    // fazemos a verificação do formulario antes que seja salvo
    form.addEventListener('submit', function(event) {

        // iniaciamos um controle para ver se o formulario é verdadeiro ou não
        let isValid = true;

        // removemos todas as mensagens de erro
        clearErrorMessages();

        // removemos outros caracteres do cpf novamente 
        const cpf = cpfInput.value.replace(/\D/g, ''); 
        // verificamos se cpf tem apenas 11 caracteres se não exibe uma mensagem de erro 
        if (cpf.length !== 11) {
            // chamamos uma mensagem de erro ao lado do campo input 
            showError(cpfInput, 'O CPF deve ter 11 números.');
            isValid = false;
        }

        // pegamos o valor de creci
        const creci = creciInput.value;
        // caso tenha menos que 2 numeros exibe uma mensagem de erro 
        if (creci.length < 2) {
            showError(creciInput, 'O Creci deve ter pelo menos 2 números.');
            isValid = false;
        }

        // caso alguem campo seja invalido bloqueamos o envio do formulario
        if (!isValid) {
            event.preventDefault();
        }
    });

     // criamos um função de erro com o para de input e a mensagem que será exibida 
    function showError(input, message) {
        // criamos um elemento span no nosso HTML
        const errorMessage = document.createElement('span');
        // adicionamos o elemento error do css nas mensagens de erro
        errorMessage.classList.add('error');
        
        // obtemos e adicionamos a mesagem de erro no nosso span
        errorMessage.textContent = message;

        // inserimos a mensagem de erro no nosso input
        input.insertAdjacentElement('afterend', errorMessage);
    }

    // removemos todas as mensagens de erro 
    function clearErrorMessages() {
        // removemos todos elementos com a classe erro 
        const errorMessages = document.querySelectorAll('.error');
        errorMessages.forEach(message => message.remove());
    }
});