# Reflexão: Estrutura do Cardápio em React

Ao analisar o código do arquivo `App.jsx`, podemos extrair algumas conclusões importantes sobre a arquitetura atual, o que está repetitivo e os impactos de escalar essa aplicação.

## 1. O que ficou "repetitivo" ou misturado no código atual?

Embora o uso do `.map()` tenha sido uma excelente escolha para evitar a repetição manual de tags HTML (como escrever as `<div>` de cada item várias vezes), o código possui problemas de **mistura de responsabilidades**:

* **CSS no meio do JavaScript:** Quase 70% do arquivo é ocupado por uma tag `<style>`. Isso torna o arquivo muito longo e difícil de ler. Se precisarmos mudar a lógica do componente, temos que rolar por dezenas de linhas de estilos.
* **Dados "Chumbados" (Hardcoded):** A lista `menuItems` está escrita diretamente dentro do componente `App`. Em uma aplicação real, esses dados deveriam vir de um banco de dados ou de um arquivo de configuração separado.

## 2. E se a lanchonete tivesse 30 itens? O que aconteceria?

Se aumentássemos o array `menuItems` de 5 para 30 itens, enfrentaríamos dois problemas principais: um de **código** e um de **interface (UI/UX)**.

### Impacto no Código (Manutenibilidade)
* **Arquivo Gigante:** O array de objetos ficaria imenso. O arquivo `App.jsx` passaria a ter centenas de linhas apenas com os dados dos lanches, tornando a manutenção e a busca por erros um pesadelo.
* **Falta de Componentização:** O ideal seria que cada item da lista fosse um componente separado (ex: `<MenuItem />`), deixando o `App.jsx` apenas responsável por renderizar a lista geral.

### Impacto na Interface Visual (UI/UX)
* **Card Infinito:** Como o design atual usa um `.menu-card` centralizado com `min-height: 100vh` e alinhamento ao centro, adicionar 30 itens faria o cartão crescer infinitamente para baixo.
* **Quebra de Layout:** Na versão desktop, o topo e o rodapé do cartão provavelmente sumiriam da tela, obrigando o usuário a rolar a página inteira de uma forma desconfortável. 
* **A Solução Visual:** Para suportar 30 itens, precisaríamos modificar o CSS do `.menu-items` para ter uma altura máxima (`max-height`) e adicionar uma rolagem interna (`overflow-y: auto`). Assim, o design do cartão ficaria intacto e apenas a lista rolaria por dentro dele.

## Conclusão e Próximos Passos
Para evoluir este código para um padrão profissional, as próximas etapas seriam:
1. Mover todo o CSS para um arquivo `App.css`.
2. Mover a constante `menuItems` para um arquivo externo de dados (ex: `data.js`) ou simular o consumo de uma API.
3. Extrair a renderização do lanche para um componente isolado (`<CartaoLanche />`).
4. Adicionar barra de rolagem interna (`overflow`) na lista de lanches para acomodar cardápios maiores sem quebrar o layout.

# Reflexão: Estrutura do Cardápio em React (Atualizado)

Após refatorar o projeto separando o CSS e criando o componente `<ItemCardapio />`, podemos analisar os impactos dessa nova arquitetura.

## 1. O código ficou maior ou menor?

Em termos de **quantidade total de linhas e arquivos no projeto**, o código ficou um pouco maior, pois agora temos três arquivos (`App.jsx`, `ItemCardapio.jsx` e `App.css`) em vez de apenas um.

No entanto, o arquivo principal **`App.jsx` ficou drasticamente menor e mais limpo**. 
* Antes, ele tinha mais de 160 linhas misturando lógica, dados, marcação (HTML/JSX) e estilização (CSS). 
* Agora, ele possui cerca de 40 linhas e foca apenas em estruturar a página e passar os dados adiante. Isso é o que chamamos de **Separação de Responsabilidades (Separation of Concerns)**, tornando o projeto muito mais fácil de ler e dar manutenção.

