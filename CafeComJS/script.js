let carrinho = [];
let descontoAplicado = false;

function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    
    if(itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    
    atualizarCarrinho();
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function aplicarCupom() {
    const cupomInput = document.getElementById('cupom');
    if(cupomInput.value === 'CAFEDESCONTO' && !descontoAplicado) {
        descontoAplicado = true;
        cupomInput.classList.add('cupom-valido');
        cupomInput.disabled = true;
        atualizarCarrinho();
        alert('Cupom aplicado com sucesso!');
    } else {
        alert('Cupom inválido ou já utilizado');
    }
}

function calcularTotal() {
    let subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    let desconto = descontoAplicado ? subtotal * 0.5 : 0;
    return { subtotal, desconto, total: subtotal - desconto };
}

function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById('itens-carrinho');
    const { subtotal, desconto, total } = calcularTotal();
    
    carrinhoDiv.innerHTML = carrinho.map((item, index) => `
        <div>
            ${item.nome} - R$${item.preco} x ${item.quantidade}
            <button onclick="removerItem(${index})">Remover</button>
        </div>
    `).join('');
    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('desconto').textContent = desconto.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function finalizarPedido() {
    if(carrinho.length === 0) {
        alert('Carrinho vazio! Adicione itens primeiro.');
        return;
    }
    alert('Pedido finalizado! Obrigado pela compra!');
    carrinho = [];
    descontoAplicado = false;
    const cupomInput = document.getElementById('cupom');
    cupomInput.value = '';
    cupomInput.disabled = false;
    cupomInput.classList.remove('cupom-valido');
    atualizarCarrinho();
}