# Temp Mail

## Descrição
 Este projeto permite a geração de endereços de e-mail temporários, tornando mais fácil para você se inscrever em serviços online sem se preocupar com spam ou comunicações indesejadas no futuro.

## Licença
Este projeto está licenciado sob a licença MIT.

# Recursos:

- Gerar endereço de e-mail temporário
- Receber e-mails de serviços online
- Notificações de e-mail
## Como usar

1. Acesse a aplicação através do link: [TempMail](https://temp-mail-petter.netlify.app/).

2. Na tela principal, clique no botão "Gerar" para gerar um endereço de e-mail temporário.

3. Aguarde o endereço de e-mail ser gerado.

4. Utilize esse endereço de e-mail temporário para receber e-mails de serviços online. O endereço será destruído automaticamente após 10 minutos após fechar a janela.

Com esse endereço de e-mail temporário, você pode se inscrever em serviços online sem se preocupar com spam ou comunicações indesejadas no futuro. Além disso, como o endereço de e-mail é gerado automaticamente, você não precisa se preocupar em lembrá-lo ou armazená-lo em lugar seguro.

## Instruções

1.  Clone o repositório:
````shell
git clone https://github.com/petterkraus/temp-mail.git
````

2. Instale as dependências do projeto:
````shell
npm i
````

3. Inicie a aplicação em modo de desenvolvimento:
````shell
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


## Como contribuir
Aprecio muito qualquer contribuição para este projeto! Se você gostaria de contribuir, aqui estão algumas dicas:

- Reporte bugs ou faça sugestões de recursos abrindo uma issue no GitHub.
- Contribua com o código, corrigindo bugs ou adicionando novos recursos. Antes de fazer uma pull request, por favor, abra uma issue para discutir as suas ideias.
- Ajude na documentação, corrigindo erros ou adicionando informações úteis.

## Histórico de desenvolvimento
### Fase 1 - Explorando a API com axios

Para acessar a API utilizando o Axios, foi necessário realizar uma requisição POST e enviar uma consulta ao GraphQL. No entanto, a API não tinha suporte a CORS (Cross-Origin Resource Sharing). Depois de algumas tentativas, consegui contornar esta restrição usando o endereço http://cors-anywhere.herokuapp.com/.

### Fase 2 - Consumindo a API e montando o layout

Com a resposta da API, comecei a construir o layout para tornar a aplicação funcional. Também publiquei o projeto no endereço: https://temp-mail-petter.netlify.app/

### Fase 3 - O serviço cors-anywhere

Ao testar o serviço cors-anywhere, encontrei a limitação de precisar solicitar uma autorização para usá-lo. Para contornar este problema, criei uma API (usando o conceito de BFF - Backend for Frontend) como proxy para entregar a resposta da API original. Testei a API localmente com sucesso e publiquei-a online.

Repositório: https://github.com/petterkraus/dropmail-proxy
Endereço da API: https://dropmailproxy.onrender.com


### Fase 4 - Inbox

Com a compreensão da API, consegui montar a consulta corretamente e enviar o ID gerado aleatoriamente para a API GraphQL, o que iniciou a sessão de email. Isso me permitiu começar a construir a caixa de entrada de forma eficiente. A aplicação se concentra no arquivo App.jsx, para um desenvolvimento mais rápido, sem a necessidade de usar o hook de contexto.

### Fase 5 - Persistência do e-mail

Nesta fase, comecei a trabalhar na funcionalidade de persistência de emails utilizando o recurso de local storage. Desenvolvi uma rotina de verificação de dados armazenados para restaurar a sessão e continuar a utilizar o e-mail. No entanto, ainda não implementei a validação para o caso em que o email tenha expirado.

### Fase 6 - Refatoração 

Refiz o código, corrigindo as funcionalidades principais, dividi as responsabilidades das funções, separei as duas telas da aplicação em componentes, resolvi problemas relacionados ao setInterval e comecei a trabalhar no layout agora que a funcionalidade estava 100%.

### Fase 7 - Layout e algumas funcionalidades

Agora que a aplicação estava recebendo emails de forma estável, passei a trabalhar no design da caixa de entrada para torná-la mais legível. Adicionei informações úteis enviadas pela API, sanitizei o código HTML do corpo do email para exibi-lo com segurança, formatei a data para um formato amigável e ajustei pequenos detalhes.

### Fase 8  - Notificações

Nesta fase, as notificações foram implementadas usando a funcionalidade nativa dos navegadores que possuem essa funcionalidade. Além disso, foi implementada uma função para encerrar a sessão caso o email gerado pela API tenha expirado.

### Fase 9 - Responsividade
 
 Implementei a resposividade da aplicação para telas pequenas, garantindo uma melhor experiência ao usuário em dispositivos móveis.

 ### Fase 10 - Revisão

 Apliquei melhorias no código e adicionei uma notificação ao copiar o email para a área de transferência. O projeto está agora pronto para ser apresentado.