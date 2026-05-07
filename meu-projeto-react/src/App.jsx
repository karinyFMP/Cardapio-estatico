import React from 'react';

function App() {
  const menuItems = [
    { id: 1, name: 'X-Giga Bacon', price: 34.90, description: 'Hambúrguer artesanal de 180g, muito bacon crocante, cheddar e molho secreto.' },
    { id: 2, name: 'Batata Suprema', price: 22.50, description: 'Fritas rústicas cobertas com creme de queijo, bacon em cubos e cebolinha.' },
    { id: 3, name: 'Hot Dog Especial', price: 19.90, description: 'Duas salsichas premium, purê temperado, milho e batata palha extra fina.' },
    { id: 4, name: 'Milkshake de Nutella', price: 18.00, description: 'O clássico irresistível com muita Nutella, chantilly e raspas de chocolate.' },
    { id: 5, name: 'Combo Kids', price: 25.00, description: 'Cheeseburger clássico, porção pequena de fritas e suco natural de laranja.' },
  ];

  return (
    <div className="app-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');

        :root {
          --accent: #ff9d00;
          --accent-dark: #ff6b00;
          --bg: #05070a;
          --card-bg: rgba(255, 255, 255, 0.03);
          --text: #ffffff;
          --text-dim: #94a3b8;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Outfit', sans-serif;
        }

        body {
          background-color: var(--bg);
          color: var(--text);
          overflow-x: hidden;
        }

        .app-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 1rem;
          background: radial-gradient(circle at 50% -20%, #1e293b, transparent);
        }

        .menu-card {
          width: 100%;
          max-width: 450px;
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.8);
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-section {
          height: 240px;
          position: relative;
          background-image: url('/snack_bar_hero_new_1778194664177.png');
          background-size: cover;
          background-position: center;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(5, 7, 10, 0.8), var(--bg));
        }

        .menu-header {
          padding: 0.5rem 1.5rem 1.5rem;
          text-align: center;
          position: relative;
        }

        .menu-header h1 {
          display: block;
          width: 100%;
          font-size: clamp(1.5rem, 6vw, 2.5rem); /* Reduzido levemente para evitar transbordo */
          font-weight: 800;
          letter-spacing: 0;
          background: linear-gradient(to right, var(--accent), #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          padding: 0.2rem 0;
          line-height: 1.2;
          white-space: nowrap;
          text-transform: uppercase;
          position: relative;
          z-index: 10;
        }

        .menu-header h1::after,
        .menu-header h1::before {
          content: none !important;
          display: none !important;
        }

        .menu-header p {
          color: var(--text-dim);
          font-weight: 400;
          font-size: 0.95rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .menu-items {
          padding: 0 1.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid transparent;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .item:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 157, 0, 0.3);
          transform: translateX(8px);
        }

        .item-content {
          flex: 1;
          padding-right: 1rem;
        }

        .item-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: #fff;
        }

        .item-description {
          font-size: 0.85rem;
          color: var(--text-dim);
          line-height: 1.4;
        }

        .item-price {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--accent);
          text-shadow: 0 0 20px rgba(255, 157, 0, 0.4);
        }

        .footer-action {
          padding: 0 1.5rem 2.5rem;
        }

        .order-btn {
          width: 100%;
          padding: 1.25rem;
          border-radius: 16px;
          border: none;
          background: linear-gradient(45deg, var(--accent), var(--accent-dark));
          color: #000;
          font-size: 1.1rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px -10px rgba(255, 157, 0, 0.5);
        }

        .order-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 15px 40px -10px rgba(255, 157, 0, 0.6);
          filter: brightness(1.1);
        }

        @media (max-width: 480px) {
          .app-container {
            padding: 0;
            align-items: flex-start;
          }
          .menu-card {
            max-width: none;
            border-radius: 0;
            border: none;
            min-height: 100vh;
          }
        }
      `}</style>

      <div className="menu-card">
        <div className="hero-section">
          <div className="hero-overlay"></div>
        </div>

        <div className="menu-header">
          <h1>ASTRO BURGER</h1>
          <p>Experiência Gastronômica Orbital</p>
        </div>

        <div className="menu-items">
          {menuItems.map((item) => (
            <div key={item.id} className="item">
              <div className="item-content">
                <h2 className="item-title">{item.name}</h2>
                <p className="item-description">{item.description}</p>
              </div>
              <div className="item-price">
                {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-action">
          <button className="order-btn">PEDIR AGORA</button>
        </div>
      </div>
    </div>
  );
}

export default App;
