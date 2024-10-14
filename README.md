# Gestão Financeira

Este é um projeto de gestão financeira que permite aos usuários gerenciar suas despesas, com funcionalidades para categorizar custos fixos e variáveis e calcular o saldo restante com base nas entradas. O sistema também permite a alternância entre o modo claro e o modo escuro, e foi desenvolvido utilizando tecnologias modernas como **Tailwind CSS**, **TypeScript**, e **Webpack**.

## Funcionalidades

- **Cadastro de Custos Fixos e Variáveis**: O usuário pode adicionar diferentes tipos de custos e categorizá-los.
- **Cálculo de Sobras**: A aplicação calcula automaticamente o saldo restante após deduzir os custos inseridos.
- **Modo Escuro**: Suporte para alternância entre o modo claro e o modo escuro para uma melhor experiência do usuário.
- **Exportação e Importação de Dados**: Possibilidade de exportar e importar dados financeiros em formato JSON.
- **Responsive Design**: A interface é adaptável para diferentes tamanhos de tela, garantindo uma boa experiência em dispositivos móveis.

## Tecnologias Utilizadas

- **HTML**: Para a estruturação do conteúdo da página.
- **CSS com Tailwind CSS**: Para estilização da interface, incluindo o suporte a modo escuro.
- **TypeScript**: Para a lógica da aplicação, incluindo manipulação dos dados financeiros.
- **Webpack**: Para empacotar os arquivos da aplicação.
- **lite-server**: Servidor de desenvolvimento simples para hot-reload.

## Estrutura de Pastas

```
/project-root
  ├── /public
  │     ├── app.js          # Arquivo JavaScript compilado
  │     ├── style.css       # Arquivo CSS compilado
  ├── /src
  │     ├── app.ts          # Código TypeScript fonte
  ├── index.html            # Página principal
  ├── tailwind.config.js    # Configuração do Tailwind CSS
  ├── tsconfig.json         # Configuração do TypeScript
  ├── webpack.config.js     # Configuração do Webpack
  ├── package.json          # Gerenciamento de dependências e scripts
  ├── vercel.json           # Configuração de deploy para a Vercel
```

## Scripts Disponíveis

- `npm run build`: Compila os arquivos TypeScript e CSS.
- `npm run start`: Executa o servidor de desenvolvimento com hot-reload e recompilação automática de arquivos.
- `npm run build:ts`: Compila o código TypeScript.
- `npm run build:css`: Compila o CSS utilizando Tailwind CSS.
- `npm run serve`: Inicia o servidor de desenvolvimento utilizando o **lite-server**.
- `npm run dev`: Atalho para desenvolvimento que roda o **tsx** com o **concurrently** para build contínuo.

## Como Rodar o Projeto

### Requisitos

- Node.js (v20.15 ou superior)

### Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/financeiro.git
   ```
2. Entre na pasta do projeto:
   ```bash
   cd financeiro
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Desenvolvimento Local

Para rodar o projeto localmente em modo de desenvolvimento com hot-reload:

```bash
npm run start
```

### Build

Para compilar os arquivos TypeScript e CSS:

```bash
npm run build
```

### Deploy

O projeto está configurado para ser implantado na **Vercel**. Para fazer o deploy, apenas conecte o repositório à Vercel e ela cuidará do processo de build automaticamente.

## Configuração de Deploy na Vercel

O arquivo `vercel.json` está configurado para servir os arquivos compilados e o `index.html` corretamente:

```json
{
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    },
    {
      "src": "public/app.js",
      "use": "@vercel/static"
    },
    {
      "src": "public/style.css",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/app.js",
      "dest": "/public/app.js"
    },
    {
      "src": "/style.css",
      "dest": "/public/style.css"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch com a sua feature:
   ```bash
   git checkout -b feature/nova-feature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m 'Adiciona nova feature'
   ```
4. Faça um push para a branch:
   ```bash
   git push origin feature/nova-feature
   ```
5. Envie um Pull Request.

## Licença

Este projeto está licenciado sob a licença ISC.
