import React from 'react';

function ItemCardapio({ nome, descricao, preco, adicionarPedido }) {
  return (
    <div className="item">
      <div className="item-content">
        <h2 className="item-title">{nome}</h2>
        <p className="item-description">{descricao}</p>
        <button className="add-btn" onClick={adicionarPedido}>Adicionar pedido</button>
      </div>
      <div className="item-price">
        {preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </div>
    </div>
  );
}

export default ItemCardapio;