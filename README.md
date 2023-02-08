# Temp Mail

## Descrição
- A API  https://dropmail.me/api possibilita e-mails temporários, esse projeto faz a comunicação com essa API.

## Instruções

-## Tecnologias
- Vite
- React
- Tailwind
- Axios
- NanoID

## Fase 1 - Explorando a API com axios

Pra acessar com o axios, foi necessário fazer um post e enviar uma query para o GraphQL. Contudo, a API não possui CORs. Após alguns testes, consegui fazer uso do http://cors-anywhere.herokuapp.com/ para passar pela restrição.

## Fase 2 - Consumindo a API e montando o layout

Fazendo uso do retorno da API, comecei a montar o layout para colocar a aplicação funcional na tela.
Fiz a publicação no endereço: https://temp-mail-petter.netlify.app/

## Fase 3 - O serviço cors-anywhere

Testando o serviço cors-anywhere, encontrei a limitação de precisar acessar e pedir uma autorização para poder usar o mesmo. Com isso, levantei uma API para fazer um proxy e me entregar a resposta da API. Testei localmente com sucesso. Fiz deploy da mesma online.

Repositório: https://github.com/petterkraus/dropmail-proxy
Endereço da API: https://dropmailproxy.onrender.com
