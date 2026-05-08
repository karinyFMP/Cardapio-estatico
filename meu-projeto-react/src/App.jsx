import React, { useState } from 'react';
import ItemCardapio from './ItemCardapio';
import './App.css'; // Importação do ficheiro CSS externo

function App() {
  const [totalItens, setTotalItens] = useState(0);

  const menuItems = [
    { id: 1, name: 'X-Giga Bacon', price: 34.90, description: 'Hambúrguer artesanal de 180g, muito bacon crocante, cheddar e molho secreto.' },
    { id: 2, name: 'Batata Suprema', price: 22.50, description: 'Fritas rústicas cobertas com creme de queijo, bacon em cubos e cebolinha.' },
    { id: 3, name: 'Hot Dog Especial', price: 19.90, description: 'Duas salsichas premium, purê temperado, milho e batata palha extra fina.' },
    { id: 4, name: 'Milkshake de Nutella', price: 18.00, description: 'O clássico irresistível com muita Nutella, chantilly e raspas de chocolate.' },
    { id: 5, name: 'Combo Kids', price: 25.00, description: 'Cheeseburger clássico, porção pequena de fritas e suco natural de laranja.' },
  ];

  const adicionarItem = () => {
    setTotalItens(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <div className="menu-card">
        <div className="hero-section">
          <div className="hero-overlay"></div>
        </div>

        <div className="menu-header">
          <p key={totalItens} className="total-count">Total de itens no pedido: {totalItens}</p>
          <h1>ASTRO BURGER</h1>
          <p>Experiência Gastronômica Orbital</p>
        </div>

        <div className="menu-items">
          {menuItems.map((item) => (
            <ItemCardapio 
              key={item.id} 
              nome={item.name} 
              descricao={item.description} 
              preco={item.price} 
              adicionarPedido={adicionarItem}
            />
          ))}
        </div>


      </div>
    </div>
  );
}

export default App;