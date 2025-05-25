function toggleSection(sectionId) {
    
    const section = document.getElementById(sectionId);
    
   
    const botao = document.querySelector(`button[onclick="toggleSection('${sectionId}')"`);
    
    
    section.classList.toggle('oculta');
    

    const nomes = {
        'sobreMim': 'Sobre Mim',
        'carreira': 'Carreira',
        'metas': 'Metas'
    };
    
    if(section.classList.contains('oculta')) {
        botao.textContent = `Mostrar ${nomes[sectionId]}`;
    } else {
        botao.textContent = `Ocultar ${nomes[sectionId]}`;
    }
}

document.getElementById('formContato').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const campos = {
        nome: this.querySelector('input[type="text"]').value.trim(),
        email: this.querySelector('input[type="email"]').value.trim(),
        descricao: this.querySelector('textarea:first-of-type').value.trim(),
        proposta: this.querySelector('textarea:last-of-type').value.trim()
    };

    if (!campos.nome) {
        alert('preencha seu nome!');
        return;
    }

    if (!campos.email || !campos.email.includes('@')) {
        alert('insira um e-mail válido!');
        return;
    }

    if (campos.descricao.length < 10) {
        alert('A descrição precisa ter pelo menos 20 caracteres');
        return;
    }


    alert('Proposta enviada com sucesso! Entrarei em contato em breve.');
    this.reset();
});


function atualizarContagem() {
    const dataAlvo = new Date('2025-06-24T00:00:00');
    const agora = new Date();
    const diferenca = dataAlvo - agora;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

   
    document.getElementById('dias').textContent = String(dias).padStart(2, '0');
    document.getElementById('horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
    document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
}


setInterval(atualizarContagem, 1000);
atualizarContagem(); 

function atualizarDataHora() {
    const data = new Date();
    const opcoesData = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };
    
    const opcoesHora = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    document.getElementById('dataAtual').textContent = 
        data.toLocaleDateString('pt-BR', opcoesData);
    
    document.getElementById('horaAtual').textContent = 
        data.toLocaleTimeString('pt-BR', opcoesHora);
}
setInterval(atualizarDataHora, 1000);
atualizarDataHora(); 