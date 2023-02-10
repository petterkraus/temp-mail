# Temp Mail

## Descrição
- A API  https://dropmail.me/api possibilita e-mails temporários, esse projeto faz a comunicação com essa API.

## Instruções

1.  Clone o repositório:
````bash
git clone https://github.com/petterkraus/temp-mail.git
````

2. Instale as dependências do projeto:
````bash
npm i
````

3. Inicie a aplicação em modo de desenvolvimento:
````bash
npm run dev
````

4. Acesse a aplicação:
Uma vez que a aplicação iniciou, um link será exibido no terminal. Copie e cole-o em seu navegador de web para acessar a aplicação.

>Observe que é importante garantir que você tenha o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) instalados em sua máquina antes de seguir as etapas acima.

## Tecnologias Aplicadas
- [Vite](https://github.com/vitejs/vite)
- [React](https://reactjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Axios](https://github.com/axios/axios)
- [NanoID](https://github.com/ai/nanoid)


## Histórico de desenvolvimento
### Fase 1 - Explorando a API com axios

Pra acessar com o axios, foi necessário fazer um post e enviar uma query para o GraphQL. Contudo, a API não possui CORs. Após alguns testes, consegui fazer uso do http://cors-anywhere.herokuapp.com/ para passar pela restrição.

### Fase 2 - Consumindo a API e montando o layout

Fazendo uso do retorno da API, comecei a montar o layout para colocar a aplicação funcional na tela.
Fiz a publicação no endereço: https://temp-mail-petter.netlify.app/

### Fase 3 - O serviço cors-anywhere

Testando o serviço cors-anywhere, encontrei a limitação de precisar acessar e pedir uma autorização para poder usar o mesmo. Com isso, levantei uma API (com o conceito de BFF) para fazer um proxy e me entregar a resposta da API. Testei localmente com sucesso. Fiz deploy da mesma online.

Repositório: https://github.com/petterkraus/dropmail-proxy
Endereço da API: https://dropmailproxy.onrender.com


### Fase 4 - Inbox

Compreendendo a API, fui capaz de montar a query e enviar o ID para fazer a sessão do e-mail, com isso foi possível começar a montar a Inbox.

### Fase 5 - Persistência do e-mail

Nessa fase eu comecei a desenvolver a função de persistência, ainda sem validação para caso o e-mail tenha expirado.

### Fase 6 - Refatoração 

Refiz o código, depurando as principais funções, dividi responsabilidades das funções, separei em componentes as duas telas do software, resolvi bugs relacionados ao setInterval e comecei a trabalhar no layout agora que a funcionalidade está 100%.

### Fase 7 - Layout e algumas funcionalidades

Agora que o aplicativo já recebe com estabilidade os emails, passei a fazer a caixa de entrada com estilização para a mesma ficar legível. Coloquei informações úteis enviadas da API, sanitizei o html do corpo do email para poder apresentar com segurança, formatei a data para um layout amigável além de ajustar pequenos detalhes.

### Fase 8  - Notificações

As notificações já estão implementadas através da função nativa dos navegadores que dispoem da tal.