## 2. Mudança de cor no `<ItemCardapio />`: Em quantos lugares preciso alterar?

Se precisarmos mudar a cor de fundo de todos os lanches, precisaremos alterar em **apenas 1 lugar**. 

Como extraímos o CSS para o arquivo `App.css`, basta ir até a classe `.item` (que estiliza o componente) e alterar a regra `background`. 

Como o React reutiliza o mesmo componente `<ItemCardapio />` para renderizar todos os lanches da lista (sejam 5 ou 30), essa única alteração no CSS será refletida instantaneamente em todos os itens da tela. Isso demonstra o grande poder da componentização e do CSS global/modularizado.

## 3. Como os dados (nome e preço) chegaram dentro do componente?

Os dados viajaram do componente "Pai" (`App.jsx`) para o componente "Filho" (`ItemCardapio.jsx`) através de um conceito fundamental do React chamado **Props** (propriedades).

O fluxo aconteceu em duas etapas:
1. **No arquivo `App.jsx` (Pai):** Durante o `.map()`, nós "injetamos" os dados do array no componente como se fossem atributos HTML:
   `<ItemCardapio nome={item.name} preco={item.price} descricao={item.description} />`
2. **No arquivo `ItemCardapio.jsx` (Filho):** A função que cria o componente recebe um objeto contendo essas propriedades nos seus parênteses, usando a desestruturação do JavaScript: 
   `function ItemCardapio({ nome, descricao, preco }) { ... }`

Dessa forma, o componente `<ItemCardapio />` não sabe de onde os dados vêm nem quantos itens existem; a sua única função é receber esses valores de fora e exibi-los na tela da forma correta.

# Reflexão: Estado e Comunicação entre Componentes

Nesta etapa, adicionamos interatividade ao cardápio. Agora, o sistema "reage" às ações do usuário, o que nos permite explorar como o React gerencia os dados e a interface.

## 1. Por que uma variável comum (let total = 0) não atualiza a tela?

No JavaScript tradicional, mudar o valor de uma variável `let` altera apenas o dado na memória do computador. O React, no entanto, não fica "vigiando" variáveis comuns para saber quando redesenhar a tela.

Para que a interface mude, precisamos usar o **Estado (State)** através do hook `useState`. 
* Quando usamos o `setTotalItens`, o React é avisado de que o dado mudou.
* Como resposta, ele executa um **Re-render** (re-renderização), que é o processo de ler o código novamente e atualizar apenas a parte do HTML que precisa mostrar o novo valor. Sem o `useState`, o valor até mudaria internamente, mas o usuário continuaria vendo o número antigo na tela.

## 2. Onde foi necessário guardar o número total e por quê?

O número total foi guardado no **`App.jsx`**.

Isso foi necessário por causa de um conceito chamado **Elevação de Estado (State Lifting)**. No nosso layout:
1. O texto que exibe o total está no topo da página (dentro do `App.jsx`).
2. Os botões que aumentam o valor estão dentro de cada lanche (dentro do `ItemCardapio.jsx`).

Se guardássemos o estado dentro do `ItemCardapio`, cada lanche teria seu próprio contador individual, e o `App.jsx` não teria acesso a esses números para somá-los no topo. Guardando no "Pai" (`App`), conseguimos centralizar a informação que é importante para toda a aplicação.



## 3. Como o botão (filho) consegue avisar o App (pai) que houve um clique?

Componentes filhos não podem alterar diretamente o estado de um componente pai. Para resolver isso, usamos **Funções de Callback** passadas via **Props**.

O caminho da comunicação foi:
1. **O Pai (`App.jsx`)** criou a função `adicionarAoTotal`.
2. **O Pai** passou essa função para o filho como se fosse uma "encomenda" através da prop `onAdicionar`.
3. **O Filho (`ItemCardapio.jsx`)** recebeu essa função e a instalou no evento `onClick` do seu botão.
4. Quando o usuário clica no botão, o Filho "dispara" a função que pertence